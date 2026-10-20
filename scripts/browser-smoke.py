"""Optional integration check: two isolated Chromium profiles and the real server.
Requires Python playwright and Chromium; run with the application already started.
"""
import json
import os
import time
from pathlib import Path
from playwright.sync_api import sync_playwright

base = os.environ.get('GAME_TEST_URL', 'http://127.0.0.1:3000')
artifacts = Path('artifacts')
artifacts.mkdir(exist_ok=True)
report = {'base': base, 'checks': {}, 'errors': []}
observe = '''() => {
 window.__sockets=[];window.__hashes={};window.__desync=[];
 const Original=window.WebSocket;
 window.WebSocket=class extends Original {
   constructor(...args) {super(...args);window.__sockets.push(this);this.addEventListener('message',e=>{try {const m=JSON.parse(e.data);if(m.type==='desync')window.__desync.push(m);}catch{}});}
   send(data) {try {const m=JSON.parse(data);if(m.type==='hash')window.__hashes[m.turnNumber]=m.hash;if(m.type==='join')window.__clientID=m.clientID;}catch{} return super.send(data);}
 };
}'''
state_js = '''() => { const g=document.querySelector('win-modal').game;return {tick:g.ticks(),players:g.players().map(p=>({id:p.id(),client:p.clientID(),name:p.name(),tiles:p.numTilesOwned(),troops:p.troops(),gold:String(p.gold()),allies:p.allies().map(a=>a.id())})),hashes:window.__hashes,desync:window.__desync}; }'''

def send(page, intent):
    page.evaluate('''i=>{const s=window.__sockets.findLast(s=>s.readyState===1);if(!s)throw Error('No live socket');s.send(JSON.stringify({type:'intent',intent:{...i,clientID:window.__clientID}}));}''', intent)

def spawn(page, preferred):
    point=page.evaluate('''([px,py])=> {const b=document.querySelector('build-menu'),g=b.game;for(let r=0;r<250;r+=5)for(let y=py-r;y<=py+r;y+=5)for(let x=px-r;x<=px+r;x+=5){if(x<0||y<0||x>=g.width()||y>=g.height())continue;const t=g.ref(x,y);if(g.isLand(t)&&g.ownerID(t)===0)return {tile:t,...b.transformHandler.worldToScreenCoordinates({x,y})};}throw Error('No valid land');}''', preferred)
    page.mouse.click(point['x'],point['y'])
    page.wait_for_function("document.querySelector('win-modal').game.myPlayer()?.numTilesOwned()>0",timeout=15000)
    return point

with sync_playwright() as p:
    browser=p.chromium.launch(executable_path=os.environ.get('CHROMIUM_PATH','/usr/bin/chromium'),headless=True,args=['--no-sandbox','--disable-dev-shm-usage'])
    contexts=[browser.new_context(viewport={'width':1440,'height':1000}) for _ in range(2)]
    pages=[]
    try:
        for i,context in enumerate(contexts):
            context.add_init_script(f"({observe})()")
            page=context.new_page();pages.append(page)
            page.on('pageerror',lambda e:report['errors'].append(str(e)))
            page.on('console',lambda m:report['errors'].append(m.text) if m.type=='error' and m.text!='attempting reconnect' else None)
            page.goto(base,wait_until='load')
            page.locator('username-input input').fill(['Spieler Eins','Spieler Zwei'][i])
        host,guest=pages
        host.locator('#host-lobby-button').click()
        host.wait_for_function("document.querySelector('host-lobby-modal').lobbyId.length===8")
        lobby=host.evaluate("document.querySelector('host-lobby-modal').lobbyId")
        report['lobby']=lobby
        host.evaluate('''async()=>{const m=document.querySelector('host-lobby-modal');m.selectedMap='Pangaea';m.bots=0;m.disableNPCs=true;m.donateGold=true;m.donateTroops=true;await m.putGameConfig();m.requestUpdate();}''')
        guest.goto(base+'/#join='+lobby,wait_until='load')
        guest.wait_for_function("document.querySelector('join-private-lobby-modal').hasJoined === true",timeout=20000)
        host.wait_for_function("document.querySelector('host-lobby-modal').clients.length===2",timeout=20000)
        report['checks']['two_players_in_same_lobby']=True
        host.screenshot(path=str(artifacts/'lobby.png'))
        host.locator('.start-game-button').click()
        for page in pages:
            page.wait_for_function("document.querySelector('win-modal')?.game?.ticks()>1",timeout=60000)
        report['spawn']=[spawn(host,[480,480]),spawn(guest,[570,480])]
        host.wait_for_function("document.querySelector('win-modal').game.ticks()>305",timeout=120000)
        before=[page.evaluate(state_js) for page in pages]
        for page in pages: send(page,{'type':'attack','targetID':None,'troops':5000})
        host.wait_for_function("document.querySelector('win-modal').game.myPlayer().numTilesOwned()>250",timeout=60000)
        guest.wait_for_function("document.querySelector('win-modal').game.myPlayer().numTilesOwned()>250",timeout=60000)
        report['checks']['both_players_expand']=True
        ids=[page.evaluate("document.querySelector('win-modal').game.myPlayer().id()") for page in pages]
        send(host,{'type':'allianceRequest','recipient':ids[1]})
        host.wait_for_timeout(500)
        send(guest,{'type':'allianceRequestReply','requestor':ids[0],'accept':True})
        host.wait_for_function("document.querySelector('win-modal').game.myPlayer().allies().length===1",timeout=10000)
        report['checks']['alliance_changes_simulation']=True
        gap=host.evaluate("""()=>{const g=document.querySelector('win-modal').game;const p=g.players();return Number(p.find(p=>p.id()!==g.myPlayer().id()).gold())-Number(g.myPlayer().gold());}""")
        send(host,{'type':'donate_gold','recipient':ids[1],'gold':'1000'})
        host.wait_for_function("""baseline=>{const g=document.querySelector('win-modal').game;const other=g.players().find(p=>p.id()!==g.myPlayer().id());return Number(other.gold())-Number(g.myPlayer().gold())>=baseline+2000;}""",arg=gap,timeout=30000)
        report['checks']['donation_transfers_real_gold']=True
        host.wait_for_timeout(1500)
        host.screenshot(path=str(artifacts/'multiplayer.png'))
        # A real dropped socket must trigger the upstream reconnect and replay path.
        old_id=guest.evaluate('window.__clientID')
        guest.evaluate("window.__sockets.findLast(s=>s.readyState===1).close(4000,'integration test')")
        guest.wait_for_function("window.__sockets.filter(s=>s.readyState===1).length===1 && window.__sockets.length>=2",timeout=15000)
        guest.wait_for_timeout(2500)
        assert guest.evaluate('window.__clientID')==old_id
        report['checks']['reconnect_keeps_player']=True
        guest.reload(wait_until='load')
        guest.wait_for_function("""()=>{const g=document.querySelector('win-modal')?.game;if(!g?.myPlayer()||g.myPlayer().numTilesOwned()<250)return false;const other=g.players().find(p=>p.id()!==g.myPlayer().id());return other && Number(g.myPlayer().gold())-Number(other.gold())>=2000;}""",timeout=180000)
        assert guest.evaluate('window.__clientID')==old_id
        report['checks']['refresh_keeps_player']=True
        report['checks']['refresh_restores_territory_and_gold']=True
        after=[page.evaluate(state_js) for page in pages]
        common=set(after[0]['hashes']) & set(after[1]['hashes'])
        assert len(common)>2, 'Not enough shared simulation hashes'
        assert max(map(int,common))>350, 'No shared hash after active game commands'
        assert all(after[0]['hashes'][t]==after[1]['hashes'][t] for t in common), 'Different simulation hashes'
        assert not after[0]['desync'] and not after[1]['desync'], 'Server reported desync'
        report['checks']['identical_simulation_hashes']=len(common)
        report['checks']['last_matching_tick']=max(map(int,common))
        report['states']=after
        assert not report['errors'], report['errors']
        print(json.dumps(report,ensure_ascii=False),flush=True)
    except Exception as error:
        report['failure']=str(error)
        report['failure_states']=[]
        for page in pages:
            try: report['failure_states'].append(page.evaluate(state_js))
            except Exception: pass
        for i,page in enumerate(pages):
            try: page.screenshot(path=str(artifacts/f'failure-{i}.png'))
            except Exception: pass
        raise
    finally:
        (artifacts/'browser-smoke.json').write_text(json.dumps(report,indent=2,ensure_ascii=False))
        browser.close()

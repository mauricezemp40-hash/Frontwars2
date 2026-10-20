"""Complete a real single-player match using existing sandbox lobby options."""
import json, os, time
from pathlib import Path
from playwright.sync_api import sync_playwright
base=os.environ.get('GAME_TEST_URL','http://127.0.0.1:3000')
result={'mode':'singleplayer','settings':{'map':'Pangaea','bots':0,'disableNPCs':True,'infiniteTroops':True,'infiniteGold':True,'instantBuild':True},'errors':[]}
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox','--disable-dev-shm-usage'])
 page=b.new_page(viewport={'width':1024,'height':768})
 page.on('pageerror',lambda e:result['errors'].append(str(e)))
 try:
  page.goto(base);page.locator('username-input input').fill('Einzelspieler Test');page.locator('#single-player').click()
  page.evaluate('''()=>{const m=document.querySelector('single-player-modal');m.selectedMap='Pangaea';m.bots=0;m.disableNPCs=true;m.infiniteGold=true;m.infiniteTroops=true;m.instantBuild=true;m.requestUpdate();}''')
  page.locator('single-player-modal o-button').last.click()
  page.wait_for_function("document.querySelector('win-modal')?.game?.ticks()>1",timeout=60000)
  if page.evaluate("document.querySelector('game-left-sidebar').isLeaderboardShow"):
   page.locator('game-left-sidebar img[alt="treeIcon"]').first.click()
  pos=page.evaluate('''()=>{const m=document.querySelector('build-menu');return m.transformHandler.worldToScreenCoordinates({x:249.5,y:167.5});}''')
  page.mouse.click(pos['x'],pos['y'])
  page.wait_for_function("document.querySelector('win-modal').game.myPlayer()?.numTilesOwned()>0")
  page.wait_for_function("document.querySelector('win-modal').game.ticks()>105",timeout=60000)
  initial=page.evaluate("document.querySelector('win-modal').game.myPlayer().numTilesOwned()")
  # Pangaea has two large landmasses. Reach the second through a real transport.
  transport_action=page.evaluate("""async()=>{const g=document.querySelector('win-modal').game;const a=await g.myPlayer().actions(g.ref(555,8));return a.buildableUnits.find(u=>u.type==='Transport');}""")
  print(json.dumps({'transport_action':transport_action}),flush=True)
  # Submit the existing context-menu boat command through the original event bus.
  # The plain-click shortcut intentionally limits autoboats to 100 map pixels.
  page.evaluate("""()=>{const m=document.querySelector('build-menu'),g=m.game;const C=[...m.eventBus.listeners.keys()].find(C=>{try{return Object.keys(new C()).sort().join(',')==='dst,src,targetID,troops';}catch{return false;}});if(!C)throw Error('Original transport event missing');m.eventBus.emit(new C(null,g.ref(555,8),Math.floor(g.myPlayer().troops()*0.2),null));}""")
  page.wait_for_function("document.querySelector('win-modal').game.units('Transport').length>0",timeout=30000)
  result['transport_launched']=True
  page.screenshot(path='artifacts/transport.png')
  # Select actual adjacent neutral tiles through the original map controls.

  start=time.monotonic()
  iteration=0
  while time.monotonic()-start<600:
   status=page.evaluate('''()=>{const m=document.querySelector('build-menu'),g=m.game,p=g.myPlayer();return {tick:g.ticks(),tiles:p.numTilesOwned(),troops:p.troops(),gold:String(p.gold()),won:document.querySelector('win-modal').isVisible,landed:g.ownerID(g.ref(555,8))===p.smallID(),outgoing:p.outgoingAttacks().length,boats:g.units('Transport').length,title:document.querySelector('win-modal')._title};}''')
   iteration+=1
   if iteration%5==0: print(json.dumps(status),flush=True)
   if status['won']:
    result['end']=status;break
   pos=page.evaluate('''async()=>{const m=document.querySelector('build-menu'),g=m.game;const {borderTiles}=await g.myPlayer().borderTiles();for(const t of borderTiles)for(const n of g.neighbors(t)){if(g.isLand(n)&&g.ownerID(n)===0){const p=m.transformHandler.worldToScreenCoordinates({x:g.x(n)+0.5,y:g.y(n)+0.5});if(document.elementFromPoint(p.x,p.y)?.tagName==='CANVAS')return p;}}return null;}''')
   if pos and status['outgoing']==0:
    page.keyboard.down('Shift');page.mouse.click(pos['x'],pos['y']);page.keyboard.up('Shift')
   page.wait_for_timeout(1800)
  else:raise AssertionError(f'No natural game end within 600 seconds: {status}')
  assert result['end']['tiles']>initial
  page.wait_for_function("Object.values(JSON.parse(localStorage.getItem('game-records')||'{}')).some(s=>s.gameRecord?.info?.winner)",timeout=10000)
  result['local_result_saved']=True
  assert not result['errors'],result['errors']
  page.screenshot(path='artifacts/singleplayer-win.png')
  print(json.dumps(result),flush=True)
 except Exception as e:
  result['failure']=str(e);page.screenshot(path='artifacts/singleplayer-failure.png');raise
 finally:
  Path('artifacts/singleplayer-smoke.json').write_text(json.dumps(result,indent=2))
  b.close()

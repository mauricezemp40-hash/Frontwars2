import test from 'node:test';
import assert from 'node:assert/strict';
import { ClientMessageSchema, ServerMessageSchema } from '../../src/core/Schemas.ts';
import { replacer } from '../../src/core/Util.ts';

test('Gold donations survive lossless JSON in both directions with real ESM dependencies',()=>{
 const intent={clientID:'Sender01',recipient:'Target01',type:'donate_gold',gold:1000n};
 const input=JSON.parse(JSON.stringify({type:'intent',intent},replacer));
 assert.deepEqual(ClientMessageSchema.parse(input),{type:'intent',intent});
 const turn={type:'turn',turn:{turnNumber:5,intents:[intent]}};
 assert.deepEqual(ServerMessageSchema.parse(JSON.parse(JSON.stringify(turn,replacer))),turn);
});
test('Invalid or lossy gold values are rejected',()=>{
 for(const gold of ['1e3','1000.5','-1000','','gold',1000]) {
  assert.equal(ClientMessageSchema.safeParse({type:'intent',intent:{clientID:'Sender01',recipient:'Target01',type:'donate_gold',gold}}).success,false);
 }
});

test('The actual game server can broadcast and replay a turn containing a gold donation', async()=>{
 const {GameServer}=await import('../../src/server/GameServer.ts');
 const {DevServerConfig}=await import('../../src/core/configuration/DevConfig.ts');
 const {default:winston}=await import('winston');
 const config={bots:0,difficulty:'Medium',disableNPCs:true,donateGold:true,donateTroops:true,gameMap:'Pangaea',gameMode:'Free For All',gameType:'Private',infiniteGold:false,infiniteTroops:false,instantBuild:false};
 const server=new GameServer('Test0001',winston.createLogger({silent:true}),Date.now(),new DevServerConfig(),config);
 const intent={clientID:'Sender01',recipient:'Target01',type:'donate_gold',gold:1000n};
 server.addIntent(intent);
 assert.doesNotThrow(()=>server.endTurn());
 server.gameStartInfo={gameID:'Test0001',config,players:[]};
 let sent;
 server.sendStartGameMsg({send:(message)=>{sent=message;}},0);
 const received=ServerMessageSchema.parse(JSON.parse(sent));
 assert.equal(received.turns[0].intents[0].gold,1000n);
});

//Magica Orbis
//Made by Dark Tornado
//version 0.3.0
/*
© 2015 Dark Tornado, All rights reserved.
리뷰는 허용하나, 무단공유, 무단수정, 제작자속이기 등을 할 시에는 싸대기 때리러 감.
Magica Orbis(마법 세계)라는 세계를 추가하는 스크립트입니다.

스토리
Thunder Arrow, Soil Assassin, Calamum de Obscurum, Dark Tornado, Liber de Obscurum, Skill Drottinn, Liber de Lumen, Light Mage가 Magica Orbis라는 세계를 창조했다. Magica Orbis에는 인간계의 빛을 관리하는 LCB(Light Center Bureau, 빛 중앙 관리국)의 본부가 위치한다. 인간계의 어둠을 관리하는 DUL(Darkness User League, 어둠 사용자 연맹)의 본부가 위치하는 제 5능력의 중심지인 SSW에서 S축 방향으로 공간축을 이탈할 시, Magica Orbis로 들어갈 수 있다.
Magica Orbis에는 주로 마법사나 마도사들이 거주하며, 일부 스킬러들도 그 곳에서 지낸다. 하이어 월드로의 포탈이 존재한다.
*/

ModPE.overrideTexture("images/mob/fireWizard.png", "https://raw.githubusercontent.com/DarkTornado/MagicaOrbis/master/fireWizard.png");
ModPE.overrideTexture("images/mob/waterWizard.png", "https://raw.githubusercontent.com/DarkTornado/MagicaOrbis/master/waterWizard.png");
ModPE.overrideTexture("images/mob/treeWizard.png", "https://raw.githubusercontent.com/DarkTornado/MagicaOrbis/master/treeWizard.png");
ModPE.overrideTexture("images/mob/waterSlime.png", "https://raw.githubusercontent.com/DarkTornado/MagicaOrbis/master/waterSlime.png");


const ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
const sdcard = android.os.Environment.getExternalStorageDirectory().getAbsolutePath();
var pt = 0;
var wizards = [];
var bgm = new android.media.MediaPlayer();
var bgmOnoff = true;
var bgmTime = 0;
var screen = null;
var pt2 = false;
var yt = 0;
var partData = null;
var bgmFix = false;
var waterSlimes = [];
var waterSlime = Renderer.createHumanoidRenderer();
var anti = 0;


var Magica = {
makeDir : function(){
try{
var forder = new java.io.File(sdcard+"/darkTornado/");
var forder2 = new java.io.File(sdcard+"/darkTornado/magicaOrbis/");
forder.mkdir();
forder2.mkdir();
}
catch(e){
print(e);
}
},
save : function(name, msg, tf){
try{
if(tf){
var file = new java.io.File(sdcard+"/darkTornado/magicaOrbis/"+name+".txt");
}
else{
var forder = new java.io.File(sdcard+"/darkTornado/magicaOrbis/"+Level.getWorldDir()+"/");
forder.mkdir();
var forder2 = new java.io.File(sdcard+"/darkTornado/magicaOrbis/"+Level.getWorldDir()+"/itemGiver/");
forder2.mkdir();
var file = new java.io.File(sdcard+"/darkTornado/magicaOrbis/"+Level.getWorldDir()+"/"+name+".txt");
}
var fos = new java.io.FileOutputStream(file);
var str = new java.lang.String(msg);
fos.write(str.getBytes());
fos.close();
}
catch(e){
clientMessage(e+", "+e.lineNumber);
}
},
read : function(name, tf){
try{
if(tf) var file = new java.io.File(sdcard+"/darkTornado/magicaOrbis/"+name+".txt");
else var file = new java.io.File(sdcard+"/darkTornado/magicaOrbis/"+Level.getWorldDir()+"/"+name+".txt");
if(!(file.exists())) return "";
var fis = new java.io.FileInputStream(file);
var isr = new java.io.InputStreamReader(fis);
var br = new java.io.BufferedReader(isr);
var str = br.readLine();
var line = "";
while((line = br.readLine()) != null){
str += "\n" + line;
}
fis.close();
isr.close();
br.close();
return str;
}
catch(e){
clientMessage(e+", "+e.lineNumber);
}
},
isPortal : function(x, y, z){
var gt = getTile;
if(gt(x+1, y, z)==89&&gt(x, y, z)==210&&gt(x-1, y, z)==89&&gt(x+1, y, z+1)==89&&gt(x, y, z+1)==89&&gt(x-1, y, z+1)==89&&gt(x+1, y, z-1)==89&&gt(x, y, z-1)==89&&gt(x-1, y, z-1)==89)
return true;
else
return false;
},
inOrbis : function(e, n){
if(Magica.read("exist")!="true") return false;
var px = Entity.getX(e);
var py = Entity.getY(e);
var pz = Entity.getZ(e);
if(px>=3&&px<=150&&py<=30&&pz>=3&&pz<=80) return true;
else return false;
},
makeTree : function(x, y, z){
for(var yy=y+1;yy<y+7;yy++)
setTile(x, yy, z, 204);
setTile(x, y+7, z, 205);
for(var yy=y+6;yy<y+8;yy++){
setTile(x+1, yy, z, 205);
setTile(x, yy, z-1, 205);
setTile(x, yy, z+1, 205);
setTile(x-1, yy, z, 205);
}
for(var yy=y+4;yy<y+6;yy++){
setTile(x+1, yy, z+1, 205);
setTile(x+1, yy, z-1, 205);
setTile(x+1, yy, z, 205);
setTile(x-1, yy, z+1, 205);
setTile(x-1, yy, z-1, 205);
setTile(x-1, yy, z, 205);
setTile(x, yy, z+1, 205);
setTile(x, yy, z-1, 205);
setTile(x+2, yy, z+1, 205);
setTile(x+2, yy, z-1, 205);
setTile(x+2, yy, z, 205)
setTile(x-2, yy, z+1, 205);
setTile(x-2, yy, z-1, 205);
setTile(x-2, yy, z, 205);
setTile(x+1, yy, z+2, 205);
setTile(x-1, yy, z+2, 205);
setTile(x, yy, z+2, 205);
setTile(x+1, yy, z-2, 205);
setTile(x-1, yy, z-2, 205);
setTile(x, yy, z-2, 205);
}
},
checkFile : function(){
if(Magica.read("lang", true)==""){
selectLang(true);
toast("사용할 언어를 선택하세요...\n   Select Language to use...");
}
},
getPart : function(e){
if(Magica.read("exist")!="true") return false;
var px = Entity.getX(e);
var py = Entity.getY(e);
var pz = Entity.getZ(e);
if(px>=3&&px<=40&&py<=30&&pz>=90&&pz<=130) return 1;
else if(px>=45&&px<=80&&py<=30&&pz>=90&&pz<=130) return 2;
else if(px>=85&&px<=120&&py<=30&&pz>=90&&pz<=130) return 3;
else return 0; 
},
addRenders : function(){
var model = waterSlime.getModel();
var head = model.getPart("head");
var body = model.getPart("body");
var rArm = model.getPart("rightArm");
var lArm = model.getPart("leftArm");
var rLeg = model.getPart("rightLeg");
var lLeg = model.getPart("leftLeg");
head.clear();
body.clear();
rLeg.clear();
lLeg.clear();
rArm.clear();
lArm.clear();
body.setTextureOffset(16, 16);
head.addBox(-3, 14, -3, 8, 8, 8, 1);
}


};

Magica.checkFile();
Magica.addRenders();

Block.defineBlock(221, "Magica Orbis Expender", [["quartz_block", 5]]);
Block.setColor(221, [0xff00ff]);
Block.setLightLevel(221, 15);
Block.setDestroyTime(221, -1);
Block.setExplosionResistance(221, 6000);
Block.defineBlock(222, "Sparkling Dust", [["redstone_dust_cross", 0]], 0, false, 19);
Block.setColor(222, [0xffff00]);
Block.setDestroyTime(222, 0.01);
Block.setRenderLayer(222, 3);
Block.setLightOpacity(222, 0);
Block.setLightLevel(222, 5);
Block.defineBlock(223, "Push Stone Plus", [["quartz_block", 0]], 1, false, 11);
Block.setColor(223, [0xaaffff]);
Block.setLightLevel(223, 5);
Block.setDestroyTime(223, 1);
Block.setLightOpacity(223, 0);
if(Magica.read("lang", true)=="true"){
Block.defineBlock(200, "초록색 반짝이는 돌", [["end_stone", 0]]);
Block.defineBlock(201, "보라색 반짝이는 돌", [["end_stone", 0]]);
Block.defineBlock(202, "반짝이는 나무 목재", [["planks", 0]]);
Block.defineBlock(203, "반짝이는 나무 반 블록", [["planks", 0]], 1, false, 0);
Block.defineBlock(204, "반짝이는 나무", [["log", 1], ["log", 1], ["log", 0], ["log", 0], ["log", 0], ["log", 0]]);
Block.defineBlock(205, "반짝이는 나뭇잎", [["leaves", 0]], 1, false, 0);
Block.defineBlock(206, "청록색 블록", [["quartz_block", 1]]);
Block.defineBlock(207, "노란색 블록", [["quartz_block", 0]]);
Block.defineBlock(208, "하늘 블록", [["quartz_block", 0]]);
Block.defineBlock(209, "불타는 블록", [["flowing_lava", 0]]);
Block.defineBlock(210, "Magica Orbis 포탈", [["still_water", 0]], 1, false, 0);
Block.defineBlock(211, "반짝이는 울타리", [["planks", 0]], 1, false, 11);
Block.defineBlock(212, "밀치는 돌", [["quartz_block", 0]]);
Block.defineBlock(213, "마법적인 노란색 블록", [["quartz_block", 5]]);
Block.defineBlock(214, "마법 랜턴(켜짐)", [["end_stone", 0]]);
Block.defineBlock(215, "마법 랜턴(꺼짐)", [["end_stone", 0]]);
Block.defineBlock(216, "붉은색 반짝이는 돌", [["end_stone", 0]]);
Block.defineBlock(217, "아이템 지급기", [["quartz_block", 1]]);
Block.defineBlock(218, "압력 수신기", [["quartz_block", 4]]);
Block.defineBlock(219, "링크 포탈", [["stonebrick", 3]]);
Block.defineBlock(220, "링크 포탈 (비활성화)", [["stonebrick", 3]]);
ModPE.setItem(2000, "seeds_pumpkin", 0, "반짝이는 씨앗");
ModPE.setItem(2001, "spawn_egg", 0, "스폰 마법사");
ModPE.setItem(2002, "stick", 0, "마법지팡이");
ModPE.setItem(2003, "blaze_rod", 0, "반짝이는 마법지팡이");
ModPE.setItem(2004, "blaze_powder", 0, "반짝이는 가루");
ModPE.setItem(2005, "sword", 3,"반짝이는 검");
ModPE.setItem(2006, "axe", 3,"반짝이는 도끼");
ModPE.setItem(2007, "shovel", 3,"반짝이는 삽");
ModPE.setItem(2008, "pickaxe", 3,"반짝이는 곡괭이");
ModPE.setItem(2009, "hoe", 3,"반짝이는 괭이");
ModPE.setItem(2010, "map_filled", 0, "마법사의 메모");
ModPE.setItem(2011, "map_filled", 0, "철골램 소환서");
ModPE.setItem(2012, "spawn_egg", 0, "스폰 워터 슬라임");
}
else{
Block.defineBlock(200, "Green Sparkling Stone", [["end_stone", 0]]);
Block.defineBlock(201, "Purple Sparkling Stone", [["end_stone", 0]]);
Block.defineBlock(202, "Sparkling Planks", [["planks", 0]]);
Block.defineBlock(203, "Half Sparkling Planks", [["planks", 0]], 1, false, 0);
Block.defineBlock(204, "Sparkling Log", [["log", 1], ["log", 1], ["log", 0], ["log", 0], ["log", 0], ["log", 0]]);
Block.defineBlock(205, "Sparkling Leaf", [["leaves", 0]], 1, false, 0);
Block.defineBlock(206, "Cyan Block", [["quartz_block", 1]]);
Block.defineBlock(207, "Yellow Block", [["quartz_block", 0]]);
Block.defineBlock(208, "Sky Block", [["quartz_block", 0]]);
Block.defineBlock(209, "Burning Block", [["flowing_lava", 0]]);
Block.defineBlock(210, "Portal to Magica Orbis", [["still_water", 0]], 1, false, 0);
Block.defineBlock(211, "Sparkling Fence", [["planks", 0]], 1, false, 11);
Block.defineBlock(212, "Push Stone", [["quartz_block", 0]]);
Block.defineBlock(213, "Magical Yellow Stone", [["quartz_block", 5]]);
Block.defineBlock(214, "Magic Lantern(on)", [["end_stone", 0]]);
Block.defineBlock(215, "Magic Lantern(off)", [["end_stone", 0]]);
Block.defineBlock(216, "Red Sparkling Stone", [["end_stone", 0]]);
Block.defineBlock(217, "Item Giver", [["quartz_block", 1]]);
Block.defineBlock(218, "Decompression Receiver", [["quartz_block", 4]]);
Block.defineBlock(219, "Link Portal", [["stonebrick", 3]]);
Block.defineBlock(220, "Link Portal off", [["stonebrick", 3]]);
ModPE.setItem(2000, "seeds_pumpkin", 0, "Sparkling Seed");
ModPE.setItem(2001, "spawn_egg", 0, "Spawn Wizard");
ModPE.setItem(2002, "stick", 0, "Wand");
ModPE.setItem(2003, "blaze_rod", 0, "Sparkling Wand");
ModPE.setItem(2004, "blaze_powder", 0, "Sparkling Powder");
ModPE.setItem(2005, "sword", 3,"Sparkling Sword");
ModPE.setItem(2006, "axe", 3,"Sparkling Axe");
ModPE.setItem(2007, "shovel", 3,"Sparkling Shovel");
ModPE.setItem(2008, "pickaxe", 3,"Sparkling Pickaxe");
ModPE.setItem(2009, "hoe", 3,"Sparkling Hoe");
ModPE.setItem(2010, "map_filled", 0, "Wizard's Memo");
ModPE.setItem(2011, "map_filled", 0, "Iron Golem Summoner");
ModPE.setItem(2012, "spawn_egg", 0, "Spawn Water Slime");
}
Block.setColor(200, [0x00ffff]);
Block.setLightLevel(200, 15);
Block.setDestroyTime(200, 1);
Block.setColor(201, [0xaa00ff]);
Block.setLightLevel(201, 15);
Block.setDestroyTime(201, 1);
Block.setColor(202, [0x00ffff]);
Block.setLightLevel(202, 5);
Block.setDestroyTime(202, 1);
Block.setColor(203, [0x00ffff]);
Block.setLightLevel(203, 3);
Block.setDestroyTime(203, 1);
Block.setLightOpacity(203, 0);
Block.setShape(203, 0, 0, 0, 1, 0.5, 1);
Block.setDestroyTime(203, 1);
Block.setColor(204, [0x00ffff]);
Block.setLightLevel(204, 15);
Block.setDestroyTime(204, 0.5);
Block.setColor(205, [0x00ffff]);
Block.setLightLevel(205, 15);
Block.setDestroyTime(205, 0.01);
Block.setLightOpacity(205, 0);
Block.setRenderLayer(205, 3);
Block.setColor(206, [0x00ffff]);
Block.setLightLevel(206, 5);
Block.setDestroyTime(206, 2);
Block.setColor(207, [0xffff00]);
Block.setLightLevel(207, 10);
Block.setDestroyTime(207, 1);
Block.setColor(208, [0x87ffff]);
Block.setLightLevel(208, 15);
Block.setDestroyTime(208, -1);
Block.setColor(209, [0x32eedf]);
Block.setLightLevel(209, 15);
Block.setColor(210, [0xffef9a]);
Block.setLightLevel(210, 15);
Block.setDestroyTime(95, -1);
Block.setShape(210, 0, 0.1, 0, 1, 0.7, 1);
Block.setColor(211, [0x00ffff]);
Block.setLightLevel(211, 3);
Block.setLightOpacity(211, 0);
Block.setDestroyTime(211, 1);
Block.setColor(212, [0xaaffff]);
Block.setLightLevel(212, 5);
Block.setDestroyTime(212, 1);
Block.setColor(213, [0xffff00]);
Block.setLightLevel(213, 15);
Block.setDestroyTime(213, 1);
Block.setColor(214, [0xa4ff00]);
Block.setLightLevel(214, 15);
Block.setDestroyTime(214, 1);
Block.setColor(215, [0xa4ff00]);
Block.setDestroyTime(215, 1);
Block.setColor(216, [0xff0000]);
Block.setLightLevel(216, 15);
Block.setDestroyTime(216, 1);
Block.setColor(217, [0x9462ff]);
Block.setLightLevel(217, 10);
Block.setDestroyTime(217, 1);
Block.setColor(218, [0x9462ff]);
Block.setLightLevel(218, 10);
Block.setDestroyTime(218, 1);
Block.setColor(219, [0xff9cff]);
Block.setLightLevel(219, 15);
Block.setDestroyTime(219, -1);
Block.setColor(220, [0x379cff]);
Block.setLightLevel(220, 15);
Block.setDestroyTime(220, -1);
Item.addShapedRecipe(207, 1, 0, ["iii", "iii", "iii"], ["i", 2004, 0]);
Item.addCraftRecipe(202, 4, 0, [204, 1, 0]);
Item.addShapedRecipe(280, 1, 0, [" i ", " i ", "   "], ["i", 202, 0]);
Item.addShapedRecipe(2002, 1, 0, [" i ", " i ", "   "], ["i", 202, 0]);
Item.addCraftRecipe(2003, 4, 0, [2002, 1, 0, 2004, 1, 0]);
Item.addShapedRecipe(203, 12, 0, ["   ", "iii", "iii"], ["i", 202, 0]);
Item.addCraftRecipe(2004, 9, 0, [207, 1, 0]);
Item.addShapedRecipe(209, 1, 0, ["i i", " t ", "i i"], ["i", 51, 0, "t", 1, 0]);
Item.addShapedRecipe(51, 4, 0, ["i i", " t ", "i i"], ["i", 280, 0, "t", 50, 0]);
Item.addShapedRecipe(211, 3, 0, ["iti", "iti", "   "], ["i", 202, 0, "t", 280, 0]);
Item.addShapedRecipe(2005, 1, 0, [" t ", " t ", " i "], ["i", 280, 0, "t", 207, 0]);
Item.addShapedRecipe(2006, 1, 0, ["tt ", "ti ", " i "], ["i", 280, 0, "t", 207, 0]);
Item.addShapedRecipe(2007, 1, 0, [" t ", " i ", " i "], ["i", 280, 0, "t", 207, 0]);
Item.addShapedRecipe(2008, 1, 0, ["ttt", " i ", " i "], ["i", 280, 0, "t", 207, 0]);
Item.addShapedRecipe(2009, 1, 0, ["tt ", " i ", " i "], ["i", 280, 0, "t", 207, 0]);
Item.addShapedRecipe(2011, 1, 0, [" i ", "iti", " i "], ["i", 2010, 0, "t", 265, 0]);

for(var n=200;n<221;n++)
Player.addItemCreativeInv(n, 5, 0);
for(var n=2000;n<2013;n++)
Player.addItemCreativeInv(n, 5, 0);
for(var n=2002;n<2010;n++)
Item.setHandEquipped(n, true);

//fixing error over 0.11.1
Entity.getEntityTypeId = function(e){
if(e==null) return;
else return net.zhuoweizhang.mcpelauncher.ScriptManager.nativeGetEntityTypeId(e);
};
Entity.remove = function(e){
if(e==null) return;
else net.zhuoweizhang.mcpelauncher.ScriptManager.nativeRemoveEntity(e);
};

Level.spawnWizard = function(x, y, z){
if(Magica.read("lang", true)=="true") var lang = true;
else var lang = false;
var rrr = Math.floor(Math.random()*3);
if(rrr==0){
var wizard = Level.spawnMob(x, y, z, 15, "mob/fireWizard.png");
if(lang) Entity.setNameTag(wizard, "불 마법사");
else Entity.setNameTag(wizard, "Fire Wizard");
}
else if(rrr==1){
var wizard = Level.spawnMob(x, y, z, 15, "mob/waterWizard.png");
if(lang) Entity.setNameTag(wizard, "물 마법사");
else Entity.setNameTag(wizard, "Water Wizard");
}
else if(rrr==2){
var wizard = Level.spawnMob(x, y, z, 15, "mob/treeWizard.png");
if(lang) Entity.setNameTag(wizard, "나무 마법사");
else Entity.setNameTag(wizard, "Tree Wizard");
}
Entity.setHealth(wizard, 30);
Entity.setMaxHealth(wizard, 30);
Entity.setRenderType(wizard, 3);
Entity.setCollisionSize(wizard, 0.7, 1.7);
wizards.push(wizard);
};
Level.spawnWaterSlime = function(x, y, z){
var slime = Level.spawnMob(x, y, z, 37, "mob/waterSlime.png");
Entity.setRenderType(slime, waterSlime.renderType);
Entity.setHealth(slime, 10);
Entity.setMaxHealth(slime, 10);
Entity.setCollisionSize(slime, 0.7, 0.7);
waterSlimes.push(slime);
};

Magica.makeDir();

function dip2px(ctx, dips){
return Math.ceil(dips*ctx.getResources().getDisplayMetrics().density);
}


function toast(msg){
ctx.runOnUiThread(new java.lang.Runnable({
run:function(){
var toast = new android.widget.Toast.makeText(ctx, "<M.O.> "+msg, android.widget.Toast.LENGTH_LONG);
toast.show();
}
}));
}


function setTiles(x1, x2, y1, y2, z1, z2, b, bd){
for(var xx=x1;xx<x2+1;xx++){
for(var yy=y1;yy<y2+1;yy++){
for(var zz=z1;zz<z2+1;zz++){
setTile(xx, yy, zz, b, bd);
}}}
}


function useItem(x, y, z, i, b, s, it, bd){
if(b==49&&getTile(x+1, y, z)==89&&getTile(x-1, y, z)==89&&getTile(x, y, z+1)==89&&getTile(x, y, z-1)==89){
setTile(x+1, y, z+1, 89);
setTile(x+1, y, z-1, 89);
setTile(x-1, y, z+1, 89);
setTile(x-1, y, z-1, 89);
setTile(x, y, z, 210);
if(Magica.read("lang", true)=="true")
toast("포탈이 열렸습니다.");
else
toast("Portal is opened.");
Magica.save("portalX", x);
Magica.save("portalY", y);
Magica.save("portalZ", z);
preventDefault();
}
if(i==2000&&s==1&&b<5){
Magica.makeTree(x, y, z);
preventDefault();
if(Level.getGameMode()==0)
addItemInventory(2000, -1, 0);
}
if(i==2001){
Level.spawnWizard(x, y+1.5, z);
preventDefault();
if(Level.getGameMode()==0)
addItemInventory(2001, -1, 0);
}
if(i==2012){
Level.spawnWaterSlime(x, y+1.5, z);
preventDefault();
if(Level.getGameMode()==0)
addItemInventory(2012, -1, 0);
}
if(i==2010){
Entity.addEffect(Player.getEntity(), MobEffect.regeneration, 600, 2, true, false);
preventDefault();
if(Level.getGameMode()==0)
addItemInventory(2010, -1, 0);
}
if(i==2009&&s==1&&(b==2||b==3||b==198)){
setTile(x, y, z, 60, 7);
}
if(b==221){
if(Magica.read("lang", true)=="true") toast("Magica Orbis 확장중...");
else toast("Expending Magica Orbis...");
if(x==75&&y==8&&z==47){
makeMagicaOrbis(1);
}
else if(x==119&&y==8&&z==49){
makeMagicaOrbis(2);
}
Level.destroyBlock(x, y, z, false);
preventDefault();
}
if(i==2004){
if(s==0) setTile(x, y-1, z, 222);
if(s==1) setTile(x, y+1, z, 222);
if(s==2) setTile(x, y, z-1, 222);
if(s==3) setTile(x, y, z+1, 222);
if(s==4) setTile(x-1, y, z, 222);
if(s==5) setTile(x+1, y, z, 222);
preventDefault();
}
if(b==213){
yellowStone(x, y, z);
preventDefault();
}
if(b==217){
if(i==2002||i==2003){
editItemGiver(x, y, z);
}
else{
giveItem(x, y, z);
}
preventDefault();
}
if(i==2011){
Level.spawnMob(x, y+1.5, z, 20);
preventDefault();
if(Level.getGameMode()==0)
addItemInventory(2011, -1, 0);
}
if(b==220){
if(Level.getSignText(x, y+1, z, 1)=="Mosia"){
Entity.setPosition(Player.getEntity(), 17.5, 11.5, 123.5);
if(Magica.read("lang", true)=="true") toast("Magica Orbis 확장중...\n Mosia로 이동합니다...");
else toast("Expending Magica Orbis...\n Moving to Mosia...");
makeArea(1);
setTile(x, y, z, 219);
}
else if(Level.getSignText(x, y+1, z, 1)=="Tector"){
if(Magica.read("lang", true)=="true") toast("아직 사용할 수 없습니다.");
else toast("Cannot use yet.");
return;
if(Magica.read("lang", true)=="true") toast("Magica Orbis 확장중...\n Tector로 이동합니다...");
else toast("Expending Magica Orbis...\n Moving to Tector...");
makeArea(2);
setTile(x, y, z, 219);
}
else if(Level.getSignText(x, y+1, z, 1)=="Xiky"){
if(Magica.read("lang", true)=="true") toast("아직 사용할 수 없습니다.");
else toast("Cannot use yet.");
return;
if(Magica.read("lang", true)=="true") toast("Magica Orbis 확장중...\n Xiky로 이동합니다...");
else toast("Expending Magica Orbis...\n Moving to Xiky...");
makeArea(3);
setTile(x, y, z, 219);
}
else if(Level.getSignText(x, y+1, z, 1)=="Higher"&&Level.getSignText(x, y+1, z, 2)=="World"){
if(Magica.read("lang", true)=="true") toast("아직 이동할 수 없습니다.");
else toast("Cannot go yet.");
return;
if(Magica.read("lang", true)=="true") toast("포탈이 열렸습니다.");
else toast("Portal is opened.");
setTile(x, y, z, 219);
}
preventDefault();
}
else if(b==219){
if(Level.getSignText(x, y+1, z, 1)=="Return"){
if(Magica.read("lang", true)=="true") toast("신전으로 돌아갑니다...");
else toast("Returning to Temple...");
pt2 = true;
Entity.setPosition(Player.getEntity(), 17.5, 11.5, 68.5);
new java.lang.Thread({
run : function(){
java.lang.Thread.sleep(5000);
pt2 = false;
}
}).start();
if(wizards.length<10) Level.spawnWizard(45, 8.5, 58);
}
else if(Level.getSignText(x, y+1, z, 1)=="Mosia"){
if(Magica.read("lang", true)=="true") toast("Mosia로 이동합니다...");
else toast("Moving to Mosia...");
Entity.setPosition(Player.getEntity(), 17.5, 11.5, 123.5);
Level.spawnWaterSlime(28, 8.5, 121);Level.spawnWaterSlime(23, 8.5, 117);
Level.spawnWaterSlime(9, 8.5, 118);
Level.spawnWaterSlime(11, 8.5, 111);
Level.spawnWaterSlime(20, 8.5, 106);
Level.spawnWaterSlime(29, 8.5, 108);
Level.spawnWaterSlime(35, 8.5, 105);
Level.spawnWaterSlime(34, 8.5, 100);
Level.spawnWaterSlime(24, 8.5, 93);
}
else if(Level.getSignText(x, y+1, z, 1)=="Tector"){
if(Magica.read("lang", true)=="true") toast("Tector로 이동합니다...");
else toast("Moving to Tector...");
return;
Entity.setPosition(Player.getEntity(), 17.5, 11.5, 123.5);
}
else if(Level.getSignText(x, y+1, z, 1)=="Xiky"){
if(Magica.read("lang", true)=="true") toast("Xiky로 이동합니다...");
else toast("Moving to Xiky...");
return;
Entity.setPosition(Player.getEntity(), 17.5, 11.5, 123.5);
}
else if(Level.getSignText(x, y+1, z, 1)=="Higher"&&Level.getSignText(x, y+1, z, 2)=="World"){
if(Magica.read("lang", true)=="true") toast("아직 이동할 수 없습니다.");
else toast("Cannot go yet.");
return;
if(Magica.read("lang", true)=="true") toast("하이어 월드로 이동합니다...");
else toast("Teleporting to Higher World...");
Entity.setPosition(Player.getEntity(), 17.5, 11.5, 123.5);
}
preventDefault();
}



}


function attackHook(a, v){
var i = getCarriedItem();
if(i==2002){
Entity.setVelX(v, 1.5*(Entity.getX(v)-Player.getX()));
Entity.setVelZ(v, 1.5*(Entity.getZ(v)-Player.getZ()));
preventDefault();
}
if(i==2003){
Entity.setVelX(v, 3*(Entity.getX(v)-Player.getX()));
Entity.setVelZ(v, 3*(Entity.getZ(v)-Player.getZ()));
preventDefault();
}
if(i==2005){
Entity.setHealth(v, Entity.getHealth(v)-6);
}



}


function modTick(){
if(Magica.isPortal(Math.round(Player.getX()-0.5), Math.floor(Player.getY())-1.7, Math.round(Player.getZ()-0.5))&&pt==0){
if(Magica.read("exist")!="true"&&!Magica.inOrbis(Player.getEntity())){
Entity.setPosition(Player.getEntity(), 17.5, 11.5, 68.5);
if(Magica.read("lang", true)=="true") toast("Magica Orbis 생성중...");
else toast("Generating Magica Orbis...");
makeMagicaOrbis(0);
Magica.save("exist", true);
pt2 = true;
}
else{
showScreen();
}
pt = 100;
}
if(pt>0){
pt--;
}
if(Magica.read("exist")=="true"&&pt==90&&!pt2){
if(Magica.inOrbis(Player.getEntity())){
Entity.setPosition(Player.getEntity(), Number(Magica.read("portalX"))+0.5, Number(Magica.read("portalY"))+2.7, Number(Magica.read("portalZ"))+0.5);
if(Magica.read("lang", true)=="true") toast("오버 월드로 이동합니다...");
else toast("Teleporting to Over World...");
}
else{
Entity.setPosition(Player.getEntity(), 17.5, 11.5, 68.5);
if(Magica.read("lang", true)=="true") toast("Magica Orbis로 이동합니다...");
else toast("Teleporting to Magica Orbis...");
if(wizards.length<10) Level.spawnWizard(45, 8.5, 58);
}
}
if(pt==40){
ctx.runOnUiThread(new java.lang.Runnable({
run: function(){
if(screen!=null){
screen.dismiss();
screen = null;
}
}
}));
pt2 = false;
}
if(bgmOnoff){
if(bgmTime>0) bgmTime--;
if(Magica.inOrbis(Player.getEntity())){
if(bgmTime==0||bgmFix){
bgmPlayer(true, 0);
if(bgmFix) bgmFix = false;
}
partData = null;
}
else if(!Magica.inOrbis(Player.getEntity())){
if(Magica.getPart(Player.getEntity())!=0){
if(bgmTime==0){
bgmPlayer(true, Magica.getPart(Player.getEntity()));
bgmFix = true;
}
}
if(partData!=Magica.getPart(Player.getEntity())){
if(Magica.getPart(Player.getEntity())==0){
bgm.reset();
bgmTime = false;
}
else{
bgmPlayer(true, Magica.getPart(Player.getEntity()));
bgmFix = true;
}
}
partData = Magica.getPart(Player.getEntity());
}

}

var yb = getTile(Math.round(Player.getX()-0.5), Math.floor(Player.getY())-2, Math.round(Player.getZ()-0.5));
if(yb==218&&yt==0){
yellowStone(Math.round(Player.getX()-0.5), Math.floor(Player.getY())-2, Math.round(Player.getZ()-0.5));
yt = 60;
}
else if(yb!=218){
yt = 0;
}
if(yt>0){
yt--;
}
if(anti>0){
anti--;
}


}


function startDestroyBlock(x, y, z, s){
var i = getCarriedItem();
var b = getTile(x, y, z);
if(i==2007&&(b==2||b==3||b==12||b==13)){
Level.destroyBlock(x, y, z, true);
}
if(i==2008&&!(b==2||b==3||b==12||b==13||b==17||b==18||b==162||b==183||b==1206||b==192||b==1209||b==5||b==53||b==85||b==64||b==107||b==96||b==58||b==54||b==202||b==203||b==204||b==211)){
Level.destroyBlock(x, y, z, true);
}
if(i==2006&&(b==17||b==5||b==53||b==85||b==64||b==107||b==96||b==58||b==54||b==202||b==203||b==204||b==211)){
Level.destroyBlock(x, y, z, true);
}


}


function destroyBlock(x, y, z, s){
if(Level.getGameMode()==0){
var b = getTile(x, y, z);
if(b==202||b==203||b==204||b==211){
Level.destroyBlock(x, y, z, true);
preventDefault();
}
if(b==205){
if(Math.floor(Math.random()*3)==0){
Level.destroyBlock(x, y, z, false);
}
else{
Level.destroyBlock(x, y, z, true);
Level.dropItem(x, y, z, 0, 2004, 1, 0);
}
if(Math.floor(Math.random()*2)==0)
Level.dropItem(x, y, z, 0, 2004, 1, 0);
if(Math.floor(Math.random()*3)==0)
Level.dropItem(x, y, z, 0, 2000, 1, 0);
preventDefault();
}
if(b==207){
if(Math.floor(Math.random()*3)==0)
Level.dropItem(x, y, z, 0, 2004, 1, 0);
}
if(b==222){
Level.destroyBlock(x, y, z, false);
Level.dropItem(x, y, z, 0, 2004, 1, 0);
preventDefault();
}

}


}


function arrayCheck(arr, tt){
for each(var ttt in arr){
if(tt==ttt)
return true;
}
return false;
}


function deathHook(m, v){
if(arrayCheck(wizards, v)){
Level.dropItem(Entity.getX(v), Entity.getY(v), Entity.getZ(v), 0, 2010, 1, 0);
if(Math.floor(Math.random()*3)==0)
Level.dropItem(Entity.getX(v), Entity.getY(v), Entity.getZ(v), 0, 2010, 1, 0);
preventDefault();
}
if(arrayCheck(waterSlimes, v)){
Level.dropItem(Entity.getX(v), Entity.getY(v), Entity.getZ(v), 0, 9, 1, 0);
anti = 5;
preventDefault();
}


}


function procCmd(cmd){
if(cmd=="mo reset"){
Magica.save("exist", false);
toast("Magica Orbis' data is reseted.");
}
if(cmd=="item"){
selectItem();
}
if(cmd=="mo set"){
openSetting();
}


}


function entityAddedHook(e){
if(Entity.getEntityTypeId(e)==15&&Entity.getNameTag(e)!=""){
switch(Entity.getNameTag(e)){
case "불 마법사" : 
Entity.setMobSkin(e, "mob/fireWizard.png");
Entity.setMaxHealth(e, 30);
Entity.setRenderType(e, 3);
Entity.setCollisionSize(e, 0.7, 1.7);
wizards.push(e);
break;
case "물 마법사" : 
Entity.setMobSkin(e, "mob/waterWizard.png");
Entity.setMaxHealth(e, 30);
Entity.setRenderType(e, 3);
Entity.setCollisionSize(e, 0.7, 1.7);
wizards.push(e);
break;
case "나무 마법사" : 
Entity.setMobSkin(e, "mob/treeWizard.png");
Entity.setMaxHealth(e, 30);
Entity.setRenderType(e, 3);
Entity.setCollisionSize(e, 0.7, 1.7);
wizards.push(e);
break;
case "Fire Wizard" : 
Entity.setMobSkin(e, "mob/fireWizard.png");
Entity.setMaxHealth(e, 30);
Entity.setRenderType(e, 3);
Entity.setCollisionSize(e, 0.7, 1.7);
wizards.push(e);
break;
case "Water Wizard" : 
Entity.setMobSkin(e, "mob/waterWizard.png");
Entity.setMaxHealth(e, 30);
Entity.setRenderType(e, 3);
Entity.setCollisionSize(e, 0.7, 1.7);
wizards.push(e);
break;
case "Tree Wizard" : 
Entity.setMobSkin(e, "mob/treeWizard.png");
Entity.setMaxHealth(e, 30);
Entity.setRenderType(e, 3);
Entity.setCollisionSize(e, 0.7, 1.7);
wizards.push(e);
break;
}
}
if(Magica.inOrbis(e)||Magica.getPart(e)!=0){
if(!(Player.isPlayer(e)||Entity.getEntityTypeId(e)==14||Entity.getEntityTypeId(e)==15||Entity.getEntityTypeId(e)==20||Entity.getEntityTypeId(e)==21||Entity.getEntityTypeId(e)==22||Entity.getEntityTypeId(e)==37||Entity.getEntityTypeId(e)>=63)){
Entity.remove(e);
}
if(Entity.getEntityTypeId(e)==37){
new java.lang.Thread({
run : function(){
java.lang.Thread.sleep(100);
var remove = true;
for(var n=0;n<waterSlimes.length;n++){
if(waterSlimes[n]==e){
remove = false;
break;
}
}
if(remove) Entity.remove(e);
}
}).start();
}
}
if(anti>0&&Entity.getEntityTypeId(e)==64){
Entity.remove(e);
}


}


function selectItem(){
ctx.runOnUiThread(new java.lang.Runnable({
run: function() {
try{
var gm = Level.getGameMode();
var dialog = new android.app.AlertDialog.Builder(ctx);
if(Magica.read("lang", true)=="true") var menus = ["초록색 반짝이는 돌", "보라색 반짝이는 돌", "반짝이는 나무 목재", "반짝이는 나무 반 블록", "반짝이는 나무", "반짝이는 나뭇잎", "청록색 블록", "노란 블록", "하늘 블록", "불타는 블록", "Magica Orbis 포탈", "반짝이는 울타리", "반짝이는 씨앗", "스폰 마법사", "마법지팡이", "반짝이는 마법지팡이", "반짝이는 가루", "반짝이는 검", "반짝이는 도끼", "반짝이는 삽", "반짝이는 곡괭이", "반짝이는 괭이", "마법사의 메모", "밀치는 돌", "마법적인 노란색 블록", "마법 랜턴(켜짐)", "마법 랜턴(꺼짐)", "붉은색 반짝이는 돌", "아이템 지급기", "압력 수신기", "철골램 소환서"];
else var menus = ["Green Sparkling Stone", "Purple Sparkling Stone", "Sparkling Planks", "Half Sparkling Planks", "Sparkling Log", "Sparkling Leaf", "Cyan Block", "Yellow Block", "Sky Block", "Burning Block", "Portal to Magica Orbis", "Sparkling Fence", "Sparkling Seeds", "Spawn Wizard", "Wand", "Sparkling Wand", "Sparkling Powder", "Sparkling Sword", "Sparkling Axe", "Sparkling Shovel", "Sparkling Pickaxe", "Sparkling Hoe", "Wizard's Memo", "Push Stone", "Magical Yellow Stone", "Magic Lantern(on)", "Magic Lantern(off)", "Red Sparkling Stone", "Item Giver", "Decompression Receiver", "Iron Golem Summoner"];
var codes = [200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 212, 213, 214, 215, 216, 217, 218, 2011];
dialog.setItems(menus, new android.content.DialogInterface.OnClickListener({
onClick: function(m, w){
if(gm==0)
inputAmount(codes[w]);
if(gm==1)
Entity.setCarriedItem(Player.getEntity(), codes[w], 5, 0);
}
}));
if(Magica.read("lang", true)=="true"){
if(gm==0)
dialog.setTitle("아이템 지급");
if(gm==1)
dialog.setTitle("들고 있는 아이템으로 설정");
dialog.setNegativeButton("취소", null);
}
else{
if(gm==0)
dialog.setTitle("Add Item Inventory");
if(gm==1)
dialog.setTitle("Set Carried Item");
dialog.setNegativeButton("cancel", null);
}
dialog.show();
}
catch(e){
clientMessage(e+", "+e.lineNumber);
}
}
}));
}


function inputAmount(i){
ctx.runOnUiThread(new java.lang.Runnable({
run: function() {
try{
var dialog = new android.app.AlertDialog.Builder(ctx);
var layout = new android.widget.LinearLayout(ctx);
layout.setOrientation(1);
layout.setGravity(android.view.Gravity.CENTER);
var loc2 = new android.widget.EditText(ctx);
if(Magica.read("lang", true)=="true")
loc2.setHint("개수를 입력하세요...");
else
loc2.setHint("Input Amount...");
layout.addView(loc2);
var scroll = android.widget.ScrollView(ctx);
scroll.addView(layout);
dialog.setView(scroll);
if(Magica.read("lang", true)=="true"){
dialog.setTitle("개수 선택");
dialog.setNegativeButton("취소", null);
dialog.setPositiveButton("확인", new android.content.DialogInterface.OnClickListener({
onClick: function(v){
addItemInventory(i, loc2.getText(), 0);
}
}));
}
else{
dialog.setTitle("Select Amount");
dialog.setNegativeButton("cancel", null);
dialog.setPositiveButton("OK", new android.content.DialogInterface.OnClickListener({
onClick: function(v){
addItemInventory(i, loc2.getText(), 0);
}
}));
}
dialog.show();
}
catch(e){
clientMessage(e+", "+e.lineNumber);
}
}
}));
}


function openSetting(){
ctx.runOnUiThread(new java.lang.Runnable({
run: function() {
try{
var dialog = new android.app.AlertDialog.Builder(ctx);
var layout = new android.widget.LinearLayout(ctx);
layout.setOrientation(1);
layout.setGravity(android.view.Gravity.CENTER);
var mbgm = new android.widget.ToggleButton(ctx);
if(Magica.read("lang", true)=="true"){
mbgm.setTextOn("배경음악(활성화)");
mbgm.setTextOff("배경음악(비활성화)");
}
else{
mbgm.setTextOn("Bgm(on)");
mbgm.setTextOff("BGM(off)");
}
mbgm.setChecked(bgmOnoff);
mbgm.setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener({
onCheckedChanged : function(toggle, onoff){
bgmPlayer(onoff, Magica.getPart(Player.getEntity()));
}
}));
layout.addView(mbgm);
var item = new android.widget.Button(ctx);
var rem = new android.widget.Button(ctx);
var info = new android.widget.Button(ctx);
if(Magica.read("lang", true)=="true"){
item.setText("아이템 목록 보기");
rem.setText("Magica Orbis 정보 리셋");
info.setText("스크립트 정보");
}
else{
item.setText("Show Item List");
rem.setText("Reset Magica Orbis' Info");
info.setText("ModPE Script Info");
}
item.setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(v){
selectItem();
}
});
rem.setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(v){
Magica.save("exist", false);
if(Magica.read("lang", true)=="true") toast("Magica Orbis의 정보가 리셋되었습니다.");
else toast("Magica Orbis' data is reseted.");
}
});
info.setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(v){
infoDialog();
}
});
layout.addView(item);
layout.addView(rem);
layout.addView(info);
var lan = new android.widget.Button(ctx);
lan.setText("언어/Language");
lan.setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(v){
selectLang();
}
});
layout.addView(lan);
var maker = new android.widget.TextView(ctx);
maker.setText("\n© 2014-2015 Dark Tornado, All rights reserved.\n");
maker.setTextSize(11);
maker.setGravity(android.view.Gravity.CENTER);
layout.addView(maker);
var scroll = new android.widget.ScrollView(ctx);
scroll.addView(layout);
dialog.setView(scroll);
if(Magica.read("lang", true)=="true"){
dialog.setTitle("Magica Orbis 설정");
dialog.setNegativeButton("닫기", null);
}
else{
dialog.setTitle("Magica Orbis Setting");
dialog.setNegativeButton("close", null);
}
dialog.show();
}
catch(e){
clientMessage(e+", "+e.lineNumber);
}
}
}));
}


function selectLang(tf){
ctx.runOnUiThread(new java.lang.Runnable({
run: function() {
try{
var dialog = new android.app.AlertDialog.Builder(ctx);
var events = ["한국어", "English"];
dialog.setItems(events, new android.content.DialogInterface.OnClickListener({
onClick: function(m, w){
if(w==0) Magica.save("lang", true, true);
if(w==1) Magica.save("lang", false, true);
if(tf) downloadDialog();
}
}));
if(tf) dialog.setTitle("Magica Orbis - 언어 선택/Language");
else dialog.setTitle("언어/Language");
dialog.setNegativeButton("취소/cancel", null);
dialog.show();
}
catch(e){
clientMessage(e+", "+e.lineNumber);
}
}
}));
}


function bgmPlayer(tf, type){
if(tf==true){
try{
bgm.reset();
if(type==1){
bgm.setDataSource(sdcard+"/darkTornado/magicaOrbis/Magica.mp3");
bgmTime = 2700;
}
else if(type==2){
bgm.setDataSource(sdcard+"/darkTornado/magicaOrbis/F.mp3");
bgmTime = 3250;
}
else if(type==3){
bgm.setDataSource(sdcard+"/darkTornado/magicaOrbis/Lost.mp3");
bgmTime = 3100;
}
else if(type==4){
bgm.setDataSource(sdcard+"/darkTornado/magicaOrbis/Dragon in the Dream.mp3");
bgmTime = 2800;
}
else{
bgm.setDataSource(sdcard+"/darkTornado/magicaOrbis/Time Stop.mp3");
bgmTime = 3300;
}
bgm.prepare();
bgm.start();
bgmOnoff = true;
}
catch(e){
downloadDialog();
}
}
else if(tf==false&&bgmOnoff){
bgm.reset();
bgmTime = 0;
bgmOnoff = false;
}

}


function downloadFiles(){
if(checkInternet()){
var files = ["mainImage.jpg", "Time Stop.mp3", "Magica.mp3", "F.mp3", "Lost.mp3", "Dragon in the Dream.mp3"];
var urls = ["mainImage.jpg", "Time%20Stop.mp3", "Magica.mp3", "F.mp3", "Lost.mp3", "Dragon%20in%20the%20Dream.mp3"];
for(var n in files)
download(files[n], "https://raw.githubusercontent.com/DarkTornado/MagicaOrbis/master/"+urls[n]);
}
else{
if(Magica.read("lang", true)=="true") toast("인터넷에 연결되어있지 않습니다.");
else toast("Cannot connect to the Internet.");
}
}


function download(file, url){
ctx.runOnUiThread(new java.lang.Runnable({
run: function(){
try{
var file2 = new java.io.File(sdcard+"/darkTornado/magicaOrbis/"+file);
if(!file2.exists()){
var uri = new android.net.Uri.parse(url);
var dm = new android.app.DownloadManager.Request(uri);
dm.setTitle("Magica Orbis Additional Download");
dm.setDescription("Downloading File...");
dm.setDestinationInExternalPublicDir("darkTornado/magicaOrbis", file);
dm.setNotificationVisibility(1);
ctx.getSystemService(android.content.Context.DOWNLOAD_SERVICE).enqueue(dm);
}
}
catch(e){
if(Magica.read("lang", true)=="true") toast("다운로드 실패. 오류 : "+e);
else toast("Download Failed. Error : "+e);
}
}
}));
}


function infoDialog(){
ctx.runOnUiThread(new java.lang.Runnable({
run : function(){
try{
var title = null, str = null;
var dialog = new android.app.AlertDialog.Builder(ctx);
var text = new android.widget.TextView(ctx);
var layout = new android.widget.LinearLayout(ctx)
layout.setOrientation(1);
if(Magica.read("lang", true)=="true"){
title = "스크립트 정보";
str = "닫기";
text.setText("이름 : Magica Orbis\n버전 : 0.3.0\n제작자 : Dark Tornado\n배경음악 : Dark Tornado\n\n<배경음악 목록>\n매인 배경음악 - Time Stop\nMosia - Magica");
//\nTector - F\nXiky - Lost\nGreat Library - Dragon in the Dream
}
else{
title = "ModPE Script Info";
str = "close";
text.setText("Name : Magica Orbis\nVersion : 0.3.0\nMaker : Dark Tornado\nBGM : Dark Tornado\n\n<BGM List>\nMain BGM - Time Stop\nMosia - Magica");
}
text.setTextSize(17);
layout.addView(text);
var maker = new android.widget.TextView(ctx);
maker.setText("\n© 2014-2016 Dark Tornado, All rights reserved.\n");
maker.setTextSize(11);
maker.setGravity(android.view.Gravity.CENTER);
layout.addView(maker);
var pad = dip2px(ctx, 5);
layout.setPadding(pad, pad, pad, pad);
var scroll = new android.widget.ScrollView(ctx);
scroll.addView(layout);
dialog.setView(scroll);
dialog.setTitle(title);
dialog.setNegativeButton(str, null);
dialog.show();
}
catch(e){
clientMessage(e+", "+e.lineNumber);
}
}
}));
}


function downloadDialog(){
ctx.runOnUiThread(new java.lang.Runnable({
run : function(){
try{
var dialog = new android.app.AlertDialog.Builder(ctx);
if(Magica.read("lang", true)=="true"){
dialog.setTitle("추가 파일 다운로드");
dialog.setMessage("추가 파일이 필요합니다. 다운로드 하시겠습니까?");
dialog.setNegativeButton("아니요", null);
dialog.setPositiveButton("네", new android.content.DialogInterface.OnClickListener({
onClick: function(v){
downloadFiles();
}
}));
}
else{
dialog.setTitle("Additional File Download");
dialog.setMessage("It needs additional files. Are you going to download files?");
dialog.setNegativeButton("No", null);
dialog.setPositiveButton("Yes", new android.content.DialogInterface.OnClickListener({
onClick: function(v){
downloadFiles();
}
}));
}
dialog.show();
}
catch(e){
clientMessage(e+", "+e.lineNumber);
}
}
}));
}


function checkInternet(){
try{
var cm = ctx.getSystemService(android.content.Context.CONNECTIVITY_SERVICE);
var mobile = cm.getNetworkInfo(cm.TYPE_MOBILE);
var wifi = cm.getNetworkInfo(cm.TYPE_WIFI);
if(mobile.isConnected()||wifi.isConnected()){
return true;
}
else{
return false;
}
}
catch(e){
print(e);
}
}


function showScreen(){
ctx.runOnUiThread(new java.lang.Runnable({
run: function(){
try{
var file = new java.io.File(sdcard+"/darkTornado/magicaOrbis/mainImage.jpg");
if(!file.exists()){
downloadDialog();
return;
}
screen = new android.widget.PopupWindow();
var layout = new android.widget.LinearLayout(ctx);
layout.setOrientation(1);
var image = new android.graphics.BitmapFactory.decodeFile(sdcard+"/darkTornado/magicaOrbis/mainImage.jpg");
var scre = new android.graphics.drawable.BitmapDrawable(image);
screen.setContentView(layout);
screen.setWidth(ctx.getWindowManager().getDefaultDisplay().getWidth());
screen.setHeight(ctx.getWindowManager().getDefaultDisplay().getHeight());
screen.setBackgroundDrawable(scre);
screen.showAtLocation(ctx.getWindow().getDecorView(),android.view.Gravity.CENTER|android.view.Gravity.CENTER, 0, 0);
}
catch(e){
clientMessage(e+", "+e.lineNumber);
}
}
}));
}


function leaveGame(){
bgmPlayer(false);

}


function yellowStone(x, y, z){
var px, py, pz;
no = 0;
px = x;
py = y;
pz = z;
while(true){
if(getTile(px+1, py, pz)==215)
setTile(px+1, py, pz, 214);
else if(getTile(px+1, py, pz)==214)
setTile(px+1, py, pz, 215);
if(getTile(px-1, py, pz)==215)
setTile(px-1, py, pz, 214);
else if(getTile(px-1, py, pz)==214)
setTile(px-1, py, pz, 215);
if(getTile(px, py+1, pz)==215)
setTile(px, py+1, pz, 214);
else if(getTile(px, py+1, pz)==214)
setTile(px, py+1, pz, 215);
if(getTile(px, py-1, pz)==215)
setTile(px, py-1, pz, 214);
else if(getTile(px, py-1, pz)==214)
setTile(px, py-1, pz, 215);
if(getTile(px, py, pz+1)==215)
setTile(px, py, pz+1, 214);
else if(getTile(px, py, pz+1)==214)
setTile(px, py, pz+1, 215);
if(getTile(px, py, pz-1)==215)
setTile(px, py, pz-1, 214);
else if(getTile(px, py, pz-1)==214)
setTile(px, py, pz-1, 215);

if(getTile(px+1, py, pz)==212){
if(!pushCheck(px+1, py, pz))
pushBlock(px+1, py, pz, true);
else
pushBlock(px+1, py, pz, false);
}
if(getTile(px-1, py, pz)==212){
if(!pushCheck(px-1, py, pz))
pushBlock(px-1, py, pz, true);
else
pushBlock(px-1, py, pz, false);
}
if(getTile(px, py+1, pz)==212){
if(!pushCheck(px, py+1, pz))
pushBlock(px, py+1, pz, true);
else
pushBlock(px, py+1, pz, false);
}
if(getTile(px, py-1, pz)==212){
if(!pushCheck(px, py-1, pz))
pushBlock(px, py-1, pz, true);
else
pushBlock(px, py-1, pz, false);
}
if(getTile(px, py, pz+1)==212){
if(!pushCheck(px, py, pz+1))
pushBlock(px, py, pz+1, true);
else
pushBlock(px, py, pz+1, false);
}
if(getTile(px, py, pz-1)==212){
if(!pushCheck(px, py, pz-1))
pushBlock(px, py, pz-1, true);
else
pushBlock(px, py, pz-1, false);
}
if(getTile(px+1, py, pz)==217)
giveItem(px+1, py, pz);
if(getTile(px-1, py, pz)==217)
giveItem(px-1, py, pz);
if(getTile(px, py+1, pz)==217)
giveItem(px, py+1, pz);
if(getTile(px, py-1, pz)==217)
giveItem(px, py-1, pz);
if(getTile(px, py, pz+1)==217)
giveItem(px, py, pz+1);
if(getTile(px, py, pz-1)==217)
giveItem(px, py, pz-1);
if(getTile(px+1, py, pz)==222&&no!=1){
px++;
no = 2;
}
else if(getTile(px-1, py, pz)==222&&no!=2){
px--;
no = 1;
}
else if(getTile(px, py+1, pz)==222&&no!=3){
py++;
no = 4;
}
else if(getTile(px, py-1, pz)==222&&no!=4){
py--;
no = 3;
}
else if(getTile(px, py, pz+1)==222&&no!=5){
pz++;
no = 6;
}
else if(getTile(px, py, pz-1)==222&&no!=6){
pz--;
no = 5;
}
else{
break;
}
}

}


function pushBlock(x, y, z, tf){
if(tf){
if(blockCheck(x+1, y, z)&&getTile(x+2, y, z)==0){
setTile(x+2, y, z, getTile(x+1, y, z), Level.getData(x+1, y, z));
setTile(x+1, y, z, 223);
}
if(blockCheck(x-1, y, z)&&getTile(x-2, y, z)==0){
setTile(x-2, y, z, getTile(x-1, y, z), Level.getData(x-1, y, z));
setTile(x-1, y, z, 223);
}
if(blockCheck(x, y, z+1)&&getTile(x, y, z+2)==0){
setTile(x, y, z+2, getTile(x, y, z+1), Level.getData(x, y, z+1));
setTile(x, y, z+1, 223);
}
if(blockCheck(x, y, z-1)&&getTile(x, y, z-2)==0){
setTile(x, y, z-2, getTile(x, y, z-1), Level.getData(x, y, z-1));
setTile(x, y, z-1, 223);
}
}
else{
if(blockCheck(x+2, y, z)&&getTile(x+1, y, z)==223){
setTile(x+1, y, z, getTile(x+2, y, z), Level.getData(x+2, y, z));
setTile(x+2, y, z, 0);
}
if(blockCheck(x-2, y, z)&&getTile(x-1, y, z)==223){
setTile(x-1, y, z, getTile(x-2, y, z), Level.getData(x-2, y, z));
setTile(x-2, y, z, 0);
}
if(blockCheck(x, y, z+2)&&getTile(x, y, z+1)==223){
setTile(x, y, z+1, getTile(x, y, z+2), Level.getData(x, y, z+2));
setTile(x, y, z+2, 0);
}
if(blockCheck(x, y, z-2)&&getTile(x, y, z-1)==223){
setTile(x, y, z-1, getTile(x, y, z-2), Level.getData(x, y, z-2));
setTile(x, y, z-2, 0);
}
}

}


function blockCheck(x, y, z){
if(getTile(x, y, z)==0||getTile(x, y, z)==7||getTile(x, y, z)==223||getTile(x, y, z)==95||getTile(x, y, z)==222||getTile(x, y, z)==213||getTile(x, y, z)==212||getTile(x, y, z)==215||getTile(x, y, z)==214)
return false;
else
return true;
}


function pushCheck(x, y, z){
if(getTile(x+1, y, z)==223||getTile(x-1, y, z)==223||getTile(x, y, z+1)==223||getTile(x, y, z-1)==223)
return true;
else
return false;
}


function editItemGiver(x, y, z){
ctx.runOnUiThread(new java.lang.Runnable({ run: function() {
try{
var item = Magica.read("itemGiver/"+x+","+y+","+z).toString().split(",");
var dialog = new android.app.AlertDialog.Builder(ctx);
var layout = new android.widget.LinearLayout(ctx);
layout.setOrientation(1);
layout.setGravity(android.view.Gravity.CENTER);
var loc1 = new android.widget.TextView(ctx);
var loc2 = new android.widget.EditText(ctx);
var loc3 = new android.widget.TextView(ctx);
var loc4 = new android.widget.EditText(ctx);
var loc5 = new android.widget.TextView(ctx);
var loc6 = new android.widget.EditText(ctx);
loc1.setTextSize(18);
loc2.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
loc3.setTextSize(18);
loc4.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
loc5.setTextSize(18);
loc6.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
if(Magica.read("lang", true)=="true"){
loc1.setText("아이템 코드 : ");
loc2.setHint("아이템 코드를 입력하세요...");
loc3.setText("아이템 개수 : ");
loc4.setHint("아이템 개수를 입력하세요...");
loc5.setText("아이템 데미지 : ");
loc6.setHint("아이템 데미지를 입력하세요...");
}
else{
loc1.setText("Item Id : ");
loc2.setHint("Input id...");
loc3.setText("Anount : ");
loc4.setHint("Input anount...");
loc5.setText("Damage : ");
loc6.setHint("Input damage...");
}
var file = new java.io.File(sdcard+"/darkTornado/magicaOrbis/"+Level.getWorldDir()+"/itemGiver/"+x+","+y+","+z+".txt");
if(file.exists()){
loc2.setText(item[0]);
loc4.setText(item[1]);
loc6.setText(item[2]);
}
layout.addView(loc1);
layout.addView(loc2);
layout.addView(loc3);
layout.addView(loc4);
layout.addView(loc5);
layout.addView(loc6);
var scroll = android.widget.ScrollView(ctx);
scroll.addView(layout);
dialog.setView(scroll);
if(Magica.read("lang", true)=="true"){
dialog.setTitle("아이템 설정");
dialog.setNegativeButton("취소", null);
dialog.setNeutralButton("정보 삭제", new android.content.DialogInterface.OnClickListener({
onClick: function(v){
try{
var file = new java.io.File(sdcard+"/darkTornado/magicaOrbis/"+Level.getWorldDir()+"/itemGiver/"+x+","+y+","+z+".txt");
if(file.exists())
file.delete();
}
catch(e){
clientMessage(e+", "+e.lineNumber);
}
toast("이 아이템 지급기는 더 이상 작동하지 않습니다.");
}
}));
dialog.setPositiveButton("확인", new android.content.DialogInterface.OnClickListener({
onClick: function(v){
var i, a, it;
if(loc2.getText()=="") i = 0;
else i = loc2.getText();
if(loc4.getText()=="") a = 0;
else a = loc4.getText();
if(loc6.getText()=="") it = 0;
else it = loc6.getText();
Magica.save("itemGiver/"+x+","+y+","+z, i+","+a+","+it);
toast("지급될 아이템이 설정되었습니다.");
}
}));
}
else{
dialog.setTitle("Set Item");
dialog.setNegativeButton("cancel", null);
dialog.setNeutralButton("remove info", new android.content.DialogInterface.OnClickListener({
onClick: function(v){
try{
var file = new java.io.File(sdcard+"/darkTornado/magicaOrbis/"+Level.getWorldDir()+"/itemGiver/"+x+","+y+","+z+".txt");
if(file.exists())
file.delete();
}
catch(e){
clientMessage(e+", "+e.lineNumber);
}
toast("This Item Giver will not work.");
}
}));
dialog.setPositiveButton("OK", new android.content.DialogInterface.OnClickListener({
onClick: function(v){
var i, a, it;
if(loc2.getText()=="") i = 0;
else i = loc2.getText();
if(loc4.getText()=="") a = 0;
else a = loc4.getText();
if(loc6.getText()=="") it = 0;
else it = loc6.getText();
Magica.save("itemGiver/"+x+","+y+","+z, i+","+a+","+it);
toast("Item(s) was(were) selected.");
}
}));
}
dialog.show();
}
catch(e){
clientMessage(e+", "+e.lineNumber);
}
}
}));
}


function giveItem(x, y, z){
var file = new java.io.File(sdcard+"/darkTornado/magicaOrbis/"+Level.getWorldDir()+"/itemGiver/"+x+","+y+","+z+".txt");
if(file.exists()){
var item = Magica.read("itemGiver/"+x+","+y+","+z).toString().split(",");
Level.dropItem(x+0.5, y+0.9, z+0.5, 0, item[0], item[1], item[2]);
}
}


function makeMagicaOrbis(part){
if(part==0){
for(var xx=3;xx<80;xx++){
for(var zz=3;zz<80;zz++){
setTile(xx, 3, zz, 7);
setTile(xx,30,zz,7);}}
for(var xx=3;xx<80;xx++){
for(var yy=3;yy<30;yy++){
setTile(xx, yy, 3, 7);
setTile(xx,yy, 80,7);}}
for(var yy=3;yy<30;yy++){
for(var zz=3;zz<80;zz++){
setTile(3, yy, zz, 7);
setTile(80,yy,zz,7);}}
for(var xx=4;xx<80;xx++){
for(var zz=4;zz<80;zz++){
for(var yy=4;yy<6;yy++)
setTile(xx, yy, zz, 1);
setTile(xx, 6, zz, 3);
setTile(xx, 7, zz, 2);
setTile(xx, 29, zz, 208);
for(var yy=8;yy<29;yy++)
setTile(xx,yy,zz,0);
}}
Magica.makeTree(6, 7, 6);
Magica.makeTree(6, 7, 26);
Magica.makeTree(6, 7, 39);
Magica.makeTree(6, 7, 46);
Magica.makeTree(7, 7, 15);
Magica.makeTree(7, 7, 20);
Magica.makeTree(7, 7, 33);
Magica.makeTree(7, 7, 50);
Magica.makeTree(8, 7, 11);
Magica.makeTree(10, 7, 7);
Magica.makeTree(10, 7, 17);
Magica.makeTree(10, 7, 24);
Magica.makeTree(10, 7, 41);
Magica.makeTree(11, 7, 12);
Magica.makeTree(11, 7, 31);
Magica.makeTree(11, 7, 36);
Magica.makeTree(12, 7, 28);
Magica.makeTree(12, 7, 45);
Magica.makeTree(12, 7, 48);
Magica.makeTree(13, 7, 19);
Magica.makeTree(14, 7, 7);
Magica.makeTree(14, 7, 13);
Magica.makeTree(14, 7, 34);
Magica.makeTree(14, 7, 38);
Magica.makeTree(15, 7, 23);
Magica.makeTree(15, 7, 41);
Magica.makeTree(16, 7, 29);
Magica.makeTree(17, 7, 16);
Magica.makeTree(17, 7, 20);
Magica.makeTree(17, 7, 36);
Magica.makeTree(18, 7, 7);
Magica.makeTree(18, 7, 12);
Magica.makeTree(19, 7, 32);
Magica.makeTree(19, 7, 39);
Magica.makeTree(20, 7, 26);
Magica.makeTree(22, 7, 19);
Magica.makeTree(22, 7, 23);
Magica.makeTree(22, 7, 35);
Magica.makeTree(23, 7, 31);
Magica.makeTree(24, 7, 7);
Magica.makeTree(24, 7, 13);
Magica.makeTree(24, 7, 27);
Magica.makeTree(26, 7, 19);
Magica.makeTree(26, 7, 25);
Magica.makeTree(29, 7, 7);
Magica.makeTree(29, 7, 18);
Magica.makeTree(29, 7, 22);
Magica.makeTree(30, 7, 13);
Magica.makeTree(32, 7, 10);
Magica.makeTree(33, 7, 20);
Magica.makeTree(34, 7, 7);
Magica.makeTree(35, 7, 16);
Magica.makeTree(36, 7, 12);
Magica.makeTree(38, 7, 6);
Magica.makeTree(41, 7, 21);
Magica.makeTree(42, 7, 28);
Magica.makeTree(43, 7, 14);
Magica.makeTree(46, 7, 35);
Magica.makeTree(48, 7, 10);
Magica.makeTree(51, 7, 38);
Magica.makeTree(56, 7, 7);
Magica.makeTree(56, 7, 40);
Magica.makeTree(61, 7, 37);
Magica.makeTree(64, 7, 7);
Magica.makeTree(67, 7, 35);
Magica.makeTree(68, 7, 41);
Magica.makeTree(68, 7, 68);
Magica.makeTree(68, 7, 205);
Magica.makeTree(69, 7, 49);
Magica.makeTree(69, 7, 58);
Magica.makeTree(70, 7, 11);
Magica.makeTree(72, 7, 34);
Magica.makeTree(73, 7, 9);
Magica.makeTree(73, 7, 26);
Magica.makeTree(73, 7, 54);
Magica.makeTree(73, 7, 62);
Magica.makeTree(74, 7, 18);
Magica.makeTree(74, 7, 43);
Magica.makeTree(74, 7, 49);
Magica.makeTree(74, 7, 73);
Magica.makeTree(76, 7, 12);
Magica.makeTree(76, 7, 28);
Magica.makeTree(76, 7, 37);
Magica.makeTree(76, 7, 45);
Magica.makeTree(76, 7, 55);
Magica.makeTree(76, 7, 200);
Magica.makeTree(77, 7, 62);
Magica.makeTree(77, 7, 205);
Magica.makeTree(78, 7, 20);
Magica.makeTree(30, 7, 55);
Magica.makeTree(33, 7, 58);
Magica.makeTree(33, 7, 65);
Magica.makeTree(33, 7, 73);
setTile(28, 19, 34, 205);
setTile(28, 19, 35, 205);
setTile(29, 14, 34, 202);
setTile(29, 14, 35, 202);
setTile(29, 14, 36, 202);
setTile(29, 14, 37, 202);
setTile(29, 14, 38, 202);
setTile(29, 15, 34, 202);
setTile(29, 15, 35, 202);
setTile(29, 15, 36, 202);
setTile(29, 15, 37, 202);
setTile(29, 15, 38, 202);
setTile(29, 16, 34, 202);
setTile(29, 16, 35, 202);
setTile(29, 16, 36, 202);
setTile(29, 16, 37, 202);
setTile(29, 16, 38, 202);
setTile(29, 17, 34, 202);
setTile(29, 17, 35, 202);
setTile(29, 17, 36, 202);
setTile(29, 17, 37, 202);
setTile(29, 17, 38, 202);
setTile(29, 18, 34, 202);
setTile(29, 18, 35, 202);
setTile(29, 18, 36, 202);
setTile(29, 18, 37, 202);
setTile(29, 18, 38, 202);
setTile(29, 19, 31, 205);
setTile(29, 19, 32, 205);
setTile(29, 19, 33, 205);
setTile(29, 19, 34, 205);
setTile(29, 19, 35, 205);
setTile(29, 19, 36, 205);
setTile(29, 19, 37, 205);
setTile(29, 20, 34, 205);
setTile(30, 14, 34, 202);
setTile(30, 14, 35, 202);
setTile(30, 14, 36, 202);
setTile(30, 14, 37, 202);
setTile(30, 14, 38, 202);
setTile(30, 15, 34, 202);
setTile(30, 15, 35, 47);
setTile(30, 15, 36, 47);
setTile(30, 15, 37, 47);
setTile(30, 15, 38, 202);
setTile(30, 16, 34, 202);
setTile(30, 16, 35, 47);
setTile(30, 16, 36, 47);
setTile(30, 16, 37, 47);
setTile(30, 16, 38, 202);
setTile(30, 17, 34, 202);
setTile(30, 17, 35, 47);
setTile(30, 17, 36, 47);
setTile(30, 17, 37, 47);
setTile(30, 17, 38, 202);
setTile(30, 18, 34, 202);
setTile(30, 18, 35, 202);
setTile(30, 18, 36, 202);
setTile(30, 18, 37, 202);
setTile(30, 18, 38, 202);
setTile(30, 19, 31, 205);
setTile(30, 19, 32, 205);
setTile(30, 19, 33, 205);
setTile(30, 19, 34, 205);
setTile(30, 19, 35, 205);
setTile(30, 19, 36, 205);
setTile(30, 19, 37, 205);
setTile(30, 19, 38, 205);
setTile(30, 20, 32, 205);
setTile(30, 20, 33, 205);
setTile(30, 20, 34, 205);
setTile(30, 20, 35, 205);
setTile(30, 20, 36, 205);
setTile(30, 20, 37, 205);
setTile(30, 21, 34, 205);
setTile(30, 21, 35, 205);
setTile(31, 14, 34, 202);
setTile(31, 14, 35, 202);
setTile(31, 14, 36, 202);
setTile(31, 14, 37, 202);
setTile(31, 14, 38, 202);
setTile(31, 15, 34, 202);
setTile(31, 15, 35, 47);
setTile(31, 15, 38, 202);
setTile(31, 16, 34, 202);
setTile(31, 16, 35, 47);
setTile(31, 16, 38, 202);
setTile(31, 17, 34, 202);
setTile(31, 17, 35, 47);
setTile(31, 17, 38, 202);
setTile(31, 18, 34, 202);
setTile(31, 18, 35, 202);
setTile(31, 18, 36, 202);
setTile(31, 18, 37, 202);
setTile(31, 18, 38, 202);
setTile(31, 19, 30, 205);
setTile(31, 19, 31, 205);
setTile(31, 19, 32, 205);
setTile(31, 19, 33, 205);
setTile(31, 19, 34, 205);
setTile(31, 19, 35, 205);
setTile(31, 19, 36, 205);
setTile(31, 19, 37, 205);
setTile(31, 19, 38, 205);
setTile(31, 19, 39, 205);
setTile(31, 20, 31, 205);
setTile(31, 20, 32, 205);
setTile(31, 20, 34, 205);
setTile(31, 20, 35, 205);
setTile(31, 20, 36, 205);
setTile(31, 20, 38, 205);
setTile(31, 21, 33, 205);
setTile(31, 21, 34, 205);
setTile(31, 21, 35, 205);
setTile(31, 21, 36, 205);
setTile(31, 21, 37, 205);
setTile(32, 14, 34, 202);
setTile(32, 14, 35, 202);
setTile(32, 14, 36, 202);
setTile(32, 14, 37, 202);
setTile(32, 14, 38, 202);
setTile(32, 15, 34, 202);
setTile(32, 15, 35, 47);
setTile(32, 15, 38, 202);
setTile(32, 16, 34, 202);
setTile(32, 16, 35, 47);
setTile(32, 16, 38, 102);
setTile(32, 17, 34, 202);
setTile(32, 17, 35, 47);
setTile(32, 17, 38, 202);
setTile(32, 18, 34, 202);
setTile(32, 18, 35, 202);
setTile(32, 18, 36, 202);
setTile(32, 18, 37, 202);
setTile(32, 18, 38, 202);
setTile(32, 19, 29, 205);
setTile(32, 19, 30, 205);
setTile(32, 19, 31, 205);
setTile(32, 19, 32, 205);
setTile(32, 19, 33, 205);
setTile(32, 19, 34, 205);
setTile(32, 19, 35, 205);
setTile(32, 19, 36, 205);
setTile(32, 19, 37, 205);
setTile(32, 19, 38, 205);
setTile(32, 19, 39, 205);
setTile(32, 20, 31, 205);
setTile(32, 20, 32, 205);
setTile(32, 20, 33, 205);
setTile(32, 20, 34, 205);
setTile(32, 20, 36, 205);
setTile(32, 20, 37, 205);
setTile(32, 20, 38, 205);
setTile(32, 21, 32, 205);
setTile(32, 21, 33, 205);
setTile(32, 21, 34, 205);
setTile(32, 21, 35, 205);
setTile(32, 21, 36, 205);
setTile(33, 8, 34, 204);
setTile(33, 8, 35, 204);
setTile(33, 9, 34, 204);
setTile(33, 9, 35, 204);
setTile(33, 10, 34, 204);
setTile(33, 10, 35, 204);
setTile(33, 11, 34, 204);
setTile(33, 11, 35, 204);
setTile(33, 12, 34, 204);
setTile(33, 12, 35, 204);
setTile(33, 13, 34, 204);
setTile(33, 13, 35, 204);
setTile(33, 14, 34, 204);
setTile(33, 14, 35, 204);
setTile(33, 14, 37, 202);
setTile(33, 14, 38, 202);
setTile(33, 15, 34, 204);
setTile(33, 15, 35, 204);
setTile(33, 15, 38, 202);
setTile(33, 16, 34, 204);
setTile(33, 16, 35, 204);
setTile(33, 16, 38, 202);
setTile(33, 17, 34, 204);
setTile(33, 17, 35, 204);
setTile(33, 17, 38, 202);
setTile(33, 18, 34, 204);
setTile(33, 18, 35, 204);
setTile(33, 18, 36, 202);
setTile(33, 18, 37, 202);
setTile(33, 18, 38, 202);
setTile(33, 19, 29, 205);
setTile(33, 19, 30, 205);
setTile(33, 19, 31, 205);
setTile(33, 19, 32, 205);
setTile(33, 19, 33, 205);
setTile(33, 19, 34, 204);
setTile(33, 19, 35, 204);
setTile(33, 19, 36, 205);
setTile(33, 19, 37, 205);
setTile(33, 19, 38, 205);
setTile(33, 19, 39, 205);
setTile(33, 20, 30, 205);
setTile(33, 20, 31, 205);
setTile(33, 20, 32, 205);
setTile(33, 20, 33, 205);
setTile(33, 20, 34, 204);
setTile(33, 20, 35, 205);
setTile(33, 20, 36, 205);
setTile(33, 20, 37, 205);
setTile(33, 20, 38, 205);
setTile(33, 21, 31, 205);
setTile(33, 21, 32, 205);
setTile(33, 21, 33, 205);
setTile(33, 21, 34, 205);
setTile(33, 21, 35, 205);
setTile(33, 21, 36, 205);
setTile(33, 21, 37, 205);
setTile(34, 8, 34, 204);
setTile(34, 8, 35, 204);
setTile(34, 9, 34, 204);
setTile(34, 9, 35, 204);
setTile(34, 10, 34, 204);
setTile(34, 10, 35, 204);
setTile(34, 11, 34, 204);
setTile(34, 11, 35, 204);
setTile(34, 12, 34, 204);
setTile(34, 12, 35, 204);
setTile(34, 13, 34, 204);
setTile(34, 13, 35, 204);
setTile(34, 14, 34, 204);
setTile(34, 14, 35, 204);
setTile(34, 14, 36, 202);
setTile(34, 14, 37, 202);
setTile(34, 14, 38, 202);
setTile(34, 15, 34, 204);
setTile(34, 15, 35, 204);
setTile(34, 15, 36, 202);
setTile(34, 15, 37, 202);
setTile(34, 15, 38, 202);
setTile(34, 16, 34, 204);
setTile(34, 16, 35, 204);
setTile(34, 16, 36, 202);
setTile(34, 16, 37, 202);
setTile(34, 16, 38, 202);
setTile(34, 17, 34, 204);
setTile(34, 17, 35, 204);
setTile(34, 17, 36, 202);
setTile(34, 17, 37, 202);
setTile(34, 17, 38, 202);
setTile(34, 18, 34, 204);
setTile(34, 18, 35, 204);
setTile(34, 18, 36, 202);
setTile(34, 18, 37, 202);
setTile(34, 19, 29, 205);
setTile(34, 19, 30, 205);
setTile(34, 19, 31, 205);
setTile(34, 19, 32, 205);
setTile(34, 19, 33, 205);
setTile(34, 19, 34, 204);
setTile(34, 19, 35, 204);
setTile(34, 19, 36, 205);
setTile(34, 19, 37, 205);
setTile(34, 19, 38, 205);
setTile(34, 19, 39, 205);
setTile(34, 19, 40, 205);
setTile(34, 20, 30, 205);
setTile(34, 20, 31, 205);
setTile(34, 20, 32, 205);
setTile(34, 20, 33, 205);
setTile(34, 20, 34, 205);
setTile(34, 20, 35, 205);
setTile(34, 20, 36, 205);
setTile(34, 20, 37, 205);
setTile(34, 20, 38, 205);
setTile(34, 20, 39, 205);
setTile(34, 21, 31, 205);
setTile(34, 21, 32, 205);
setTile(34, 21, 33, 205);
setTile(34, 21, 34, 205);
setTile(34, 21, 35, 205);
setTile(34, 21, 36, 205);
setTile(34, 21, 37, 205);
setTile(34, 21, 38, 205);
setTile(35, 13, 36, 204);
setTile(35, 14, 36, 204);
setTile(35, 15, 38, 205);
setTile(35, 19, 29, 205);
setTile(35, 19, 30, 205);
setTile(35, 19, 31, 205);
setTile(35, 19, 32, 205);
setTile(35, 19, 33, 205);
setTile(35, 19, 34, 205);
setTile(35, 19, 35, 205);
setTile(35, 19, 36, 205);
setTile(35, 19, 37, 205);
setTile(35, 19, 38, 205);
setTile(35, 19, 39, 205);
setTile(35, 20, 30, 205);
setTile(35, 20, 31, 205);
setTile(35, 20, 32, 205);
setTile(35, 20, 33, 205);
setTile(35, 20, 34, 205);
setTile(35, 20, 35, 205);
setTile(35, 20, 36, 205);
setTile(35, 20, 37, 205);
setTile(35, 20, 38, 205);
setTile(35, 21, 31, 205);
setTile(35, 21, 32, 205);
setTile(35, 21, 33, 205);
setTile(35, 21, 34, 205);
setTile(35, 21, 35, 205);
setTile(35, 21, 36, 205);
setTile(35, 21, 37, 205);
setTile(36, 14, 37, 204);
setTile(36, 15, 37, 205);
setTile(36, 15, 38, 205);
setTile(36, 15, 39, 205);
setTile(36, 19, 30, 205);
setTile(36, 19, 31, 205);
setTile(36, 19, 32, 205);
setTile(36, 19, 33, 205);
setTile(36, 19, 34, 205);
setTile(36, 19, 35, 205);
setTile(36, 19, 36, 205);
setTile(36, 19, 37, 205);
setTile(36, 19, 38, 205);
setTile(36, 19, 39, 205);
setTile(36, 20, 31, 205);
setTile(36, 20, 32, 205);
setTile(36, 20, 33, 205);
setTile(36, 20, 34, 205);
setTile(36, 20, 35, 205);
setTile(36, 20, 36, 205);
setTile(36, 20, 37, 205);
setTile(36, 21, 32, 205);
setTile(36, 21, 33, 205);
setTile(36, 21, 34, 205);
setTile(36, 21, 35, 205);
setTile(36, 21, 36, 205);
setTile(37, 15, 36, 205);
setTile(37, 15, 37, 205);
setTile(37, 15, 38, 204);
setTile(37, 15, 39, 205);
setTile(37, 15, 40, 205);
setTile(37, 16, 37, 205);
setTile(37, 16, 38, 205);
setTile(37, 16, 39, 205);
setTile(37, 19, 30, 205);
setTile(37, 19, 31, 205);
setTile(37, 19, 32, 205);
setTile(37, 19, 33, 205);
setTile(37, 19, 34, 205);
setTile(37, 19, 35, 205);
setTile(37, 19, 36, 205);
setTile(37, 19, 37, 205);
setTile(37, 19, 38, 205);
setTile(37, 20, 32, 205);
setTile(37, 20, 33, 205);
setTile(37, 20, 34, 205);
setTile(37, 20, 35, 205);
setTile(37, 20, 36, 205);
setTile(37, 20, 37, 205);
setTile(37, 21, 33, 205);
setTile(37, 21, 34, 205);
setTile(37, 21, 35, 205);
setTile(38, 15, 37, 205);
setTile(38, 15, 38, 205);
setTile(38, 15, 39, 205);
setTile(38, 16, 38, 205);
setTile(38, 19, 31, 205);
setTile(38, 19, 32, 205);
setTile(38, 19, 33, 205);
setTile(38, 19, 34, 205);
setTile(38, 19, 35, 205);
setTile(38, 19, 36, 205);
setTile(38, 19, 37, 205);
setTile(38, 19, 38, 205);
setTile(38, 20, 34, 205);
setTile(38, 20, 35, 205);
setTile(38, 20, 36, 205);
setTile(39, 15, 38, 205);
setTile(39, 19, 34, 205);
setTile(39, 19, 35, 205);
setTile(39, 19, 36, 205);
setTiles(33, 33, 8, 17, 36, 36, 65, 3);
setTile(19, 7, 51, 9);
setTile(19, 7, 52, 9);
setTile(19, 7, 53, 9);
setTile(20, 7, 50, 9);
setTile(20, 7, 51, 9);
setTile(20, 7, 52, 9);
setTile(20, 7, 53, 9);
setTile(20, 7, 54, 9);
setTile(21, 7, 49, 9);
setTile(21, 7, 50, 9);
setTile(21, 7, 51, 9);
setTile(21, 7, 52, 9);
setTile(21, 7, 53, 9);
setTile(21, 7, 54, 9);
setTile(21, 7, 55, 9);
setTile(22, 7, 49, 9);
setTile(22, 7, 50, 9);
setTile(22, 7, 51, 9);
setTile(22, 7, 53, 9);
setTile(22, 7, 54, 9);
setTile(22, 7, 55, 9);
setTile(23, 7, 49, 9);
setTile(23, 7, 50, 9);
setTile(23, 7, 51, 9);
setTile(23, 7, 52, 9);
setTile(23, 7, 53, 9);
setTile(23, 7, 54, 9);
setTile(23, 7, 55, 9);
setTile(24, 7, 50, 9);
setTile(24, 7, 51, 9);
setTile(24, 7, 52, 9);
setTile(24, 7, 53, 9);
setTile(24, 7, 54, 9);
setTile(25, 7, 51, 9);
setTile(25, 7, 52, 9);
setTile(25, 7, 53, 9);
setTile(18, 8, 51, 203);
setTile(18, 8, 52, 203);
setTile(18, 8, 53, 203);
setTile(19, 8, 50, 203);
setTile(19, 8, 54, 203);
setTile(20, 8, 49, 203);
setTile(20, 8, 55, 203);
setTile(21, 8, 48, 203);
setTile(21, 8, 56, 203);
setTile(22, 8, 48, 203);
setTile(22, 8, 52, 200);
setTile(22, 8, 56, 203);
setTile(22, 9, 52, 200);
setTile(22, 10, 52, 200);
setTile(22, 11, 52, 8);
setTile(23, 8, 48, 203);
setTile(23, 8, 56, 203);
setTile(24, 8, 49, 203);
setTile(24, 8, 55, 203);
setTile(25, 8, 50, 203);
setTile(25, 8, 54, 203);
setTile(26, 8, 51, 203);
setTile(26, 8, 52, 203);
setTile(26, 8, 53, 203);
setTile(28, 11, 54, 205);
setTile(28, 11, 55, 205);
setTile(28, 11, 56, 205);
setTile(28, 12, 54, 205);
setTile(28, 12, 55, 205);
setTile(28, 12, 56, 205);
setTile(6, 8, 53, 202);
setTile(6, 8, 54, 202);
setTile(6, 8, 55, 202);
setTile(6, 8, 56, 202);
setTile(6, 8, 57, 202);
setTile(6, 8, 58, 203);
setTile(6, 9, 53, 202);
setTile(6, 9, 54, 202);
setTile(6, 9, 55, 202);
setTile(6, 9, 56, 202);
setTile(6, 9, 57, 202);
setTile(6, 10, 53, 202);
setTile(6, 10, 54, 202);
setTile(6, 10, 55, 102);
setTile(6, 10, 56, 202);
setTile(6, 10, 57, 202);
setTile(6, 11, 53, 202);
setTile(6, 11, 54, 202);
setTile(6, 11, 55, 202);
setTile(6, 11, 56, 202);
setTile(6, 11, 57, 202);
setTile(6, 12, 53, 202);
setTile(6, 12, 54, 202);
setTile(6, 12, 55, 202);
setTile(6, 12, 56, 202);
setTile(6, 12, 57, 202);
setTile(7, 8, 53, 202);
setTile(7, 8, 54, 202);
setTile(7, 8, 55, 202);
setTile(7, 8, 56, 202);
setTile(7, 8, 57, 202);
setTile(7, 8, 58, 203);
setTile(7, 9, 53, 202);
setTile(7, 9, 57, 64, 1);
setTile(7, 10, 53, 202);
setTile(7, 10, 57, 64, 8);
setTile(7, 11, 53, 202);
setTile(7, 11, 57, 202);
setTile(7, 12, 53, 202);
setTile(7, 12, 54, 202);
setTile(7, 12, 55, 202);
setTile(7, 12, 56, 202);
setTile(7, 12, 57, 202);
setTile(8, 8, 53, 202);
setTile(8, 8, 54, 202);
setTile(8, 8, 55, 202);
setTile(8, 8, 56, 202);
setTile(8, 8, 57, 202);
setTile(8, 8, 58, 203);
setTile(8, 9, 53, 202);
setTile(8, 9, 57, 202);
setTile(8, 10, 53, 102);
setTile(8, 10, 57, 202);
setTile(8, 11, 53, 202);
setTile(8, 11, 57, 202);
setTile(8, 12, 53, 202);
setTile(8, 12, 54, 202);
setTile(8, 12, 55, 200);
setTile(8, 12, 56, 202);
setTile(8, 12, 57, 202);
setTile(9, 8, 53, 202);
setTile(9, 8, 54, 202);
setTile(9, 8, 55, 202);
setTile(9, 8, 56, 202);
setTile(9, 8, 57, 202);
setTile(9, 9, 53, 202);
setTile(9, 9, 57, 202);
setTile(9, 10, 53, 102);
setTile(9, 10, 57, 102);
setTile(9, 11, 53, 202);
setTile(9, 11, 57, 202);
setTile(9, 12, 53, 202);
setTile(9, 12, 54, 202);
setTile(9, 12, 55, 200);
setTile(9, 12, 56, 202);
setTile(9, 12, 57, 202);
setTile(10, 8, 53, 202);
setTile(10, 8, 54, 202);
setTile(10, 8, 55, 202);
setTile(10, 8, 56, 202);
setTile(10, 8, 57, 202);
setTile(10, 9, 53, 202);
setTile(10, 9, 57, 202);
setTile(10, 10, 53, 202);
setTile(10, 10, 57, 202);
setTile(10, 11, 53, 202);
setTile(10, 11, 57, 202);
setTile(10, 12, 53, 202);
setTile(10, 12, 54, 202);
setTile(10, 12, 55, 202);
setTile(10, 12, 56, 202);
setTile(10, 12, 57, 202);
setTile(11, 8, 53, 202);
setTile(11, 8, 54, 202);
setTile(11, 8, 55, 202);
setTile(11, 8, 56, 202);
setTile(11, 8, 57, 202);
setTile(11, 9, 53, 202);
setTile(11, 9, 54, 202);
setTile(11, 9, 55, 202);
setTile(11, 9, 56, 202);
setTile(11, 9, 57, 202);
setTile(11, 10, 53, 202);
setTile(11, 10, 54, 202);
setTile(11, 10, 55, 102);
setTile(11, 10, 56, 202);
setTile(11, 10, 57, 202);
setTile(11, 11, 53, 202);
setTile(11, 11, 54, 202);
setTile(11, 11, 55, 202);
setTile(11, 11, 56, 202);
setTile(11, 11, 57, 202);
setTile(11, 12, 53, 202);
setTile(11, 12, 54, 202);
setTile(11, 12, 55, 202);
setTile(11, 12, 56, 202);
setTile(11, 12, 57, 202);
for(var zz=60;zz<76;zz++)
setTile(9, 7, zz, 206);
setTile(9, 7, 75, 206);
setTile(10, 7, 60, 206);
setTile(11, 7, 60, 206);
setTile(11, 7, 62, 206);
setTile(11, 7, 63, 206);
setTile(11, 7, 64, 206);
setTile(11, 7, 65, 206);
setTile(11, 7, 66, 206);
setTile(11, 7, 67, 206);
setTile(11, 7, 68, 206);
setTile(11, 7, 69, 206);
setTile(11, 7, 70, 206);
setTile(11, 7, 71, 206);
setTile(11, 7, 72, 206);
setTile(11, 7, 73, 206);
setTile(11, 7, 74, 206);
setTile(11, 8, 62, 206);
setTile(11, 8, 68, 206);
setTile(11, 8, 74, 206);
setTile(11, 9, 62, 209);
setTile(11, 9, 68, 209);
setTile(11, 9, 74, 209);
setTile(11, 10, 62, 209);
setTile(11, 10, 68, 209);
setTile(11, 10, 74, 209);
setTile(11, 11, 62, 209);
setTile(11, 11, 68, 209);
setTile(11, 11, 74, 209);
setTile(11, 12, 62, 209);
setTile(11, 12, 68, 209);
setTile(11, 12, 74, 209);
setTile(11, 13, 62, 209);
setTile(11, 13, 68, 209);
setTile(11, 13, 74, 209);
setTile(11, 14, 62, 209);
setTile(11, 14, 68, 209);
setTile(11, 14, 74, 209);
setTile(11, 15, 62, 209);
setTile(11, 15, 68, 209);
setTile(11, 15, 74, 209);
setTile(11, 16, 62, 207);
setTile(11, 16, 63, 206);
setTile(11, 16, 64, 206);
setTile(11, 16, 65, 206);
setTile(11, 16, 66, 206);
setTile(11, 16, 67, 206);
setTile(11, 16, 68, 207);
setTile(11, 16, 69, 206);
setTile(11, 16, 70, 206);
setTile(11, 16, 71, 206);
setTile(11, 16, 72, 206);
setTile(11, 16, 73, 206);
setTile(11, 16, 74, 207);
setTile(12, 7, 60, 206);
setTile(12, 7, 62, 206);
setTile(12, 7, 63, 201);
setTile(12, 7, 64, 200);
setTile(12, 7, 65, 201);
setTile(12, 7, 66, 200);
setTile(12, 7, 67, 201);
setTile(12, 7, 68, 200);
setTile(12, 7, 69, 201);
setTile(12, 7, 70, 200);
setTile(12, 7, 71, 201);
setTile(12, 7, 72, 200);
setTile(12, 7, 73, 201);
setTile(12, 7, 74, 206);
setTile(12, 16, 62, 206);
setTile(12, 16, 68, 207);
setTile(12, 16, 74, 206);
setTile(13, 7, 60, 206);
setTile(13, 7, 62, 206);
setTile(13, 7, 63, 200);
setTile(13, 7, 64, 201);
setTile(13, 7, 65, 200);
setTile(13, 7, 66, 201);
setTile(13, 7, 67, 200);
setTile(13, 7, 68, 201);
setTile(13, 7, 69, 200);
setTile(13, 7, 70, 201);
setTile(13, 7, 71, 200);
setTile(13, 7, 72, 201);
setTile(13, 7, 73, 200);
setTile(13, 7, 74, 206);
setTile(13, 16, 62, 206);
setTile(13, 16, 68, 207);
setTile(13, 16, 74, 206);
setTile(14, 7, 60, 206);
setTile(14, 7, 62, 206);
setTile(14, 7, 63, 201);
setTile(14, 7, 64, 200);
setTile(14, 7, 72, 200);
setTile(14, 7, 73, 201);
setTile(14, 7, 74, 206);
setTile(14, 8, 65, 156, 2);
setTile(14, 8, 66, 156);
setTile(14, 8, 67, 156);
setTile(14, 8, 68, 156);
setTile(14, 8, 69, 156);
setTile(14, 8, 70, 156);
setTile(14, 8, 71, 156);
setTile(14, 16, 62, 206);
setTile(14, 16, 74, 206);
setTile(14, 17, 68, 207);
setTile(15, 7, 60, 206);
setTile(15, 7, 62, 206);
setTile(15, 7, 63, 200);
setTile(15, 7, 64, 201);
setTile(15, 7, 72, 201);
setTile(15, 7, 73, 200);
setTile(15, 7, 74, 206);
setTile(15, 8, 65, 156, 2);
setTile(15, 8, 71, 156, 3);
setTile(15, 9, 66, 156, 2);
setTile(15, 9, 67, 156);
setTile(15, 9, 68, 156);
setTile(15, 9, 69, 156);
setTile(15, 9, 70, 156);
setTile(15, 16, 62, 206);
setTile(15, 16, 74, 206);
setTile(15, 17, 68, 207);
setTile(16, 7, 60, 206);
setTile(16, 7, 62, 206);
setTile(16, 7, 63, 201);
setTile(16, 7, 64, 200);
setTile(16, 7, 72, 200);
setTile(16, 7, 73, 201);
setTile(16, 7, 74, 206);
setTile(16, 8, 65, 156, 2);
setTile(16, 8, 67, 89);
setTile(16, 8, 68, 89);
setTile(16, 8, 69, 89);
setTile(16, 8, 71, 156, 3);
setTile(16, 9, 66, 156, 2);
setTile(16, 9, 67, 89);
setTile(16, 9, 68, 89);
setTile(16, 9, 69, 89);
setTile(16, 9, 70, 156, 3);
setTile(16, 16, 62, 206);
setTile(16, 16, 74, 206);
setTile(16, 17, 68, 207);
setTile(17, 7, 60, 206);
setTile(17, 7, 62, 206);
setTile(17, 7, 63, 200);
setTile(17, 7, 64, 201);
setTile(17, 7, 72, 201);
setTile(17, 7, 73, 200);
setTile(17, 7, 74, 206);
setTile(17, 8, 62, 206);
setTile(17, 8, 65, 156, 2);
setTile(17, 8, 67, 89);
setTile(17, 8, 68, 89);
setTile(17, 8, 69, 89);
setTile(17, 8, 71, 156, 3);
setTile(17, 8, 74, 206);
setTile(17, 9, 62, 209);
setTile(17, 9, 66, 156, 2);
setTile(17, 9, 67, 89);
setTile(17, 9, 68, 210);
setTile(17, 9, 69, 89);
setTile(17, 9, 70, 156, 3);
setTile(17, 9, 74, 209);
setTile(17, 10, 62, 209);
setTile(17, 10, 74, 209);
setTile(17, 11, 62, 209);
setTile(17, 11, 74, 209);
setTile(17, 12, 62, 209);
setTile(17, 12, 74, 209);
setTile(17, 13, 62, 209);
setTile(17, 13, 74, 209);
setTile(17, 14, 62, 209);
setTile(17, 14, 74, 209);
setTile(17, 15, 62, 209);
setTile(17, 15, 74, 209);
setTile(17, 16, 62, 207);
setTile(17, 16, 63, 207);
setTile(17, 16, 64, 207);
setTile(17, 16, 72, 207);
setTile(17, 16, 73, 207);
setTile(17, 16, 74, 207);
setTile(17, 17, 65, 207);
setTile(17, 17, 66, 207);
setTile(17, 17, 67, 207);
setTile(17, 17, 68, 206);
setTile(17, 17, 69, 207);
setTile(17, 17, 70, 207);
setTile(17, 17, 71, 207);
setTile(18, 7, 60, 206);
setTile(18, 7, 62, 206);
setTile(18, 7, 63, 201);
setTile(18, 7, 64, 200);
setTile(18, 7, 72, 200);
setTile(18, 7, 73, 201);
setTile(18, 7, 74, 206);
setTile(18, 8, 65, 156, 2);
setTile(18, 8, 67, 89);
setTile(18, 8, 68, 89);
setTile(18, 8, 69, 89);
setTile(18, 8, 71, 156, 3);
setTile(18, 9, 66, 156, 2);
setTile(18, 9, 67, 89);
setTile(18, 9, 68, 89);
setTile(18, 9, 69, 89);
setTile(18, 9, 70, 156, 3);
setTile(18, 16, 62, 206);
setTile(18, 16, 74, 206);
setTile(18, 17, 68, 207);
setTile(19, 7, 60, 206);
setTile(19, 7, 62, 206);
setTile(19, 7, 63, 200);
setTile(19, 7, 64, 201);
setTile(19, 7, 72, 201);
setTile(19, 7, 73, 200);
setTile(19, 7, 74, 206);
setTile(19, 8, 65, 156, 2);
setTile(19, 8, 71, 156, 3);
setTile(19, 9, 66, 156, 1);
setTile(19, 9, 67, 156, 1);
setTile(19, 9, 68, 156, 1);
setTile(19, 9, 69, 156, 1);
setTile(19, 9, 70, 156, 1);
setTile(19, 16, 62, 206);
setTile(19, 16, 74, 206);
setTile(19, 17, 68, 207);
setTile(20, 7, 60, 206);
setTile(20, 7, 62, 206);
setTile(20, 7, 63, 201);
setTile(20, 7, 64, 200);
setTile(20, 7, 72, 200);
setTile(20, 7, 73, 201);
setTile(20, 7, 74, 206);
setTile(20, 8, 65, 156, 1);
setTile(20, 8, 66, 156, 1);
setTile(20, 8, 67, 156, 1);
setTile(20, 8, 68, 156, 1);
setTile(20, 8, 69, 156, 1);
setTile(20, 8, 70, 156, 1);
setTile(20, 8, 71, 156, 1);
setTile(20, 16, 62, 206);
setTile(20, 16, 74, 206);
setTile(20, 17, 68, 207);
setTile(21, 7, 60, 206);
setTile(21, 7, 62, 206);
setTile(21, 7, 63, 200);
setTile(21, 7, 64, 201);
setTile(21, 7, 65, 200);
setTile(21, 7, 66, 201);
setTile(21, 7, 67, 200);
setTile(21, 7, 68, 201);
setTile(21, 7, 69, 200);
setTile(21, 7, 70, 201);
setTile(21, 7, 71, 200);
setTile(21, 7, 72, 201);
setTile(21, 7, 73, 200);
setTile(21, 7, 74, 206);
setTile(21, 16, 62, 206);
setTile(21, 16, 68, 207);
setTile(21, 16, 74, 206);
setTile(22, 7, 60, 206);
setTile(22, 7, 62, 206);
setTile(22, 7, 63, 201);
setTile(22, 7, 64, 200);
setTile(22, 7, 65, 201);
setTile(22, 7, 66, 200);
setTile(22, 7, 67, 201);
setTile(22, 7, 68, 200);
setTile(22, 7, 69, 201);
setTile(22, 7, 70, 200);
setTile(22, 7, 71, 201);
setTile(22, 7, 72, 200);
setTile(22, 7, 73, 201);
setTile(22, 7, 74, 206);
setTile(22, 16, 62, 206);
setTile(22, 16, 68, 207);
setTile(22, 16, 74, 206);
setTile(23, 7, 60, 206);
setTile(23, 7, 62, 206);
setTile(23, 7, 63, 206);
setTile(23, 7, 64, 206);
setTile(23, 7, 65, 206);
setTile(23, 7, 66, 206);
setTile(23, 7, 67, 206);
setTile(23, 7, 68, 206);
setTile(23, 7, 69, 206);
setTile(23, 7, 70, 206);
setTile(23, 7, 71, 206);
setTile(23, 7, 72, 206);
setTile(23, 7, 73, 206);
setTile(23, 7, 74, 206);
setTile(23, 8, 62, 206);
setTile(23, 8, 68, 206);
setTile(23, 8, 74, 206);
setTile(23, 9, 62, 209);
setTile(23, 9, 68, 209);
setTile(23, 9, 74, 209);
setTile(23, 10, 62, 209);
setTile(23, 10, 68, 209);
setTile(23, 10, 74, 209);
setTile(23, 11, 62, 209);
setTile(23, 11, 68, 209);
setTile(23, 11, 74, 209);
setTile(23, 12, 62, 209);
setTile(23, 12, 68, 209);
setTile(23, 12, 74, 209);
setTile(23, 13, 62, 209);
setTile(23, 13, 68, 209);
setTile(23, 13, 74, 209);
setTile(23, 14, 62, 209);
setTile(23, 14, 68, 209);
setTile(23, 14, 74, 209);
setTile(23, 15, 62, 209);
setTile(23, 15, 68, 209);
setTile(23, 15, 74, 209);
setTile(23, 16, 62, 207);
setTile(23, 16, 63, 206);
setTile(23, 16, 64, 206);
setTile(23, 16, 65, 206);
setTile(23, 16, 66, 206);
setTile(23, 16, 67, 206);
setTile(23, 16, 68, 207);
setTile(23, 16, 69, 206);
setTile(23, 16, 70, 206);
setTile(23, 16, 71, 206);
setTile(23, 16, 72, 206);
setTile(23, 16, 73, 206);
setTile(23, 16, 74, 207);
setTile(24, 7, 60, 206);
for(var xx=10;xx<25;xx++){
setTile(xx, 7, 61, 9);
setTile(xx, 6, 61, 207);
setTile(xx, 7, 75, 9);
setTile(xx, 6, 75, 207);
}
for(var zz=61;zz<76;zz++){
setTile(10, 7, zz, 9);
setTile(10, 6, zz, 207);
setTile(24, 7, zz, 9);
setTile(24, 6, zz, 207);
}
setTile(30, 8, 47, 202);
setTile(30, 8, 48, 202);
setTile(30, 8, 49, 202);
setTile(30, 8, 50, 202);
setTile(30, 8, 51, 202);
setTile(30, 9, 47, 202);
setTile(30, 9, 48, 202);
setTile(30, 9, 49, 202);
setTile(30, 9, 50, 202);
setTile(30, 9, 51, 202);
setTile(30, 10, 47, 202);
setTile(30, 10, 48, 202);
setTile(30, 10, 49, 202);
setTile(30, 10, 50, 202);
setTile(30, 10, 51, 202);
setTile(30, 11, 47, 202);
setTile(30, 11, 48, 202);
setTile(30, 11, 49, 202);
setTile(30, 11, 50, 202);
setTile(30, 11, 51, 202);
setTile(31, 7, 47, 202);
setTile(31, 7, 48, 202);
setTile(31, 7, 49, 202);
setTile(31, 7, 50, 202);
setTile(31, 8, 47, 202);
setTile(31, 8, 48, 1201);
setTile(31, 8, 49, 1201);
setTile(31, 8, 50, 1201);
setTile(31, 8, 51, 202);
setTile(31, 9, 47, 202);
setTile(31, 9, 48, 1201);
setTile(31, 9, 49, 1201);
setTile(31, 9, 50, 1201);
setTile(31, 9, 51, 202);
setTile(31, 10, 47, 202);
setTile(31, 10, 48, 1201);
setTile(31, 10, 49, 1201);
setTile(31, 10, 50, 1201);
setTile(31, 10, 51, 202);
setTile(31, 11, 47, 202);
setTile(31, 11, 48, 202);
setTile(31, 11, 49, 202);
setTile(31, 11, 50, 202);
setTile(31, 11, 51, 202);
setTile(32, 7, 47, 202);
setTile(32, 7, 48, 202);
setTile(32, 7, 49, 202);
setTile(32, 7, 50, 202);
setTile(32, 8, 47, 202);
setTile(32, 8, 48, 1201);
setTile(32, 8, 49, 1201);
setTile(32, 8, 50, 1201);
setTile(32, 8, 51, 202);
setTile(32, 9, 47, 202);
setTile(32, 9, 48, 1201);
setTile(32, 9, 49, 1201);
setTile(32, 9, 50, 1201);
setTile(32, 9, 51, 202);
setTile(32, 10, 47, 202);
setTile(32, 10, 48, 1201);
setTile(32, 10, 49, 1201);
setTile(32, 10, 50, 1201);
setTile(32, 10, 51, 202);
setTile(32, 11, 47, 202);
setTile(32, 11, 48, 202);
setTile(32, 11, 49, 202);
setTile(32, 11, 50, 202);
setTile(32, 11, 51, 202);
setTile(33, 7, 47, 202);
setTile(33, 7, 48, 202);
setTile(33, 7, 49, 202);
setTile(33, 7, 50, 202);
setTile(33, 8, 47, 64, 3);
setTile(33, 8, 48, 1201);
setTile(33, 8, 49, 1201);
setTile(33, 8, 50, 1201);
setTile(33, 8, 51, 202);
setTile(33, 9, 47, 64, 8);
setTile(33, 9, 48, 1201);
setTile(33, 9, 49, 1201);
setTile(33, 9, 50, 1201);
setTile(33, 9, 51, 202);
setTile(33, 10, 47, 202);
setTile(33, 10, 48, 1201);
setTile(33, 10, 49, 1201);
setTile(33, 10, 50, 1201);
setTile(33, 10, 51, 202);
setTile(33, 11, 47, 202);
setTile(33, 11, 48, 202);
setTile(33, 11, 49, 202);
setTile(33, 11, 50, 202);
setTile(33, 11, 51, 202);
setTile(34, 8, 47, 202);
setTile(34, 8, 48, 202);
setTile(34, 8, 49, 202);
setTile(34, 8, 50, 202);
setTile(34, 8, 51, 202);
setTile(34, 9, 47, 202);
setTile(34, 9, 48, 202);
setTile(34, 9, 49, 202);
setTile(34, 9, 50, 202);
setTile(34, 9, 51, 202);
setTile(34, 10, 47, 202);
setTile(34, 10, 48, 202);
setTile(34, 10, 49, 202);
setTile(34, 10, 50, 202);
setTile(34, 10, 51, 202);
setTile(34, 11, 47, 202);
setTile(34, 11, 48, 202);
setTile(34, 11, 49, 202);
setTile(34, 11, 50, 202);
setTile(34, 11, 51, 202);
setTile(57, 7, 45, 9);
setTile(57, 7, 49, 9);
setTile(57, 7, 53, 9);
setTile(57, 7, 57, 9);
setTile(57, 7, 61, 9);
setTile(57, 7, 65, 9);
setTile(58, 7, 45, 9);
setTile(58, 7, 49, 9);
setTile(58, 7, 53, 9);
setTile(58, 7, 57, 9);
setTile(58, 7, 61, 9);
setTile(58, 7, 65, 9);
setTile(59, 7, 45, 9);
setTile(59, 7, 49, 9);
setTile(59, 7, 53, 9);
setTile(59, 7, 57, 9);
setTile(59, 7, 61, 9);
setTile(59, 7, 65, 9);
setTile(59, 7, 70, 9);
setTile(59, 7, 71, 9);
setTile(59, 7, 72, 9);
setTile(59, 7, 73, 9);
setTile(59, 7, 74, 9);
setTile(59, 7, 75, 9);
setTile(59, 7, 76, 9);
setTile(60, 7, 45, 9);
setTile(60, 7, 49, 9);
setTile(60, 7, 53, 9);
setTile(60, 7, 57, 9);
setTile(60, 7, 61, 9);
setTile(60, 7, 65, 9);
setTile(61, 7, 45, 9);
setTile(61, 7, 49, 9);
setTile(61, 7, 53, 9);
setTile(61, 7, 57, 9);
setTile(61, 7, 61, 9);
setTile(61, 7, 65, 9);
setTile(57, 7, 44, 60, 7);
setTile(57, 7, 46, 60, 7);
setTile(57, 7, 48, 60, 7);
setTile(57, 7, 50, 60, 7);
setTile(57, 7, 52, 60, 7);
setTile(57, 7, 54, 60, 7);
setTile(57, 7, 56, 60, 7);
setTile(57, 7, 58, 60, 7);
setTile(57, 7, 60, 60, 7);
setTile(57, 7, 62, 60, 7);
setTile(57, 7, 64, 60, 7);
setTile(57, 7, 66, 60, 7);
setTile(58, 7, 44, 60, 7);
setTile(58, 7, 46, 60, 7);
setTile(58, 7, 48, 60, 7);
setTile(58, 7, 50, 60, 7);
setTile(58, 7, 52, 60, 7);
setTile(58, 7, 54, 60, 7);
setTile(58, 7, 56, 60, 7);
setTile(58, 7, 58, 60, 7);
setTile(58, 7, 60, 60, 7);
setTile(58, 7, 62, 60, 7);
setTile(58, 7, 64, 60, 7);
setTile(58, 7, 66, 60, 7);
setTile(58, 7, 70, 60, 7);
setTile(58, 7, 71, 60, 7);
setTile(58, 7, 72, 60, 7);
setTile(58, 7, 73, 60, 7);
setTile(58, 7, 74, 60, 7);
setTile(58, 7, 75, 60, 7);
setTile(58, 7, 76, 60, 7);
setTile(59, 7, 44, 60, 7);
setTile(59, 7, 46, 60, 7);
setTile(59, 7, 48, 60, 7);
setTile(59, 7, 50, 60, 7);
setTile(59, 7, 52, 60, 7);
setTile(59, 7, 54, 60, 7);
setTile(59, 7, 56, 60, 7);
setTile(59, 7, 58, 60, 7);
setTile(59, 7, 60, 60, 7);
setTile(59, 7, 62, 60, 7);
setTile(59, 7, 64, 60, 7);
setTile(59, 7, 66, 60, 7);
setTile(60, 7, 44, 60, 7);
setTile(60, 7, 46, 60, 7);
setTile(60, 7, 48, 60, 7);
setTile(60, 7, 50, 60, 7);
setTile(60, 7, 52, 60, 7);
setTile(60, 7, 54, 60, 7);
setTile(60, 7, 56, 60, 7);
setTile(60, 7, 58, 60, 7);
setTile(60, 7, 60, 60, 7);
setTile(60, 7, 62, 60, 7);
setTile(60, 7, 64, 60, 7);
setTile(60, 7, 66, 60, 7);
setTile(60, 7, 70, 60, 7);
setTile(60, 7, 71, 60, 7);
setTile(60, 7, 72, 60, 7);
setTile(60, 7, 73, 60, 7);
setTile(60, 7, 74, 60, 7);
setTile(60, 7, 75, 60, 7);
setTile(60, 7, 76, 60, 7);
setTile(61, 7, 44, 60, 7);
setTile(61, 7, 46, 60, 7);
setTile(61, 7, 48, 60, 7);
setTile(61, 7, 50, 60, 7);
setTile(61, 7, 52, 60, 7);
setTile(61, 7, 54, 60, 7);
setTile(61, 7, 56, 60, 7);
setTile(61, 7, 58, 60, 7);
setTile(61, 7, 60, 60, 7);
setTile(61, 7, 62, 60, 7);
setTile(61, 7, 64, 60, 7);
setTile(61, 7, 66, 60, 7);
setTile(33, 7, 43, 198);
setTile(33, 7, 44, 198);
setTile(33, 7, 45, 198);
setTile(33, 7, 46, 198);
for(var xx=34;zz<45;xx++)
setTile(xx, 7, 43, 198);
setTile(44, 7, 47, 198);
setTile(44, 7, 55, 198);
setTile(44, 7, 63, 198);
setTile(44, 7, 71, 198);
for(var zz=43;zz<79;zz++)
setTile(45, 7, zz, 198);
setTile(46, 7, 43, 198);
setTile(46, 7, 47, 198);
setTile(46, 7, 55, 198);
setTile(46, 7, 63, 198);
setTile(46, 7, 71, 198);
setTile(46, 7, 78, 198);
setTile(47, 7, 43, 198);
setTile(47, 7, 78, 198);
setTile(48, 7, 43, 198);
setTile(48, 7, 78, 198);
setTile(49, 7, 43, 198);
setTile(49, 7, 78, 198);
setTile(50, 7, 43, 198);
setTile(50, 7, 78, 198);
setTile(51, 7, 43, 198);
setTile(51, 7, 78, 198);
setTile(52, 7, 43, 198);
setTile(52, 7, 78, 198);
setTile(53, 7, 43, 198);
setTile(53, 7, 78, 198);
setTile(54, 7, 43, 198);
setTile(54, 7, 78, 198);
setTile(55, 7, 43, 198);
setTile(55, 7, 78, 198);
for(var zz=43;zz<79;zz++)
setTile(56, 7, zz, 198);
setTile(57, 7, 43, 198);
setTile(57, 7, 47, 198);
setTile(57, 7, 51, 198);
setTile(57, 7, 55, 198);
setTile(57, 7, 59, 198);
setTile(57, 7, 63, 198);
setTile(57, 7, 67, 198);
setTile(57, 7, 69, 198);
setTile(57, 7, 77, 198);
setTile(58, 7, 43, 198);
setTile(58, 7, 47, 198);
setTile(58, 7, 51, 198);
setTile(58, 7, 55, 198);
setTile(58, 7, 59, 198);
setTile(58, 7, 63, 198);
setTile(58, 7, 67, 198);
setTile(58, 7, 69, 198);
setTile(58, 7, 77, 198);
setTile(59, 7, 43, 198);
setTile(59, 7, 47, 198);
setTile(59, 7, 51, 198);
setTile(59, 7, 55, 198);
setTile(59, 7, 59, 198);
setTile(59, 7, 63, 198);
setTile(59, 7, 67, 198);
setTile(59, 7, 69, 198);
setTile(59, 7, 77, 198);
setTile(60, 7, 43, 198);
setTile(60, 7, 47, 198);
setTile(60, 7, 51, 198);
setTile(60, 7, 55, 198);
setTile(60, 7, 59, 198);
setTile(60, 7, 63, 198);
setTile(60, 7, 67, 198);
setTile(60, 7, 69, 198);
setTile(60, 7, 77, 198);
setTile(61, 7, 43, 198);
setTile(61, 7, 47, 198);
setTile(61, 7, 51, 198);
setTile(61, 7, 55, 198);
setTile(61, 7, 59, 198);
setTile(61, 7, 63, 198);
setTile(61, 7, 67, 198);
setTile(61, 7, 69, 198);
setTile(61, 7, 77, 198);
for(var zz=43;zz<78;zz++)
setTile(62, 7, zz, 198);
for(var zz=46;zz<52;zz++)
setTile(38, 8, zz, 202);
for(var zz=54;zz<60;zz++)
setTile(38, 8, zz, 202);
setTile(38, 8, 62, 202);
setTile(38, 8, 63, 202);
setTile(38, 8, 64, 202);
setTile(38, 8, 65, 202);
setTile(38, 8, 66, 202);
setTile(38, 8, 67, 202);
setTile(38, 8, 70, 202);
setTile(38, 8, 71, 202);
setTile(38, 8, 72, 202);
setTile(38, 8, 73, 202);
setTile(38, 8, 74, 202);
setTile(38, 8, 75, 202);
setTile(38, 9, 46, 202);
setTile(38, 9, 47, 202);
setTile(38, 9, 48, 202);
setTile(38, 9, 49, 202);
setTile(38, 9, 50, 202);
setTile(38, 9, 51, 202);
setTile(38, 9, 54, 202);
setTile(38, 9, 55, 202);
setTile(38, 9, 56, 202);
setTile(38, 9, 57, 202);
setTile(38, 9, 58, 202);
setTile(38, 9, 59, 202);
setTile(38, 9, 62, 202);
setTile(38, 9, 63, 202);
setTile(38, 9, 64, 202);
setTile(38, 9, 65, 202);
setTile(38, 9, 66, 202);
setTile(38, 9, 67, 202);
setTile(38, 9, 70, 202);
setTile(38, 9, 71, 202);
setTile(38, 9, 72, 202);
setTile(38, 9, 73, 202);
setTile(38, 9, 74, 202);
setTile(38, 9, 75, 202);
setTile(38, 10, 46, 202);
setTile(38, 10, 47, 202);
setTile(38, 10, 48, 102);
setTile(38, 10, 49, 102);
setTile(38, 10, 50, 202);
setTile(38, 10, 51, 202);
setTile(38, 10, 54, 202);
setTile(38, 10, 55, 202);
setTile(38, 10, 56, 102);
setTile(38, 10, 57, 102);
setTile(38, 10, 58, 202);
setTile(38, 10, 59, 202);
setTile(38, 10, 62, 202);
setTile(38, 10, 63, 202);
setTile(38, 10, 64, 102);
setTile(38, 10, 65, 102);
setTile(38, 10, 66, 202);
setTile(38, 10, 67, 202);
setTile(38, 10, 70, 202);
setTile(38, 10, 71, 202);
setTile(38, 10, 72, 102);
setTile(38, 10, 73, 102);
setTile(38, 10, 74, 202);
setTile(38, 10, 75, 202);
setTile(38, 11, 46, 202);
setTile(38, 11, 47, 202);
setTile(38, 11, 48, 202);
setTile(38, 11, 49, 202);
setTile(38, 11, 50, 202);
setTile(38, 11, 51, 202);
setTile(38, 11, 54, 202);
setTile(38, 11, 55, 202);
setTile(38, 11, 56, 202);
setTile(38, 11, 57, 202);
setTile(38, 11, 58, 202);
setTile(38, 11, 59, 202);
setTile(38, 11, 62, 202);
setTile(38, 11, 63, 202);
setTile(38, 11, 64, 202);
setTile(38, 11, 65, 202);
setTile(38, 11, 66, 202);
setTile(38, 11, 67, 202);
setTile(38, 11, 70, 202);
setTile(38, 11, 71, 202);
setTile(38, 11, 72, 202);
setTile(38, 11, 73, 202);
setTile(38, 11, 74, 202);
setTile(38, 11, 75, 202);
setTile(38, 12, 46, 202);
setTile(38, 12, 47, 202);
setTile(38, 12, 48, 202);
setTile(38, 12, 49, 202);
setTile(38, 12, 50, 202);
setTile(38, 12, 51, 202);
setTile(38, 12, 54, 202);
setTile(38, 12, 55, 202);
setTile(38, 12, 56, 202);
setTile(38, 12, 57, 202);
setTile(38, 12, 58, 202);
setTile(38, 12, 59, 202);
setTile(38, 12, 62, 202);
setTile(38, 12, 63, 202);
setTile(38, 12, 64, 202);
setTile(38, 12, 65, 202);
setTile(38, 12, 66, 202);
setTile(38, 12, 67, 202);
setTile(38, 12, 70, 202);
setTile(38, 12, 71, 202);
setTile(38, 12, 72, 202);
setTile(38, 12, 73, 202);
setTile(38, 12, 74, 202);
setTile(38, 12, 75, 202);
setTile(39, 8, 46, 202);
setTile(39, 8, 47, 202);
setTile(39, 8, 48, 202);
setTile(39, 8, 49, 202);
setTile(39, 8, 50, 202);
setTile(39, 8, 51, 202);
setTile(39, 8, 54, 202);
setTile(39, 8, 55, 202);
setTile(39, 8, 56, 202);
setTile(39, 8, 57, 202);
setTile(39, 8, 58, 202);
setTile(39, 8, 59, 202);
setTile(39, 8, 62, 202);
setTile(39, 8, 63, 202);
setTile(39, 8, 64, 202);
setTile(39, 8, 65, 202);
setTile(39, 8, 66, 202);
setTile(39, 8, 67, 202);
setTile(39, 8, 70, 202);
setTile(39, 8, 71, 202);
setTile(39, 8, 72, 202);
setTile(39, 8, 73, 202);
setTile(39, 8, 74, 202);
setTile(39, 8, 75, 202);
setTile(39, 9, 46, 202);
setTile(39, 9, 51, 202);
setTile(39, 9, 54, 202);
setTile(39, 9, 59, 202);
setTile(39, 9, 62, 202);
setTile(39, 9, 67, 202);
setTile(39, 9, 70, 202);
setTile(39, 9, 75, 202);
setTile(39, 10, 46, 202);
setTile(39, 10, 51, 202);
setTile(39, 10, 54, 202);
setTile(39, 10, 59, 202);
setTile(39, 10, 62, 202);
setTile(39, 10, 67, 202);
setTile(39, 10, 70, 202);
setTile(39, 10, 75, 202);
setTile(39, 11, 46, 202);
setTile(39, 11, 51, 202);
setTile(39, 11, 54, 202);
setTile(39, 11, 59, 202);
setTile(39, 11, 62, 202);
setTile(39, 11, 67, 202);
setTile(39, 11, 70, 202);
setTile(39, 11, 75, 202);
setTile(39, 12, 46, 202);
setTile(39, 12, 47, 202);
setTile(39, 12, 48, 202);
setTile(39, 12, 49, 202);
setTile(39, 12, 50, 202);
setTile(39, 12, 51, 202);
setTile(39, 12, 54, 202);
setTile(39, 12, 55, 202);
setTile(39, 12, 56, 202);
setTile(39, 12, 57, 202);
setTile(39, 12, 58, 202);
setTile(39, 12, 59, 202);
setTile(39, 12, 62, 202);
setTile(39, 12, 63, 202);
setTile(39, 12, 64, 202);
setTile(39, 12, 65, 202);
setTile(39, 12, 66, 202);
setTile(39, 12, 67, 202);
setTile(39, 12, 70, 202);
setTile(39, 12, 71, 202);
setTile(39, 12, 72, 202);
setTile(39, 12, 73, 202);
setTile(39, 12, 74, 202);
setTile(39, 12, 75, 202);
setTile(40, 8, 46, 202);
setTile(40, 8, 47, 202);
setTile(40, 8, 48, 202);
setTile(40, 8, 49, 202);
setTile(40, 8, 50, 202);
setTile(40, 8, 51, 202);
setTile(40, 8, 54, 202);
setTile(40, 8, 55, 202);
setTile(40, 8, 56, 202);
setTile(40, 8, 57, 202);
setTile(40, 8, 58, 202);
setTile(40, 8, 59, 202);
setTile(40, 8, 62, 202);
setTile(40, 8, 63, 202);
setTile(40, 8, 64, 202);
setTile(40, 8, 65, 202);
setTile(40, 8, 66, 202);
setTile(40, 8, 67, 202);
setTile(40, 8, 70, 202);
setTile(40, 8, 71, 202);
setTile(40, 8, 72, 202);
setTile(40, 8, 73, 202);
setTile(40, 8, 74, 202);
setTile(40, 8, 75, 202);
setTile(40, 9, 46, 202);
setTile(40, 9, 51, 202);
setTile(40, 9, 54, 202);
setTile(40, 9, 59, 202);
setTile(40, 9, 62, 202);
setTile(40, 9, 67, 202);
setTile(40, 9, 70, 202);
setTile(40, 9, 75, 202);
setTile(40, 10, 46, 102);
setTile(40, 10, 51, 102);
setTile(40, 10, 54, 102);
setTile(40, 10, 59, 102);
setTile(40, 10, 62, 102);
setTile(40, 10, 67, 102);
setTile(40, 10, 70, 102);
setTile(40, 10, 75, 102);
setTile(40, 11, 46, 202);
setTile(40, 11, 51, 202);
setTile(40, 11, 54, 202);
setTile(40, 11, 59, 202);
setTile(40, 11, 62, 202);
setTile(40, 11, 67, 202);
setTile(40, 11, 70, 202);
setTile(40, 11, 75, 202);
setTile(40, 12, 46, 202);
setTile(40, 12, 47, 202);
setTile(40, 12, 48, 202);
setTile(40, 12, 49, 202);
setTile(40, 12, 50, 202);
setTile(40, 12, 51, 202);
setTile(40, 12, 54, 202);
setTile(40, 12, 55, 202);
setTile(40, 12, 56, 202);
setTile(40, 12, 57, 202);
setTile(40, 12, 58, 202);
setTile(40, 12, 59, 202);
setTile(40, 12, 62, 202);
setTile(40, 12, 63, 202);
setTile(40, 12, 64, 202);
setTile(40, 12, 65, 202);
setTile(40, 12, 66, 202);
setTile(40, 12, 67, 202);
setTile(40, 12, 70, 202);
setTile(40, 12, 71, 202);
setTile(40, 12, 72, 202);
setTile(40, 12, 73, 202);
setTile(40, 12, 74, 202);
setTile(40, 12, 75, 202);
setTile(41, 8, 46, 202);
setTile(41, 8, 47, 202);
setTile(41, 8, 48, 202);
setTile(41, 8, 49, 202);
setTile(41, 8, 50, 202);
setTile(41, 8, 51, 202);
setTile(41, 8, 54, 202);
setTile(41, 8, 55, 202);
setTile(41, 8, 56, 202);
setTile(41, 8, 57, 202);
setTile(41, 8, 58, 202);
setTile(41, 8, 59, 202);
setTile(41, 8, 62, 202);
setTile(41, 8, 63, 202);
setTile(41, 8, 64, 202);
setTile(41, 8, 65, 202);
setTile(41, 8, 66, 202);
setTile(41, 8, 67, 202);
setTile(41, 8, 70, 202);
setTile(41, 8, 71, 202);
setTile(41, 8, 72, 202);
setTile(41, 8, 73, 202);
setTile(41, 8, 74, 202);
setTile(41, 8, 75, 202);
setTile(41, 9, 46, 202);
setTile(41, 9, 51, 202);
setTile(41, 9, 54, 202);
setTile(41, 9, 59, 202);
setTile(41, 9, 62, 202);
setTile(41, 9, 67, 202);
setTile(41, 9, 70, 202);
setTile(41, 9, 75, 202);
setTile(41, 10, 46, 202);
setTile(41, 10, 51, 202);
setTile(41, 10, 54, 202);
setTile(41, 10, 59, 202);
setTile(41, 10, 62, 202);
setTile(41, 10, 67, 202);
setTile(41, 10, 70, 202);
setTile(41, 10, 75, 202);
setTile(41, 11, 46, 202);
setTile(41, 11, 51, 202);
setTile(41, 11, 54, 202);
setTile(41, 11, 59, 202);
setTile(41, 11, 62, 202);
setTile(41, 11, 67, 202);
setTile(41, 11, 70, 202);
setTile(41, 11, 75, 202);
setTile(41, 12, 46, 202);
setTile(41, 12, 47, 202);
setTile(41, 12, 48, 202);
setTile(41, 12, 49, 202);
setTile(41, 12, 50, 202);
setTile(41, 12, 51, 202);
setTile(41, 12, 54, 202);
setTile(41, 12, 55, 202);
setTile(41, 12, 56, 202);
setTile(41, 12, 57, 202);
setTile(41, 12, 58, 202);
setTile(41, 12, 59, 202);
setTile(41, 12, 62, 202);
setTile(41, 12, 63, 202);
setTile(41, 12, 64, 202);
setTile(41, 12, 65, 202);
setTile(41, 12, 66, 202);
setTile(41, 12, 67, 202);
setTile(41, 12, 70, 202);
setTile(41, 12, 71, 202);
setTile(41, 12, 72, 202);
setTile(41, 12, 73, 202);
setTile(41, 12, 74, 202);
setTile(41, 12, 75, 202);
setTile(42, 8, 46, 202);
setTile(42, 8, 47, 202);
setTile(42, 8, 48, 202);
setTile(42, 8, 49, 202);
setTile(42, 8, 50, 202);
setTile(42, 8, 51, 202);
setTile(42, 8, 54, 202);
setTile(42, 8, 55, 202);
setTile(42, 8, 56, 202);
setTile(42, 8, 57, 202);
setTile(42, 8, 58, 202);
setTile(42, 8, 59, 202);
setTile(42, 8, 62, 202);
setTile(42, 8, 63, 202);
setTile(42, 8, 64, 202);
setTile(42, 8, 65, 202);
setTile(42, 8, 66, 202);
setTile(42, 8, 67, 202);
setTile(42, 8, 70, 202);
setTile(42, 8, 71, 202);
setTile(42, 8, 72, 202);
setTile(42, 8, 73, 202);
setTile(42, 8, 74, 202);
setTile(42, 8, 75, 202);
setTile(42, 9, 46, 202);
setTile(42, 9, 47, 64);
setTile(42, 9, 48, 202);
setTile(42, 9, 49, 202);
setTile(42, 9, 50, 202);
setTile(42, 9, 51, 202);
setTile(42, 9, 54, 202);
setTile(42, 9, 55, 64);
setTile(42, 9, 56, 202);
setTile(42, 9, 57, 202);
setTile(42, 9, 58, 202);
setTile(42, 9, 59, 202);
setTile(42, 9, 62, 202);
setTile(42, 9, 63, 64);
setTile(42, 9, 64, 202);
setTile(42, 9, 65, 202);
setTile(42, 9, 66, 202);
setTile(42, 9, 67, 202);
setTile(42, 9, 70, 202);
setTile(42, 9, 71, 64);
setTile(42, 9, 72, 202);
setTile(42, 9, 73, 202);
setTile(42, 9, 74, 202);
setTile(42, 9, 75, 202);
setTile(42, 10, 46, 202);
setTile(42, 10, 47, 64, 8);
setTile(42, 10, 48, 202);
setTile(42, 10, 49, 102);
setTile(42, 10, 50, 202);
setTile(42, 10, 51, 202);
setTile(42, 10, 54, 202);
setTile(42, 10, 55, 64, 8);
setTile(42, 10, 56, 202);
setTile(42, 10, 57, 102);
setTile(42, 10, 58, 202);
setTile(42, 10, 59, 202);
setTile(42, 10, 62, 202);
setTile(42, 10, 63, 64, 8);
setTile(42, 10, 64, 202);
setTile(42, 10, 65, 102);
setTile(42, 10, 66, 202);
setTile(42, 10, 67, 202);
setTile(42, 10, 70, 202);
setTile(42, 10, 71, 64, 8);
setTile(42, 10, 72, 202);
setTile(42, 10, 73, 102);
setTile(42, 10, 74, 202);
setTile(42, 10, 75, 202);
setTile(42, 11, 46, 202);
setTile(42, 11, 47, 202);
setTile(42, 11, 48, 202);
setTile(42, 11, 49, 202);
setTile(42, 11, 50, 202);
setTile(42, 11, 51, 202);
setTile(42, 11, 54, 202);
setTile(42, 11, 55, 202);
setTile(42, 11, 56, 202);
setTile(42, 11, 57, 202);
setTile(42, 11, 58, 202);
setTile(42, 11, 59, 202);
setTile(42, 11, 62, 202);
setTile(42, 11, 63, 202);
setTile(42, 11, 64, 202);
setTile(42, 11, 65, 202);
setTile(42, 11, 66, 202);
setTile(42, 11, 67, 202);
setTile(42, 11, 70, 202);
setTile(42, 11, 71, 202);
setTile(42, 11, 72, 202);
setTile(42, 11, 73, 202);
setTile(42, 11, 74, 202);
setTile(42, 11, 75, 202);
setTile(42, 12, 46, 202);
setTile(42, 12, 47, 202);
setTile(42, 12, 48, 202);
setTile(42, 12, 49, 202);
setTile(42, 12, 50, 202);
setTile(42, 12, 51, 202);
setTile(42, 12, 54, 202);
setTile(42, 12, 55, 202);
setTile(42, 12, 56, 202);
setTile(42, 12, 57, 202);
setTile(42, 12, 58, 202);
setTile(42, 12, 59, 202);
setTile(42, 12, 62, 202);
setTile(42, 12, 63, 202);
setTile(42, 12, 64, 202);
setTile(42, 12, 65, 202);
setTile(42, 12, 66, 202);
setTile(42, 12, 67, 202);
setTile(42, 12, 70, 202);
setTile(42, 12, 71, 202);
setTile(42, 12, 72, 202);
setTile(42, 12, 73, 202);
setTile(42, 12, 74, 202);
setTile(42, 12, 75, 202);
setTile(43, 8, 46, 203);
setTile(43, 8, 47, 203);
setTile(43, 8, 48, 203);
setTile(43, 8, 54, 203);
setTile(43, 8, 55, 203);
setTile(43, 8, 56, 203);
setTile(43, 8, 62, 203);
setTile(43, 8, 63, 203);
setTile(43, 8, 64, 203);
setTile(43, 8, 70, 203);
setTile(43, 8, 71, 203);
setTile(43, 8, 72, 203);
setTile(47, 8, 46, 203);
setTile(47, 8, 47, 203);
setTile(47, 8, 48, 203);
setTile(47, 8, 54, 203);
setTile(47, 8, 55, 203);
setTile(47, 8, 56, 203);
setTile(47, 8, 62, 203);
setTile(47, 8, 63, 203);
setTile(47, 8, 64, 203);
setTile(47, 8, 70, 203);
setTile(47, 8, 71, 203);
setTile(47, 8, 72, 203);
setTile(48, 8, 46, 202);
setTile(48, 8, 47, 202);
setTile(48, 8, 48, 202);
setTile(48, 8, 49, 202);
setTile(48, 8, 50, 202);
setTile(48, 8, 51, 202);
setTile(48, 8, 54, 202);
setTile(48, 8, 55, 202);
setTile(48, 8, 56, 202);
setTile(48, 8, 57, 202);
setTile(48, 8, 58, 202);
setTile(48, 8, 59, 202);
setTile(48, 8, 62, 202);
setTile(48, 8, 63, 202);
setTile(48, 8, 64, 202);
setTile(48, 8, 65, 202);
setTile(48, 8, 66, 202);
setTile(48, 8, 67, 202);
setTile(48, 8, 70, 202);
setTile(48, 8, 71, 202);
setTile(48, 8, 72, 202);
setTile(48, 8, 73, 202);
setTile(48, 8, 74, 202);
setTile(48, 8, 75, 202);
setTile(48, 9, 46, 202);
setTile(48, 9, 47, 64, 2);
setTile(48, 9, 48, 202);
setTile(48, 9, 49, 202);
setTile(48, 9, 50, 202);
setTile(48, 9, 51, 202);
setTile(48, 9, 54, 202);
setTile(48, 9, 55, 64, 2);
setTile(48, 9, 56, 202);
setTile(48, 9, 57, 202);
setTile(48, 9, 58, 202);
setTile(48, 9, 59, 202);
setTile(48, 9, 62, 202);
setTile(48, 9, 63, 64, 2);
setTile(48, 9, 64, 202);
setTile(48, 9, 65, 202);
setTile(48, 9, 66, 202);
setTile(48, 9, 67, 202);
setTile(48, 9, 70, 202);
setTile(48, 9, 71, 64, 2);
setTile(48, 9, 72, 202);
setTile(48, 9, 73, 202);
setTile(48, 9, 74, 202);
setTile(48, 9, 75, 202);
setTile(48, 10, 46, 202);
setTile(48, 10, 47, 64, 8);
setTile(48, 10, 48, 202);
setTile(48, 10, 49, 102);
setTile(48, 10, 50, 202);
setTile(48, 10, 51, 202);
setTile(48, 10, 54, 202);
setTile(48, 10, 55, 64, 8);
setTile(48, 10, 56, 202);
setTile(48, 10, 57, 102);
setTile(48, 10, 58, 202);
setTile(48, 10, 59, 202);
setTile(48, 10, 62, 202);
setTile(48, 10, 63, 64, 8);
setTile(48, 10, 64, 202);
setTile(48, 10, 65, 102);
setTile(48, 10, 66, 202);
setTile(48, 10, 67, 202);
setTile(48, 10, 70, 202);
setTile(48, 10, 71, 64, 8);
setTile(48, 10, 72, 202);
setTile(48, 10, 73, 102);
setTile(48, 10, 74, 202);
setTile(48, 10, 75, 202);
setTile(48, 11, 46, 202);
setTile(48, 11, 47, 202);
setTile(48, 11, 48, 202);
setTile(48, 11, 49, 202);
setTile(48, 11, 50, 202);
setTile(48, 11, 51, 202);
setTile(48, 11, 54, 202);
setTile(48, 11, 55, 202);
setTile(48, 11, 56, 202);
setTile(48, 11, 57, 202);
setTile(48, 11, 58, 202);
setTile(48, 11, 59, 202);
setTile(48, 11, 62, 202);
setTile(48, 11, 63, 202);
setTile(48, 11, 64, 202);
setTile(48, 11, 65, 202);
setTile(48, 11, 66, 202);
setTile(48, 11, 67, 202);
setTile(48, 11, 70, 202);
setTile(48, 11, 71, 202);
setTile(48, 11, 72, 202);
setTile(48, 11, 73, 202);
setTile(48, 11, 74, 202);
setTile(48, 11, 75, 202);
setTile(48, 12, 46, 202);
setTile(48, 12, 47, 202);
setTile(48, 12, 48, 202);
setTile(48, 12, 49, 202);
setTile(48, 12, 50, 202);
setTile(48, 12, 51, 202);
setTile(48, 12, 54, 202);
setTile(48, 12, 55, 202);
setTile(48, 12, 56, 202);
setTile(48, 12, 57, 202);
setTile(48, 12, 58, 202);
setTile(48, 12, 59, 202);
setTile(48, 12, 62, 202);
setTile(48, 12, 63, 202);
setTile(48, 12, 64, 202);
setTile(48, 12, 65, 202);
setTile(48, 12, 66, 202);
setTile(48, 12, 67, 202);
setTile(48, 12, 70, 202);
setTile(48, 12, 71, 202);
setTile(48, 12, 72, 202);
setTile(48, 12, 73, 202);
setTile(48, 12, 74, 202);
setTile(48, 12, 75, 202);
setTile(49, 8, 46, 202);
setTile(49, 8, 47, 202);
setTile(49, 8, 48, 202);
setTile(49, 8, 49, 202);
setTile(49, 8, 50, 202);
setTile(49, 8, 51, 202);
setTile(49, 8, 54, 202);
setTile(49, 8, 55, 202);
setTile(49, 8, 56, 202);
setTile(49, 8, 57, 202);
setTile(49, 8, 58, 202);
setTile(49, 8, 59, 202);
setTile(49, 8, 62, 202);
setTile(49, 8, 63, 202);
setTile(49, 8, 64, 202);
setTile(49, 8, 65, 202);
setTile(49, 8, 66, 202);
setTile(49, 8, 67, 202);
setTile(49, 8, 70, 202);
setTile(49, 8, 71, 202);
setTile(49, 8, 72, 202);
setTile(49, 8, 73, 202);
setTile(49, 8, 74, 202);
setTile(49, 8, 75, 202);
setTile(49, 9, 46, 202);
setTile(49, 9, 51, 202);
setTile(49, 9, 54, 202);
setTile(49, 9, 59, 202);
setTile(49, 9, 62, 202);
setTile(49, 9, 67, 202);
setTile(49, 9, 70, 202);
setTile(49, 9, 75, 202);
setTile(49, 10, 46, 202);
setTile(49, 10, 51, 202);
setTile(49, 10, 54, 202);
setTile(49, 10, 59, 202);
setTile(49, 10, 62, 202);
setTile(49, 10, 67, 202);
setTile(49, 10, 70, 202);
setTile(49, 10, 75, 202);
setTile(49, 11, 46, 202);
setTile(49, 11, 51, 202);
setTile(49, 11, 54, 202);
setTile(49, 11, 59, 202);
setTile(49, 11, 62, 202);
setTile(49, 11, 67, 202);
setTile(49, 11, 70, 202);
setTile(49, 11, 75, 202);
setTile(49, 12, 46, 202);
setTile(49, 12, 47, 202);
setTile(49, 12, 48, 202);
setTile(49, 12, 49, 202);
setTile(49, 12, 50, 202);
setTile(49, 12, 51, 202);
setTile(49, 12, 54, 202);
setTile(49, 12, 55, 202);
setTile(49, 12, 56, 202);
setTile(49, 12, 57, 202);
setTile(49, 12, 58, 202);
setTile(49, 12, 59, 202);
setTile(49, 12, 62, 202);
setTile(49, 12, 63, 202);
setTile(49, 12, 64, 202);
setTile(49, 12, 65, 202);
setTile(49, 12, 66, 202);
setTile(49, 12, 67, 202);
setTile(49, 12, 70, 202);
setTile(49, 12, 71, 202);
setTile(49, 12, 72, 202);
setTile(49, 12, 73, 202);
setTile(49, 12, 74, 202);
setTile(49, 12, 75, 202);
setTile(50, 8, 46, 202);
setTile(50, 8, 47, 202);
setTile(50, 8, 48, 202);
setTile(50, 8, 49, 202);
setTile(50, 8, 50, 202);
setTile(50, 8, 51, 202);
setTile(50, 8, 54, 202);
setTile(50, 8, 55, 202);
setTile(50, 8, 56, 202);
setTile(50, 8, 57, 202);
setTile(50, 8, 58, 202);
setTile(50, 8, 59, 202);
setTile(50, 8, 62, 202);
setTile(50, 8, 63, 202);
setTile(50, 8, 64, 202);
setTile(50, 8, 65, 202);
setTile(50, 8, 66, 202);
setTile(50, 8, 67, 202);
setTile(50, 8, 70, 202);
setTile(50, 8, 71, 202);
setTile(50, 8, 72, 202);
setTile(50, 8, 73, 202);
setTile(50, 8, 74, 202);
setTile(50, 8, 75, 202);
setTile(50, 9, 46, 202);
setTile(50, 9, 51, 202);
setTile(50, 9, 54, 202);
setTile(50, 9, 59, 202);
setTile(50, 9, 62, 202);
setTile(50, 9, 67, 202);
setTile(50, 9, 70, 202);
setTile(50, 9, 75, 202);
setTile(50, 10, 46, 102);
setTile(50, 10, 51, 102);
setTile(50, 10, 54, 102);
setTile(50, 10, 59, 102);
setTile(50, 10, 62, 102);
setTile(50, 10, 67, 102);
setTile(50, 10, 70, 102);
setTile(50, 10, 75, 102);
setTile(50, 11, 46, 202);
setTile(50, 11, 51, 202);
setTile(50, 11, 54, 202);
setTile(50, 11, 59, 202);
setTile(50, 11, 62, 202);
setTile(50, 11, 67, 202);
setTile(50, 11, 70, 202);
setTile(50, 11, 75, 202);
setTile(50, 12, 46, 202);
setTile(50, 12, 47, 202);
setTile(50, 12, 48, 202);
setTile(50, 12, 49, 202);
setTile(50, 12, 50, 202);
setTile(50, 12, 51, 202);
setTile(50, 12, 54, 202);
setTile(50, 12, 55, 202);
setTile(50, 12, 56, 202);
setTile(50, 12, 57, 202);
setTile(50, 12, 58, 202);
setTile(50, 12, 59, 202);
setTile(50, 12, 62, 202);
setTile(50, 12, 63, 202);
setTile(50, 12, 64, 202);
setTile(50, 12, 65, 202);
setTile(50, 12, 66, 202);
setTile(50, 12, 67, 202);
setTile(50, 12, 70, 202);
setTile(50, 12, 71, 202);
setTile(50, 12, 72, 202);
setTile(50, 12, 73, 202);
setTile(50, 12, 74, 202);
setTile(50, 12, 75, 202);
setTile(51, 8, 46, 202);
setTile(51, 8, 47, 202);
setTile(51, 8, 48, 202);
setTile(51, 8, 49, 202);
setTile(51, 8, 50, 202);
setTile(51, 8, 51, 202);
setTile(51, 8, 54, 202);
setTile(51, 8, 55, 202);
setTile(51, 8, 56, 202);
setTile(51, 8, 57, 202);
setTile(51, 8, 58, 202);
setTile(51, 8, 59, 202);
setTile(51, 8, 62, 202);
setTile(51, 8, 63, 202);
setTile(51, 8, 64, 202);
setTile(51, 8, 65, 202);
setTile(51, 8, 66, 202);
setTile(51, 8, 67, 202);
setTile(51, 8, 70, 202);
setTile(51, 8, 71, 202);
setTile(51, 8, 72, 202);
setTile(51, 8, 73, 202);
setTile(51, 8, 74, 202);
setTile(51, 8, 75, 202);
setTile(51, 9, 46, 202);
setTile(51, 9, 51, 202);
setTile(51, 9, 54, 202);
setTile(51, 9, 59, 202);
setTile(51, 9, 62, 202);
setTile(51, 9, 67, 202);
setTile(51, 9, 70, 202);
setTile(51, 9, 75, 202);
setTile(51, 10, 46, 202);
setTile(51, 10, 51, 202);
setTile(51, 10, 54, 202);
setTile(51, 10, 59, 202);
setTile(51, 10, 62, 202);
setTile(51, 10, 67, 202);
setTile(51, 10, 70, 202);
setTile(51, 10, 75, 202);
setTile(51, 11, 46, 202);
setTile(51, 11, 51, 202);
setTile(51, 11, 54, 202);
setTile(51, 11, 59, 202);
setTile(51, 11, 62, 202);
setTile(51, 11, 67, 202);
setTile(51, 11, 70, 202);
setTile(51, 11, 75, 202);
setTile(51, 12, 46, 202);
setTile(51, 12, 47, 202);
setTile(51, 12, 48, 202);
setTile(51, 12, 49, 202);
setTile(51, 12, 50, 202);
setTile(51, 12, 51, 202);
setTile(51, 12, 54, 202);
setTile(51, 12, 55, 202);
setTile(51, 12, 56, 202);
setTile(51, 12, 57, 202);
setTile(51, 12, 58, 202);
setTile(51, 12, 59, 202);
setTile(51, 12, 62, 202);
setTile(51, 12, 63, 202);
setTile(51, 12, 64, 202);
setTile(51, 12, 65, 202);
setTile(51, 12, 66, 202);
setTile(51, 12, 67, 202);
setTile(51, 12, 70, 202);
setTile(51, 12, 71, 202);
setTile(51, 12, 72, 202);
setTile(51, 12, 73, 202);
setTile(51, 12, 74, 202);
setTile(51, 12, 75, 202);
setTile(52, 8, 46, 202);
setTile(52, 8, 47, 202);
setTile(52, 8, 48, 202);
setTile(52, 8, 49, 202);
setTile(52, 8, 50, 202);
setTile(52, 8, 51, 202);
setTile(52, 8, 54, 202);
setTile(52, 8, 55, 202);
setTile(52, 8, 56, 202);
setTile(52, 8, 57, 202);
setTile(52, 8, 58, 202);
setTile(52, 8, 59, 202);
setTile(52, 8, 62, 202);
setTile(52, 8, 63, 202);
setTile(52, 8, 64, 202);
setTile(52, 8, 65, 202);
setTile(52, 8, 66, 202);
setTile(52, 8, 67, 202);
setTile(52, 8, 70, 202);
setTile(52, 8, 71, 202);
setTile(52, 8, 72, 202);
setTile(52, 8, 73, 202);
setTile(52, 8, 74, 202);
setTile(52, 8, 75, 202);
setTile(52, 9, 46, 202);
setTile(52, 9, 47, 202);
setTile(52, 9, 48, 202);
setTile(52, 9, 49, 202);
setTile(52, 9, 50, 202);
setTile(52, 9, 51, 202);
setTile(52, 9, 54, 202);
setTile(52, 9, 55, 202);
setTile(52, 9, 56, 202);
setTile(52, 9, 57, 202);
setTile(52, 9, 58, 202);
setTile(52, 9, 59, 202);
setTile(52, 9, 62, 202);
setTile(52, 9, 63, 202);
setTile(52, 9, 64, 202);
setTile(52, 9, 65, 202);
setTile(52, 9, 66, 202);
setTile(52, 9, 67, 202);
setTile(52, 9, 70, 202);
setTile(52, 9, 71, 202);
setTile(52, 9, 72, 202);
setTile(52, 9, 73, 202);
setTile(52, 9, 74, 202);
setTile(52, 9, 75, 202);
setTile(52, 10, 46, 202);
setTile(52, 10, 47, 202);
setTile(52, 10, 48, 102);
setTile(52, 10, 49, 102);
setTile(52, 10, 50, 202);
setTile(52, 10, 51, 202);
setTile(52, 10, 54, 202);
setTile(52, 10, 55, 202);
setTile(52, 10, 56, 102);
setTile(52, 10, 57, 102);
setTile(52, 10, 58, 202);
setTile(52, 10, 59, 202);
setTile(52, 10, 62, 202);
setTile(52, 10, 63, 202);
setTile(52, 10, 64, 102);
setTile(52, 10, 65, 102);
setTile(52, 10, 66, 202);
setTile(52, 10, 67, 202);
setTile(52, 10, 70, 202);
setTile(52, 10, 71, 202);
setTile(52, 10, 72, 102);
setTile(52, 10, 73, 102);
setTile(52, 10, 74, 202);
setTile(52, 10, 75, 202);
setTile(52, 11, 46, 202);
setTile(52, 11, 47, 202);
setTile(52, 11, 48, 202);
setTile(52, 11, 49, 202);
setTile(52, 11, 50, 202);
setTile(52, 11, 51, 202);
setTile(52, 11, 54, 202);
setTile(52, 11, 55, 202);
setTile(52, 11, 56, 202);
setTile(52, 11, 57, 202);
setTile(52, 11, 58, 202);
setTile(52, 11, 59, 202);
setTile(52, 11, 62, 202);
setTile(52, 11, 63, 202);
setTile(52, 11, 64, 202);
setTile(52, 11, 65, 202);
setTile(52, 11, 66, 202);
setTile(52, 11, 67, 202);
setTile(52, 11, 70, 202);
setTile(52, 11, 71, 202);
setTile(52, 11, 72, 202);
setTile(52, 11, 73, 202);
setTile(52, 11, 74, 202);
setTile(52, 11, 75, 202);
setTile(52, 12, 46, 202);
setTile(52, 12, 47, 202);
setTile(52, 12, 48, 202);
setTile(52, 12, 49, 202);
setTile(52, 12, 50, 202);
setTile(52, 12, 51, 202);
setTile(52, 12, 54, 202);
setTile(52, 12, 55, 202);
setTile(52, 12, 56, 202);
setTile(52, 12, 57, 202);
setTile(52, 12, 58, 202);
setTile(52, 12, 59, 202);
setTile(52, 12, 62, 202);
setTile(52, 12, 63, 202);
setTile(52, 12, 64, 202);
setTile(52, 12, 65, 202);
setTile(52, 12, 66, 202);
setTile(52, 12, 67, 202);
setTile(52, 12, 70, 202);
setTile(52, 12, 71, 202);
setTile(52, 12, 72, 202);
setTile(52, 12, 73, 202);
setTile(52, 12, 74, 202);
setTile(52, 12, 75, 202);
setTile(55, 8, 45, 211);
setTile(55, 8, 49, 211);
setTile(55, 8, 53, 211);
setTile(55, 8, 57, 211);
setTile(55, 8, 61, 211);
setTile(55, 8, 65, 211);
setTile(55, 8, 70, 211);
setTile(55, 8, 76, 211);
setTile(55, 9, 45, 211);
setTile(55, 9, 49, 211);
setTile(55, 9, 53, 211);
setTile(55, 9, 57, 211);
setTile(55, 9, 61, 211);
setTile(55, 9, 65, 211);
setTile(55, 9, 70, 211);
setTile(55, 9, 76, 211);
setTile(55, 10, 45, 211);
setTile(55, 10, 49, 211);
setTile(55, 10, 53, 211);
setTile(55, 10, 57, 211);
setTile(55, 10, 61, 211);
setTile(55, 10, 65, 211);
setTile(55, 10, 70, 211);
setTile(55, 10, 76, 211);
setTile(55, 11, 45, 200);
setTile(55, 11, 49, 200);
setTile(55, 11, 53, 200);
setTile(55, 11, 57, 200);
setTile(55, 11, 61, 200);
setTile(55, 11, 65, 200);
setTile(55, 11, 70, 200);
setTile(55, 11, 76, 200);
setTile(57, 8, 44, 59, 7);
setTile(57, 8, 46, 59, 7);
setTile(57, 8, 48, 59, 7);
setTile(57, 8, 50, 59, 7);
setTile(57, 8, 52, 59, 7);
setTile(57, 8, 54, 59, 7);
setTile(57, 8, 56, 59, 7);
setTile(57, 8, 58, 59, 7);
setTile(57, 8, 60, 59, 7);
setTile(57, 8, 62, 59, 7);
setTile(57, 8, 64, 59, 7);
setTile(57, 8, 66, 59, 7);
setTile(57, 8, 70, 86);
setTile(57, 8, 71, 86);
setTile(57, 8, 72, 86);
setTile(57, 8, 73, 86);
setTile(57, 8, 74, 86);
setTile(57, 8, 75, 86);
setTile(57, 8, 76, 86);
setTile(58, 8, 44, 59, 7);
setTile(58, 8, 46, 59, 7);
setTile(58, 8, 48, 59, 7);
setTile(58, 8, 50, 59, 7);
setTile(58, 8, 52, 59, 7);
setTile(58, 8, 54, 59, 7);
setTile(58, 8, 56, 59, 7);
setTile(58, 8, 58, 59, 6);
setTile(58, 8, 60, 59, 7);
setTile(58, 8, 62, 59, 7);
setTile(58, 8, 64, 59, 7);
setTile(58, 8, 66, 59, 7);
setTile(58, 8, 70, 104, 7);
setTile(58, 8, 71, 104, 7);
setTile(58, 8, 72, 104, 7);
setTile(58, 8, 73, 104, 7);
setTile(58, 8, 74, 104, 7);
setTile(58, 8, 75, 104, 7);
setTile(58, 8, 76, 104, 7);
setTile(59, 8, 44, 59, 7);
setTile(59, 8, 46, 59, 7);
setTile(59, 8, 48, 59, 7);
setTile(59, 8, 50, 59, 7);
setTile(59, 8, 52, 59, 7);
setTile(59, 8, 54, 59, 7);
setTile(59, 8, 56, 59, 7);
setTile(59, 8, 58, 59, 7);
setTile(59, 8, 60, 59, 7);
setTile(59, 8, 62, 59, 7);
setTile(59, 8, 64, 59, 7);
setTile(59, 8, 66, 59, 7);
setTile(60, 8, 44, 59, 7);
setTile(60, 8, 46, 59, 7);
setTile(60, 8, 48, 59, 7);
setTile(60, 8, 50, 59, 7);
setTile(60, 8, 52, 59, 7);
setTile(60, 8, 54, 59, 7);
setTile(60, 8, 56, 59, 7);
setTile(60, 8, 58, 59, 7);
setTile(60, 8, 60, 59, 7);
setTile(60, 8, 62, 59, 7);
setTile(60, 8, 64, 59, 7);
setTile(60, 8, 66, 59, 7);
setTile(60, 8, 70, 104, 7);
setTile(60, 8, 71, 104, 7);
setTile(60, 8, 72, 104, 7);
setTile(60, 8, 73, 104, 7);
setTile(60, 8, 74, 104, 7);
setTile(60, 8, 75, 104, 7);
setTile(60, 8, 76, 104, 7);
setTile(61, 8, 44, 59, 7);
setTile(61, 8, 46, 59, 7);
setTile(61, 8, 48, 59, 7);
setTile(61, 8, 50, 59, 7);
setTile(61, 8, 52, 59, 7);
setTile(61, 8, 54, 59, 7);
setTile(61, 8, 56, 59, 7);
setTile(61, 8, 58, 59, 7);
setTile(61, 8, 60, 59, 7);
setTile(61, 8, 62, 59, 7);
setTile(61, 8, 64, 59, 7);
setTile(61, 8, 66, 59, 7);
setTile(61, 8, 70, 86);
setTile(61, 8, 71, 86);
setTile(61, 8, 72, 86);
setTile(61, 8, 73, 86);
setTile(61, 8, 74, 86);
setTile(61, 8, 75, 86);
setTile(61, 8, 76, 86);
setTile(63, 8, 45, 211);
setTile(63, 8, 49, 211);
setTile(63, 8, 53, 211);
setTile(63, 8, 57, 211);
setTile(63, 8, 61, 211);
setTile(63, 8, 65, 211);
setTile(63, 8, 70, 211);
setTile(63, 8, 76, 211);
setTile(63, 9, 45, 211);
setTile(63, 9, 49, 211);
setTile(63, 9, 53, 211);
setTile(63, 9, 57, 211);
setTile(63, 9, 61, 211);
setTile(63, 9, 65, 211);
setTile(63, 9, 70, 211);
setTile(63, 9, 76, 211);
setTile(63, 10, 45, 211);
setTile(63, 10, 49, 211);
setTile(63, 10, 53, 211);
setTile(63, 10, 57, 211);
setTile(63, 10, 61, 211);
setTile(63, 10, 65, 211);
setTile(63, 10, 70, 211);
setTile(63, 10, 76, 211);
setTile(63, 11, 45, 200);
setTile(63, 11, 49, 200);
setTile(63, 11, 53, 200);
setTile(63, 11, 57, 200);
setTile(63, 11, 61, 200);
setTile(63, 11, 65, 200);
setTile(63, 11, 70, 200);
setTile(63, 11, 76, 200);
setTile(44, 8, 52, 211);
setTile(44, 8, 69, 211);
setTile(44, 9, 52, 211);
setTile(44, 9, 69, 211);
setTile(44, 10, 52, 211);
setTile(44, 10, 69, 211);
setTile(44, 11, 52, 200);
setTile(44, 11, 69, 200);
setTile(45, 8, 42, 211);
setTile(45, 9, 42, 211);
setTile(45, 10, 42, 211);
setTile(45, 11, 42, 200);
setTile(46, 8, 61, 211);
setTile(46, 8, 77, 211);
setTile(46, 9, 61, 211);
setTile(46, 9, 77, 211);
setTile(46, 10, 61, 211);
setTile(46, 10, 77, 211);
setTile(46, 11, 61, 200);
setTile(46, 11, 77, 200);
setTile(32, 8, 42, 211);
setTile(32, 9, 42, 211);
setTile(32, 10, 42, 211);
setTile(32, 11, 42, 200);
setTile(17, 18, 68, 207);
for(var n=-13;n<14;n++){
for(var m=-13;m<14;m++){
var rr = Math.pow(n, 2)+Math.pow(m, 2);
if(rr>=Math.pow(12, 2)&&rr<=Math.pow(13, 2))
setTile(57+n, 8, 23+m, 203);
}}
for(var n=-12;n<13;n++){
for(var m=-12;m<13;m++){
if(Math.pow(n, 2)+Math.pow(m, 2)<=Math.pow(12, 2))
setTile(57+n, 7, 23+m, 9);
}}
setTiles(9, 25, 7, 7, 76, 76, 206);
setTiles(25, 25, 7, 7, 60, 76, 206);
setTiles(34, 44, 7, 7, 43, 43, 198);
setTile(75, 8, 47, 221);
Level.spawnWizard(45, 8.5, 58);
Level.spawnWizard(45, 8.5, 50);
Level.spawnWizard(39, 8.5, 40);
Level.spawnWizard(26, 8.5, 48);
Level.spawnWizard(23, 8.5, 46);
Level.spawnWizard(65, 8.5, 63);
Level.spawnWizard(64, 8.5, 11);
}
else if(part==1){
for(var xx=80;xx<120;xx++){
for(var zz=3;zz<80;zz++){
setTile(xx, 3, zz, 7);
setTile(xx,30,zz,7);}}
for(var xx=80;xx<120;xx++){
for(var yy=3;yy<30;yy++){
setTile(xx, yy, 3, 7);
setTile(xx,yy, 80,7);}}
for(var yy=3;yy<30;yy++){
for(var zz=3;zz<80;zz++){
setTile(120,yy,zz,7);}}
for(var xx=80;xx<120;xx++){
for(var zz=4;zz<80;zz++){
for(var yy=4;yy<6;yy++)
setTile(xx, yy, zz, 1);
setTile(xx, 6, zz, 3);
setTile(xx, 7, zz, 2);
setTile(xx, 29, zz, 208);
for(var yy=8;yy<29;yy++)
setTile(xx,yy,zz,0);
}}
setTiles(80, 80, 11, 12, 19, 21, 205);
Magica.makeTree(108, 7, 26);
Magica.makeTree(108, 7, 31);
Magica.makeTree(112, 7, 33);
Magica.makeTree(144, 7, 27);
Magica.makeTree(117, 7, 31);
Magica.makeTree(82, 7, 9);
Magica.makeTree(82, 7, 31);
Magica.makeTree(82, 7, 41);
Magica.makeTree(82, 7, 55);
Magica.makeTree(83, 7, 17);
Magica.makeTree(83, 7, 23);
Magica.makeTree(83, 7, 36);
Magica.makeTree(83, 7, 47);
Magica.makeTree(83, 7, 65);
Magica.makeTree(83, 7, 201);
Magica.makeTree(83, 7, 78);
Magica.makeTree(84, 7, 27);
Magica.makeTree(84, 7, 60);
Magica.makeTree(84, 7, 203);
Magica.makeTree(86, 7, 14);
Magica.makeTree(87, 7, 9);
Magica.makeTree(87, 7, 30);
Magica.makeTree(87, 7, 200);
Magica.makeTree(147, 7, 42);
Magica.makeTree(147, 7, 49);
Magica.makeTree(89, 7, 19);
Magica.makeTree(89, 7, 65);
Magica.makeTree(89, 7, 203);
Magica.makeTree(90, 7, 14);
Magica.makeTree(90, 7, 24);
Magica.makeTree(90, 7, 35);
Magica.makeTree(90, 7, 55);
Magica.makeTree(90, 7, 61);
Magica.makeTree(91, 7, 30);
Magica.makeTree(92, 7, 9);
Magica.makeTree(93, 7, 43);
Magica.makeTree(93, 7, 49);
Magica.makeTree(93, 7, 66);
Magica.makeTree(94, 7, 15);
Magica.makeTree(94, 7, 22);
Magica.makeTree(94, 7, 37);
Magica.makeTree(94, 7, 58);
Magica.makeTree(95, 7, 27);
Magica.makeTree(95, 7, 74);
Magica.makeTree(96, 7, 201);
Magica.makeTree(97, 7, 9);
Magica.makeTree(97, 7, 31);
Magica.makeTree(98, 7, 16);
Magica.makeTree(98, 7, 21);
Magica.makeTree(99, 7, 27);
Magica.makeTree(101, 7, 13);
Magica.makeTree(101, 7, 30);
Magica.makeTree(102, 7, 8);
Magica.makeTree(102, 7, 23);
Magica.makeTree(103, 7, 28);
setTiles(82, 84, 11, 12, 80, 80, 7);
setTile(99, 7, 78, 9);
setTile(99, 7, 79, 9);
setTile(100, 7, 74, 9);
setTile(100, 7, 75, 9);
setTile(100, 7, 76, 9);
setTile(100, 7, 77, 9);
setTile(100, 7, 78, 9);
setTile(100, 7, 79, 9);
setTile(101, 7, 71, 9);
setTile(101, 7, 72, 9);
setTile(101, 7, 73, 9);
setTile(101, 7, 74, 9);
setTile(101, 7, 75, 9);
setTile(101, 7, 76, 9);
setTile(101, 7, 77, 9);
setTile(101, 7, 78, 9);
setTile(101, 7, 79, 9);
setTile(102, 7, 71, 9);
setTile(102, 7, 72, 9);
setTile(102, 7, 73, 9);
setTile(102, 7, 74, 9);
setTile(102, 7, 75, 9);
setTile(102, 7, 76, 9);
setTile(102, 7, 77, 9);
setTile(102, 7, 78, 9);
setTile(102, 7, 79, 9);
setTile(103, 7, 70, 9);
setTile(103, 7, 71, 9);
setTile(103, 7, 72, 9);
setTile(103, 7, 73, 9);
setTile(103, 7, 74, 9);
setTile(103, 7, 75, 9);
setTile(103, 7, 76, 9);
setTile(103, 7, 77, 9);
setTile(103, 7, 78, 9);
setTile(103, 7, 79, 9);
setTile(104, 7, 67, 9);
setTile(104, 7, 68, 9);
setTile(104, 7, 69, 9);
setTile(104, 7, 70, 9);
setTile(104, 7, 71, 9);
setTile(104, 7, 72, 9);
setTile(104, 7, 73, 9);
setTile(104, 7, 74, 9);
setTile(104, 7, 75, 9);
setTile(104, 7, 76, 9);
setTile(104, 7, 77, 9);
setTile(104, 7, 78, 9);
setTile(105, 7, 65, 9);
setTile(105, 7, 66, 9);
setTile(105, 7, 67, 9);
setTile(105, 7, 68, 9);
setTile(105, 7, 69, 9);
setTile(105, 7, 70, 9);
setTile(105, 7, 71, 9);
setTile(105, 7, 72, 9);
setTile(105, 7, 73, 9);
setTile(105, 7, 74, 9);
setTile(105, 7, 75, 9);
setTile(105, 7, 76, 9);
setTile(106, 7, 64, 9);
setTile(106, 7, 65, 9);
setTile(106, 7, 66, 9);
setTile(106, 7, 67, 9);
setTile(106, 7, 68, 9);
setTile(106, 7, 69, 9);
setTile(106, 7, 70, 9);
setTile(106, 7, 71, 9);
setTile(106, 7, 72, 9);
setTile(106, 7, 73, 9);
setTile(106, 7, 74, 9);
setTile(107, 7, 61, 9);
setTile(107, 7, 62, 9);
setTile(107, 7, 63, 9);
setTile(107, 7, 64, 9);
setTile(107, 7, 65, 9);
setTile(107, 7, 66, 9);
setTile(107, 7, 67, 9);
setTile(107, 7, 68, 9);
setTile(107, 7, 69, 9);
setTile(107, 7, 70, 9);
setTile(107, 7, 71, 9);
setTile(107, 7, 72, 9);
setTile(108, 7, 59, 9);
setTile(108, 7, 60, 9);
setTile(108, 7, 61, 9);
setTile(108, 7, 62, 9);
setTile(108, 7, 63, 9);
setTile(108, 7, 64, 9);
setTile(108, 7, 65, 9);
setTile(108, 7, 66, 9);
setTile(108, 7, 67, 9);
setTile(108, 7, 68, 9);
setTile(108, 7, 69, 9);
setTile(108, 7, 70, 9);
setTile(109, 7, 56, 9);
setTile(109, 7, 57, 9);
setTile(109, 7, 58, 9);
setTile(109, 7, 59, 9);
setTile(109, 7, 60, 9);
setTile(109, 7, 61, 9);
setTile(109, 7, 62, 9);
setTile(109, 7, 63, 9);
setTile(109, 7, 64, 9);
setTile(109, 7, 65, 9);
setTile(109, 7, 66, 9);
setTile(109, 7, 67, 9);
setTile(109, 7, 68, 9);
setTile(110, 7, 55, 9);
setTile(110, 7, 56, 9);
setTile(110, 7, 57, 9);
setTile(110, 7, 58, 9);
setTile(110, 7, 59, 9);
setTile(110, 7, 60, 9);
setTile(110, 7, 61, 9);
setTile(110, 7, 62, 9);
setTile(110, 7, 63, 9);
setTile(110, 7, 64, 9);
setTile(110, 7, 65, 9);
setTile(110, 7, 66, 9);
setTile(111, 7, 53, 9);
setTile(111, 7, 54, 9);
setTile(111, 7, 55, 9);
setTile(111, 7, 56, 9);
setTile(111, 7, 57, 9);
setTile(111, 7, 58, 9);
setTile(111, 7, 59, 9);
setTile(111, 7, 60, 9);
setTile(111, 7, 61, 9);
setTile(111, 7, 62, 9);
setTile(111, 7, 63, 9);
setTile(111, 7, 64, 9);
setTile(112, 7, 51, 9);
setTile(112, 7, 52, 9);
setTile(112, 7, 53, 9);
setTile(112, 7, 54, 9);
setTile(112, 7, 55, 9);
setTile(112, 7, 56, 9);
setTile(112, 7, 57, 9);
setTile(112, 7, 58, 9);
setTile(112, 7, 59, 9);
setTile(112, 7, 60, 9);
setTile(112, 7, 61, 9);
setTile(112, 7, 62, 9);
setTile(113, 7, 51, 9);
setTile(113, 7, 52, 9);
setTile(113, 7, 53, 9);
setTile(113, 7, 54, 9);
setTile(113, 7, 55, 9);
setTile(113, 7, 56, 9);
setTile(113, 7, 57, 9);
setTile(113, 7, 58, 9);
setTile(113, 7, 59, 9);
setTile(114, 7, 50, 9);
setTile(114, 7, 51, 9);
setTile(114, 7, 52, 9);
setTile(114, 7, 53, 9);
setTile(114, 7, 54, 9);
setTile(114, 7, 55, 9);
setTile(114, 7, 56, 9);
setTile(114, 7, 57, 9);
setTile(114, 7, 58, 9);
setTile(114, 7, 59, 9);
setTile(115, 7, 50, 9);
setTile(115, 7, 51, 9);
setTile(115, 7, 52, 9);
setTile(115, 7, 53, 9);
setTile(115, 7, 54, 9);
setTile(115, 7, 55, 9);
setTile(115, 7, 56, 9);
setTile(115, 7, 57, 9);
setTile(115, 7, 58, 9);
setTile(116, 7, 51, 9);
setTile(116, 7, 52, 9);
setTile(116, 7, 53, 9);
setTile(116, 7, 54, 9);
setTile(116, 7, 55, 9);
setTile(116, 7, 56, 9);
setTile(116, 7, 57, 9);
setTile(117, 7, 51, 9);
setTile(117, 7, 52, 9);
setTile(117, 7, 53, 9);
setTile(117, 7, 54, 9);
setTile(117, 7, 55, 9);
setTile(117, 7, 56, 9);
setTile(118, 7, 50, 9);
setTile(118, 7, 51, 9);
setTile(118, 7, 52, 9);
setTile(118, 7, 53, 9);
setTile(118, 7, 54, 9);
setTile(118, 7, 55, 9);
setTile(118, 7, 56, 9);
setTile(119, 7, 50, 9);
setTile(119, 7, 51, 9);
setTile(119, 7, 52, 9);
setTile(119, 7, 53, 9);
setTile(119, 7, 54, 9);
setTile(119, 7, 55, 9);
setTile(94, 8, 54, 201);
setTile(95, 8, 58, 216);
setTile(96, 8, 65, 216);
setTile(97, 8, 46, 200);
setTile(97, 8, 74, 200);
setTile(98, 8, 36, 200);
setTile(98, 8, 41, 216);
setTile(98, 8, 53, 200);
setTile(98, 8, 78, 201);
setTile(99, 8, 50, 201);
setTile(99, 8, 59, 200);
setTile(99, 8, 64, 200);
setTile(100, 8, 43, 200);
setTile(100, 8, 45, 216);
setTile(100, 8, 53, 216);
setTile(100, 8, 67, 216);
setTile(100, 8, 71, 201);
setTile(102, 8, 35, 201);
setTile(102, 8, 38, 200);
setTile(102, 8, 42, 201);
setTile(102, 8, 58, 216);
setTile(103, 8, 48, 200);
setTile(103, 8, 54, 201);
setTile(103, 8, 62, 201);
setTile(105, 8, 44, 201);
setTile(105, 8, 51, 201);
setTile(105, 8, 65, 203);
setTile(105, 8, 66, 203);
setTile(106, 8, 35, 216);
setTile(106, 8, 55, 200);
setTile(106, 8, 65, 203);
setTile(106, 8, 66, 203);
setTile(107, 8, 39, 200);
setTile(107, 8, 65, 203);
setTile(107, 8, 66, 203);
setTile(108, 8, 42, 216);
setTile(108, 8, 65, 203);
setTile(108, 8, 66, 203);
setTile(109, 8, 46, 216);
setTile(109, 8, 65, 203);
setTile(109, 8, 66, 203);
setTile(110, 8, 49, 200);
setTile(110, 8, 52, 201);
setTile(110, 8, 65, 203);
setTile(110, 8, 66, 203);
setTile(111, 8, 40, 201);
setTile(111, 8, 44, 200);
setTile(111, 8, 65, 203);
setTile(111, 8, 66, 203);
setTile(113, 8, 38, 200);
setTile(113, 8, 47, 201);
setTile(114, 8, 43, 201);
setTile(117, 8, 45, 200);
setTile(118, 8, 38, 216);
setTile(105, 8, 65, 203);
setTile(105, 8, 66, 203);
setTile(106, 8, 65, 203);
setTile(106, 8, 66, 203);
setTile(107, 8, 65, 203);
setTile(107, 8, 66, 203);
setTile(108, 8, 65, 203);
setTile(108, 8, 66, 203);
setTile(109, 8, 65, 203);
setTile(109, 8, 66, 203);
setTile(110, 8, 65, 203);
setTile(110, 8, 66, 203);
setTile(110, 8, 67, 211);
setTile(110, 9, 67, 211);
setTile(110, 10, 67, 211);
setTile(110, 11, 67, 200);
setTile(111, 8, 65, 203);
setTile(111, 8, 66, 203);
setTile(111, 8, 74, 211);
setTile(111, 8, 76, 211);
setTile(111, 9, 74, 203);
setTile(111, 9, 75, 203);
setTile(111, 9, 76, 203);
setTile(112, 8, 74, 211);
setTile(112, 8, 76, 211);
setTile(112, 9, 74, 203);
setTile(112, 9, 75, 203);
setTile(112, 9, 76, 203);
setTile(113, 8, 69, 211);
setTile(113, 8, 70, 211);
setTile(113, 9, 69, 203);
setTile(113, 9, 70, 203);
setTile(114, 8, 75, 211);
setTile(114, 9, 69, 203);
setTile(114, 9, 70, 203);
setTile(114, 9, 75, 211);
setTile(114, 10, 75, 211);
setTile(114, 11, 75, 200);
setTile(115, 8, 69, 211);
setTile(115, 8, 70, 211);
setTile(115, 9, 69, 203);
setTile(115, 9, 70, 203);
setTile(116, 8, 63, 211);
setTile(116, 8, 65, 211);
setTile(116, 8, 74, 211);
setTile(116, 8, 76, 211);
setTile(116, 9, 63, 203);
setTile(116, 9, 64, 203);
setTile(116, 9, 65, 203);
setTile(116, 9, 74, 203);
setTile(116, 9, 75, 203);
setTile(116, 9, 76, 203);
setTile(117, 8, 63, 211);
setTile(117, 8, 65, 211);
setTile(117, 8, 74, 211);
setTile(117, 8, 76, 211);
setTile(117, 9, 63, 203);
setTile(117, 9, 64, 203);
setTile(117, 9, 65, 203);
setTile(117, 9, 74, 203);
setTile(117, 9, 75, 203);
setTile(117, 9, 76, 203);
setTile(118, 8, 69, 211);
setTile(118, 9, 69, 211);
setTile(118, 10, 69, 211);
setTile(118, 11, 69, 200);
setTiles(107, 107, 17, 19, 8, 20, 202);
setTiles(108, 108, 17, 19, 8, 20, 47);
setTiles(117, 117, 17, 19, 8, 20, 202);
setTiles(116, 116, 17, 19, 8, 20, 47);
setTiles(107, 117, 25, 25, 14, 14, 211);
setTiles(107, 117, 25, 25, 7, 7, 211);
setTiles(117, 117, 25, 25, 8, 13, 211);
setTiles(107, 107, 25, 25, 8, 13, 211);
setTiles(107, 117, 24, 24, 14, 14, 204);
setTiles(107, 117, 24, 24, 7, 7, 204);
setTiles(117, 117, 24, 24, 8, 13, 204);
setTiles(107, 107, 24, 24, 8, 13, 204);
setTiles(107, 117, 13, 13, 14, 14, 211);
setTiles(107, 117, 25, 25, 14, 14, 211);
setTiles(107, 117, 12, 12, 14, 14, 204);
setTiles(107, 117, 8, 8, 14, 14, 204);
setTiles(107, 117, 16, 16, 14, 14, 204);
setTiles(107, 117, 20, 20, 14, 14, 204);
setTiles(107, 117, 20, 20, 21, 21, 204);
setTiles(107, 117, 21, 21, 21, 21, 211);
setTiles(107, 117, 12, 12, 14, 14, 204);
for(var xx=108;xx<116;xx++){
for(var zz=8;zz<14;zz++){
setTile(xx, 24, zz, 202);
setTile(xx, 20, zz, 202);
setTile(xx, 16, zz, 202);
}}
for(var xx=108;xx<117;xx++){
for(var zz=15;zz<21;zz++){
setTile(xx, 8, zz, 202);
setTile(xx, 16, zz, 202);
setTile(xx, 20, zz, 202);
}}
for(var xx=110;xx<115;xx++){
for(var yy=17;yy<20;yy++){
setTile(xx, yy, 10, 47);
setTile(xx, yy, 12, 47);
setTile(xx, yy, 14, 47);
setTile(xx, yy, 16, 47);
setTile(xx, yy, 18, 47);
setTile(xx, yy, 20, 47);
}}
setTile(106, 8, 18, 203);
setTile(106, 8, 19, 203);
setTile(106, 8, 20, 203);
setTile(106, 8, 21, 203);
for(var yy=8;yy<25;yy++){
setTile(112, yy, 7, 204);
setTile(107, yy, 7, 204);
setTile(107, yy, 14, 204);
setTile(117, yy, 7, 204);
setTile(117, yy, 14, 204);
}
for(var yy=14;yy<25;yy++){
setTile(112, yy, 8, 65, 3);
}
for(zz=8;zz<14;zz++){
setTile(107, 8, zz, 202);
setTile(107, 9, zz, 202);
setTile(107, 12, zz, 204);
setTile(107, 13, zz, 202);
}
for(zz=15;zz<22;zz++){
setTile(107, 8, zz, 204);
setTile(107, 12, zz, 204);
}
for(zz=15;zz<20;zz++){
setTile(107, 11, zz, 20);
setTile(107, 13, zz, 20);
}
setTile(107, 11, 18, 202);
setTile(107, 11, 19, 202);
setTile(107, 11, 20, 202);
setTile(107, 13, 20, 202);
setTile(107, 11, 21, 204);
setTile(107, 13, 21, 204);
setTile(107, 9, 15, 20);
setTile(107, 9, 16, 20);
setTile(107, 9, 17, 20);
setTile(107, 9, 18, 202);
setTile(107, 9, 21, 204);
setTile(107, 10, 8, 202);
setTile(107, 10, 9, 202);
setTile(107, 10, 10, 102);
setTile(107, 10, 11, 102);
setTile(107, 10, 12, 102);
setTile(107, 10, 13, 202);
setTile(107, 10, 15, 20);
setTile(107, 10, 16, 20);
setTile(107, 10, 17, 20);
setTile(107, 10, 18, 202);
setTile(107, 10, 21, 204);
setTile(107, 11, 8, 202);
setTile(107, 11, 9, 202);
setTile(107, 11, 10, 102);
setTile(107, 11, 11, 102);
setTile(107, 11, 12, 102);
setTile(107, 11, 13, 202);
setTile(107, 14, 8, 202);
setTile(107, 14, 9, 102);
setTile(107, 14, 10, 102);
setTile(107, 14, 11, 102);
setTile(107, 14, 12, 102);
setTile(107, 14, 13, 202);
setTile(107, 14, 15, 20);
setTile(107, 14, 16, 20);
setTile(107, 14, 17, 20);
setTile(107, 14, 18, 20);
setTile(107, 14, 19, 20);
setTile(107, 14, 20, 202);
setTile(107, 14, 21, 204);
setTile(107, 15, 8, 202);
setTile(107, 15, 9, 102);
setTile(107, 15, 10, 102);
setTile(107, 15, 11, 102);
setTile(107, 15, 12, 102);
setTile(107, 15, 13, 202);
setTile(107, 15, 15, 20);
setTile(107, 15, 16, 20);
setTile(107, 15, 17, 20);
setTile(107, 15, 18, 20);
setTile(107, 15, 19, 20);
setTile(107, 15, 20, 202);
setTile(107, 15, 21, 204);
setTile(107, 16, 8, 204);
setTile(107, 16, 9, 204);
setTile(107, 16, 10, 204);
setTile(107, 16, 11, 204);
setTile(107, 16, 12, 204);
setTile(107, 16, 13, 204);
setTile(107, 16, 15, 204);
setTile(107, 16, 16, 204);
setTile(107, 16, 17, 204);
setTile(107, 16, 18, 204);
setTile(107, 16, 19, 204);
setTile(107, 16, 20, 204);
setTile(107, 16, 21, 204);
setTile(107, 17, 21, 204);
setTile(107, 18, 21, 204);
setTile(107, 19, 21, 204);
setTile(107, 20, 8, 204);
setTile(107, 20, 9, 204);
setTile(107, 20, 10, 204);
setTile(107, 20, 11, 204);
setTile(107, 20, 12, 204);
setTile(107, 20, 13, 204);
setTile(107, 20, 15, 204);
setTile(107, 20, 16, 204);
setTile(107, 20, 17, 204);
setTile(107, 20, 18, 204);
setTile(107, 20, 19, 204);
setTile(107, 20, 20, 204);
setTile(107, 21, 8, 202);
setTile(107, 21, 9, 202);
setTile(107, 21, 10, 202);
setTile(107, 21, 11, 202);
setTile(107, 21, 12, 202);
setTile(107, 21, 13, 202);
setTile(107, 21, 15, 211);
setTile(107, 21, 16, 211);
setTile(107, 21, 17, 211);
setTile(107, 21, 18, 211);
setTile(107, 21, 19, 211);
setTile(107, 21, 20, 211);
setTile(107, 22, 8, 202);
setTile(107, 22, 9, 202);
setTile(107, 22, 10, 202);
setTile(107, 22, 11, 202);
setTile(107, 22, 12, 202);
setTile(107, 22, 13, 202);
setTile(107, 23, 8, 202);
setTile(107, 23, 9, 202);
setTile(107, 23, 10, 202);
setTile(107, 23, 11, 202);
setTile(107, 23, 12, 202);
setTile(107, 23, 13, 202);
setTile(108, 8, 7, 202);
setTile(108, 8, 8, 202);
setTile(108, 8, 9, 202);
setTile(108, 8, 10, 202);
setTile(108, 8, 11, 202);
setTile(108, 8, 12, 202);
setTile(108, 8, 13, 202);
setTile(108, 8, 21, 202);
setTile(108, 9, 7, 202);
setTile(108, 9, 8, 47);
setTile(108, 9, 12, 211);
setTile(108, 9, 14, 211);
setTile(108, 9, 21, 202);
setTile(108, 10, 7, 202);
setTile(108, 10, 8, 47);
setTile(108, 10, 12, 203);
setTile(108, 10, 13, 203);
setTile(108, 10, 14, 203);
setTile(108, 10, 21, 202);
setTile(108, 11, 7, 202);
setTile(108, 11, 8, 202);
setTile(108, 11, 21, 202);
setTile(108, 12, 7, 204);
setTile(108, 12, 9, 203);
setTile(108, 12, 10, 202);
setTile(108, 12, 11, 202);
setTile(108, 12, 12, 202);
setTile(108, 12, 13, 202);
setTile(108, 12, 21, 204);
setTile(108, 13, 7, 202);
setTile(108, 13, 21, 202);
setTile(108, 14, 7, 202);
setTile(108, 14, 21, 202);
setTile(108, 15, 7, 202);
setTile(108, 15, 21, 202);
setTile(108, 16, 7, 204);
setTile(108, 16, 21, 204);
setTile(108, 17, 7, 202);
setTile(108, 17, 21, 202);
setTile(108, 18, 7, 202);
setTile(108, 18, 21, 202);
setTile(108, 19, 7, 202);
setTile(108, 19, 21, 202);
setTile(108, 20, 7, 204);
setTile(108, 21, 7, 202);
setTile(108, 21, 8, 47);
setTile(108, 21, 9, 47);
setTile(108, 21, 10, 47);
setTile(108, 21, 11, 47);
setTile(108, 21, 12, 47);
setTile(108, 21, 13, 47);
setTile(108, 21, 14, 202);
setTile(108, 22, 7, 202);
setTile(108, 22, 8, 47);
setTile(108, 22, 9, 47);
setTile(108, 22, 10, 47);
setTile(108, 22, 11, 47);
setTile(108, 22, 12, 47);
setTile(108, 22, 13, 47);
setTile(108, 22, 14, 202);
setTile(108, 23, 7, 202);
setTile(108, 23, 8, 47);
setTile(108, 23, 9, 47);
setTile(108, 23, 10, 47);
setTile(108, 23, 11, 47);
setTile(108, 23, 12, 47);
setTile(108, 23, 13, 47);
setTile(108, 23, 14, 202);
setTile(109, 8, 7, 202);
setTile(109, 8, 8, 202);
setTile(109, 8, 9, 202);
setTile(109, 8, 10, 202);
setTile(109, 8, 11, 202);
setTile(109, 8, 12, 202);
setTile(109, 8, 13, 202);
setTile(109, 8, 21, 202);
setTile(109, 9, 7, 202);
setTile(109, 9, 8, 47);
setTile(109, 9, 13, 203);
setTile(109, 9, 21, 20);
setTile(109, 10, 7, 202);
setTile(109, 10, 8, 47);
setTile(109, 10, 21, 20);
setTile(109, 11, 7, 202);
setTile(109, 11, 8, 203);
setTile(109, 11, 21, 20);
setTile(109, 12, 7, 204);
setTile(109, 12, 9, 202);
setTile(109, 12, 10, 202);
setTile(109, 12, 11, 202);
setTile(109, 12, 12, 202);
setTile(109, 12, 13, 202);
setTile(109, 12, 21, 204);
setTile(109, 13, 7, 202);
setTile(109, 13, 21, 20);
setTile(109, 14, 7, 102);
setTile(109, 14, 21, 20);
setTile(109, 15, 7, 102);
setTile(109, 15, 21, 20);
setTile(109, 16, 7, 204);
setTile(109, 16, 21, 204);
setTile(109, 17, 7, 202);
setTile(109, 17, 20, 47);
setTile(109, 17, 21, 202);
setTile(109, 18, 7, 202);
setTile(109, 18, 20, 47);
setTile(109, 18, 21, 202);
setTile(109, 19, 7, 202);
setTile(109, 19, 20, 47);
setTile(109, 19, 21, 202);
setTile(109, 20, 7, 204);
setTile(109, 21, 7, 202);
setTile(109, 21, 14, 202);
setTile(109, 22, 7, 202);
setTile(109, 22, 14, 202);
setTile(109, 23, 7, 202);
setTile(109, 23, 14, 202);
setTile(110, 8, 7, 202);
setTile(110, 8, 8, 3);
setTile(110, 8, 9, 202);
setTile(110, 8, 10, 202);
setTile(110, 8, 11, 202);
setTile(110, 8, 12, 202);
setTile(110, 8, 13, 202);
setTile(110, 8, 21, 202);
setTile(110, 9, 7, 202);
setTile(110, 9, 8, 213);
setTile(110, 9, 21, 20);
setTile(110, 10, 7, 202);
setTile(110, 10, 8, 202);
setTile(110, 10, 21, 20);
setTile(110, 11, 7, 202);
setTile(110, 11, 21, 20);
setTile(110, 12, 7, 204);
setTile(110, 12, 9, 202);
setTile(110, 12, 10, 202);
setTile(110, 12, 11, 202);
setTile(110, 12, 12, 202);
setTile(110, 12, 13, 202);
setTile(110, 12, 21, 204);
setTile(110, 13, 7, 202);
setTile(110, 13, 21, 20);
setTile(110, 14, 7, 102);
setTile(110, 14, 21, 20);
setTile(110, 15, 7, 102);
setTile(110, 15, 21, 20);
setTile(110, 16, 7, 204);
setTile(110, 16, 21, 204);
setTile(110, 17, 7, 202);
setTile(110, 17, 21, 202);
setTile(110, 18, 7, 102);
setTile(110, 18, 21, 202);
setTile(110, 19, 7, 202);
setTile(110, 19, 21, 202);
setTile(110, 20, 7, 204);
setTile(110, 21, 7, 202);
setTile(110, 21, 14, 202);
setTile(110, 22, 7, 102);
setTile(110, 22, 14, 102);
setTile(110, 23, 7, 202);
setTile(110, 23, 14, 202);
setTile(111, 8, 7, 202);
setTile(111, 8, 8, 3);
setTile(111, 8, 9, 202);
setTile(111, 8, 10, 202);
setTile(111, 8, 11, 202);
setTile(111, 8, 12, 202);
setTile(111, 8, 13, 202);
setTile(111, 8, 21, 202);
setTile(111, 9, 7, 202);
setTile(111, 9, 8, 202);
setTile(111, 9, 21, 20);
setTile(111, 10, 7, 202);
setTile(111, 10, 8, 203);
setTile(111, 10, 21, 20);
setTile(111, 11, 7, 202);
setTile(111, 11, 21, 20);
setTile(111, 12, 7, 204);
setTile(111, 12, 9, 202);
setTile(111, 12, 10, 202);
setTile(111, 12, 11, 202);
setTile(111, 12, 12, 202);
setTile(111, 12, 13, 202);
setTile(111, 12, 21, 204);
setTile(111, 13, 7, 202);
setTile(111, 13, 21, 20);
setTile(111, 14, 7, 202);
setTile(111, 14, 21, 20);
setTile(111, 15, 7, 202);
setTile(111, 15, 21, 20);
setTile(111, 16, 7, 204);
setTile(111, 16, 21, 204);
setTile(111, 17, 7, 202);
setTile(111, 17, 21, 202);
setTile(111, 18, 7, 202);
setTile(111, 18, 21, 202);
setTile(111, 19, 7, 202);
setTile(111, 19, 21, 202);
setTile(111, 20, 7, 204);
setTile(111, 21, 7, 202);
setTile(111, 21, 14, 202);
setTile(111, 22, 7, 202);
setTile(111, 22, 14, 202);
setTile(111, 23, 7, 202);
setTile(111, 23, 14, 202);
setTile(112, 8, 8, 3);
setTile(112, 8, 9, 202);
setTile(112, 8, 10, 202);
setTile(112, 8, 11, 202);
setTile(112, 8, 12, 202);
setTile(112, 8, 13, 202);
setTile(112, 8, 21, 204);
setTile(112, 9, 8, 202);
setTile(112, 9, 9, 203);
setTile(112, 9, 21, 204);
setTile(112, 10, 21, 204);
setTile(112, 11, 21, 204);
setTile(112, 12, 9, 202);
setTile(112, 12, 10, 202);
setTile(112, 12, 11, 202);
setTile(112, 12, 12, 202);
setTile(112, 12, 13, 202);
setTile(112, 12, 21, 204);
setTile(112, 13, 8, 203);
setTile(112, 13, 21, 204);
setTile(112, 14, 21, 204);
setTile(112, 15, 21, 204);
setTile(112, 16, 21, 204);
setTile(112, 17, 21, 204);
setTile(112, 18, 21, 204);
setTile(112, 19, 21, 204);
setTile(112, 23, 14, 202);
setTile(113, 8, 7, 202);
setTile(113, 8, 8, 3);
setTile(113, 8, 9, 202);
setTile(113, 8, 10, 202);
setTile(113, 8, 11, 202);
setTile(113, 8, 12, 202);
setTile(113, 8, 13, 202);
setTile(113, 8, 21, 202);
setTile(113, 9, 7, 202);
setTile(113, 9, 8, 202);
setTile(113, 9, 21, 20);
setTile(113, 10, 7, 202);
setTile(113, 10, 8, 203);
setTile(113, 10, 21, 20);
setTile(113, 11, 7, 202);
setTile(113, 11, 21, 20);
setTile(113, 12, 7, 204);
setTile(113, 12, 9, 202);
setTile(113, 12, 10, 202);
setTile(113, 12, 11, 202);
setTile(113, 12, 12, 202);
setTile(113, 12, 13, 202);
setTile(113, 12, 21, 204);
setTile(113, 13, 7, 202);
setTile(113, 13, 21, 20);
setTile(113, 14, 7, 202);
setTile(113, 14, 21, 20);
setTile(113, 15, 7, 202);
setTile(113, 15, 21, 20);
setTile(113, 16, 7, 204);
setTile(113, 16, 21, 204);
setTile(113, 17, 7, 202);
setTile(113, 17, 21, 202);
setTile(113, 18, 7, 202);
setTile(113, 18, 21, 202);
setTile(113, 19, 7, 202);
setTile(113, 19, 21, 202);
setTile(113, 20, 7, 204);
setTile(113, 21, 7, 202);
setTile(113, 21, 14, 202);
setTile(113, 22, 7, 202);
setTile(113, 22, 14, 202);
setTile(113, 23, 7, 202);
setTile(113, 23, 14, 202);
setTile(114, 8, 7, 202);
setTile(114, 8, 8, 3);
setTile(114, 8, 9, 202);
setTile(114, 8, 10, 202);
setTile(114, 8, 11, 202);
setTile(114, 8, 12, 202);
setTile(114, 8, 13, 202);
setTile(114, 8, 21, 202);
setTile(114, 9, 7, 202);
setTile(114, 9, 8, 213);
setTile(114, 9, 21, 20);
setTile(114, 10, 7, 202);
setTile(114, 10, 8, 202);
setTile(114, 10, 21, 20);
setTile(114, 11, 7, 202);
setTile(114, 11, 21, 20);
setTile(114, 12, 7, 204);
setTile(114, 12, 9, 202);
setTile(114, 12, 10, 202);
setTile(114, 12, 11, 202);
setTile(114, 12, 12, 202);
setTile(114, 12, 13, 202);
setTile(114, 12, 21, 204);
setTile(114, 13, 7, 202);
setTile(114, 13, 21, 20);
setTile(114, 14, 7, 102);
setTile(114, 14, 21, 20);
setTile(114, 15, 7, 102);
setTile(114, 15, 21, 20);
setTile(114, 16, 7, 204);
setTile(114, 16, 21, 204);
setTile(114, 17, 7, 202);
setTile(114, 17, 21, 202);
setTile(114, 18, 7, 102);
setTile(114, 18, 21, 202);
setTile(114, 19, 7, 202);
setTile(114, 19, 21, 202);
setTile(114, 20, 7, 204);
setTile(114, 21, 7, 202);
setTile(114, 21, 14, 202);
setTile(114, 22, 7, 102);
setTile(114, 22, 14, 102);
setTile(114, 23, 7, 202);
setTile(114, 23, 14, 202);
setTile(115, 8, 7, 202);
setTile(115, 8, 8, 202);
setTile(115, 8, 9, 202);
setTile(115, 8, 10, 202);
setTile(115, 8, 11, 202);
setTile(115, 8, 12, 202);
setTile(115, 8, 13, 202);
setTile(115, 8, 21, 202);
setTile(115, 9, 7, 202);
setTile(115, 9, 8, 47);
setTile(115, 9, 13, 203);
setTile(115, 9, 21, 20);
setTile(115, 10, 7, 202);
setTile(115, 10, 8, 47);
setTile(115, 10, 21, 20);
setTile(115, 11, 7, 202);
setTile(115, 11, 8, 203);
setTile(115, 11, 21, 20);
setTile(115, 12, 7, 204);
setTile(115, 12, 9, 202);
setTile(115, 12, 10, 202);
setTile(115, 12, 11, 202);
setTile(115, 12, 12, 202);
setTile(115, 12, 13, 202);
setTile(115, 12, 21, 204);
setTile(115, 13, 7, 202);
setTile(115, 13, 21, 20);
setTile(115, 14, 7, 102);
setTile(115, 14, 21, 20);
setTile(115, 15, 7, 102);
setTile(115, 15, 21, 20);
setTile(115, 16, 7, 204);
setTile(115, 16, 21, 204);
setTile(115, 17, 7, 202);
setTile(115, 17, 20, 47);
setTile(115, 17, 21, 202);
setTile(115, 18, 7, 202);
setTile(115, 18, 20, 47);
setTile(115, 18, 21, 202);
setTile(115, 19, 7, 202);
setTile(115, 19, 20, 47);
setTile(115, 19, 21, 202);
setTile(115, 20, 7, 204);
setTile(115, 21, 7, 202);
setTile(115, 21, 14, 202);
setTile(115, 22, 7, 202);
setTile(115, 22, 14, 202);
setTile(115, 23, 7, 202);
setTile(115, 23, 14, 202);
setTile(116, 8, 7, 202);
setTile(116, 8, 8, 202);
setTile(116, 8, 9, 202);
setTile(116, 8, 10, 202);
setTile(116, 8, 11, 202);
setTile(116, 8, 12, 202);
setTile(116, 8, 13, 202);
setTile(116, 8, 21, 202);
setTile(116, 9, 7, 202);
setTile(116, 9, 8, 47);
setTile(116, 9, 12, 211);
setTile(116, 9, 14, 211);
setTile(116, 9, 21, 202);
setTile(116, 10, 7, 202);
setTile(116, 10, 8, 47);
setTile(116, 10, 12, 203);
setTile(116, 10, 13, 203);
setTile(116, 10, 14, 203);
setTile(116, 10, 21, 202);
setTile(116, 11, 7, 202);
setTile(116, 11, 8, 202);
setTile(116, 11, 21, 202);
setTile(116, 12, 7, 204);
setTile(116, 12, 9, 203);
setTile(116, 12, 10, 202);
setTile(116, 12, 11, 202);
setTile(116, 12, 12, 202);
setTile(116, 12, 13, 202);
setTile(116, 12, 21, 204);
setTile(116, 13, 7, 202);
setTile(116, 13, 21, 202);
setTile(116, 14, 7, 202);
setTile(116, 14, 21, 202);
setTile(116, 15, 7, 202);
setTile(116, 15, 21, 202);
setTile(116, 16, 7, 204);
setTile(116, 16, 21, 204);
setTile(116, 17, 7, 202);
setTile(116, 17, 21, 202);
setTile(116, 18, 7, 202);
setTile(116, 18, 21, 202);
setTile(116, 19, 7, 202);
setTile(116, 19, 21, 202);
setTile(116, 20, 7, 204);
setTile(116, 21, 7, 202);
setTile(116, 21, 8, 47);
setTile(116, 21, 9, 47);
setTile(116, 21, 10, 47);
setTile(116, 21, 11, 47);
setTile(116, 21, 12, 47);
setTile(116, 21, 13, 47);
setTile(116, 21, 14, 202);
setTile(116, 22, 7, 202);
setTile(116, 22, 8, 47);
setTile(116, 22, 9, 47);
setTile(116, 22, 10, 47);
setTile(116, 22, 11, 47);
setTile(116, 22, 12, 47);
setTile(116, 22, 13, 47);
setTile(116, 22, 14, 202);
setTile(116, 23, 7, 202);
setTile(116, 23, 8, 47);
setTile(116, 23, 9, 47);
setTile(116, 23, 10, 47);
setTile(116, 23, 11, 47);
setTile(116, 23, 12, 47);
setTile(116, 23, 13, 47);
setTile(116, 23, 14, 202);
setTile(117, 8, 8, 202);
setTile(117, 8, 9, 202);
setTile(117, 8, 10, 202);
setTile(117, 8, 11, 202);
setTile(117, 8, 12, 202);
setTile(117, 8, 13, 202);
setTile(117, 8, 15, 202);
setTile(117, 8, 16, 202);
setTile(117, 8, 17, 202);
setTile(117, 8, 18, 202);
setTile(117, 8, 19, 202);
setTile(117, 8, 20, 202);
setTile(117, 8, 21, 204);
setTile(117, 9, 8, 202);
setTile(117, 9, 9, 202);
setTile(117, 9, 10, 202);
setTile(117, 9, 11, 202);
setTile(117, 9, 12, 202);
setTile(117, 9, 13, 202);
setTile(117, 9, 15, 20);
setTile(117, 9, 16, 20);
setTile(117, 9, 17, 20);
setTile(117, 9, 18, 20);
setTile(117, 9, 19, 20);
setTile(117, 9, 20, 202);
setTile(117, 9, 21, 204);
setTile(117, 10, 8, 202);
setTile(117, 10, 9, 202);
setTile(117, 10, 10, 102);
setTile(117, 10, 11, 102);
setTile(117, 10, 12, 102);
setTile(117, 10, 13, 202);
setTile(117, 10, 15, 20);
setTile(117, 10, 16, 20);
setTile(117, 10, 17, 20);
setTile(117, 10, 18, 20);
setTile(117, 10, 19, 20);
setTile(117, 10, 20, 202);
setTile(117, 10, 21, 204);
setTile(117, 11, 8, 202);
setTile(117, 11, 9, 202);
setTile(117, 11, 10, 102);
setTile(117, 11, 11, 102);
setTile(117, 11, 12, 102);
setTile(117, 11, 13, 202);
setTile(117, 11, 15, 20);
setTile(117, 11, 16, 20);
setTile(117, 11, 17, 20);
setTile(117, 11, 18, 20);
setTile(117, 11, 19, 20);
setTile(117, 11, 20, 202);
setTile(117, 11, 21, 204);
setTile(117, 12, 8, 204);
setTile(117, 12, 9, 204);
setTile(117, 12, 10, 204);
setTile(117, 12, 11, 204);
setTile(117, 12, 12, 204);
setTile(117, 12, 13, 204);
setTile(117, 12, 15, 204);
setTile(117, 12, 16, 204);
setTile(117, 12, 17, 204);
setTile(117, 12, 18, 204);
setTile(117, 12, 19, 204);
setTile(117, 12, 20, 204);
setTile(117, 12, 21, 204);
setTile(117, 13, 8, 202);
setTile(117, 13, 9, 202);
setTile(117, 13, 10, 202);
setTile(117, 13, 11, 202);
setTile(117, 13, 12, 202);
setTile(117, 13, 13, 202);
setTile(117, 13, 15, 20);
setTile(117, 13, 16, 20);
setTile(117, 13, 17, 20);
setTile(117, 13, 18, 20);
setTile(117, 13, 19, 20);
setTile(117, 13, 20, 202);
setTile(117, 13, 21, 204);
setTile(117, 14, 8, 202);
setTile(117, 14, 9, 102);
setTile(117, 14, 10, 102);
setTile(117, 14, 11, 102);
setTile(117, 14, 12, 102);
setTile(117, 14, 13, 202);
setTile(117, 14, 15, 20);
setTile(117, 14, 16, 20);
setTile(117, 14, 17, 20);
setTile(117, 14, 18, 20);
setTile(117, 14, 19, 20);
setTile(117, 14, 20, 202);
setTile(117, 14, 21, 204);
setTile(117, 15, 8, 202);
setTile(117, 15, 9, 102);
setTile(117, 15, 10, 102);
setTile(117, 15, 11, 102);
setTile(117, 15, 12, 102);
setTile(117, 15, 13, 202);
setTile(117, 15, 15, 20);
setTile(117, 15, 16, 20);
setTile(117, 15, 17, 20);
setTile(117, 15, 18, 20);
setTile(117, 15, 19, 20);
setTile(117, 15, 20, 202);
setTile(117, 15, 21, 204);
setTile(117, 16, 8, 204);
setTile(117, 16, 9, 204);
setTile(117, 16, 10, 204);
setTile(117, 16, 11, 204);
setTile(117, 16, 12, 204);
setTile(117, 16, 13, 204);
setTile(117, 16, 15, 204);
setTile(117, 16, 16, 204);
setTile(117, 16, 17, 204);
setTile(117, 16, 18, 204);
setTile(117, 16, 19, 204);
setTile(117, 16, 20, 204);
setTile(117, 16, 21, 204);
setTile(117, 17, 21, 204);
setTile(117, 18, 21, 204);
setTile(117, 19, 21, 204);
setTile(117, 20, 8, 204);
setTile(117, 20, 9, 204);
setTile(117, 20, 10, 204);
setTile(117, 20, 11, 204);
setTile(117, 20, 12, 204);
setTile(117, 20, 13, 204);
setTile(117, 20, 15, 204);
setTile(117, 20, 16, 204);
setTile(117, 20, 17, 204);
setTile(117, 20, 18, 204);
setTile(117, 20, 19, 204);
setTile(117, 20, 20, 204);
setTile(117, 21, 8, 202);
setTile(117, 21, 9, 202);
setTile(117, 21, 10, 202);
setTile(117, 21, 11, 202);
setTile(117, 21, 12, 202);
setTile(117, 21, 13, 202);
setTile(117, 21, 15, 211);
setTile(117, 21, 16, 211);
setTile(117, 21, 17, 211);
setTile(117, 21, 18, 211);
setTile(117, 21, 19, 211);
setTile(117, 21, 20, 211);
setTile(117, 22, 8, 202);
setTile(117, 22, 9, 202);
setTile(117, 22, 10, 202);
setTile(117, 22, 11, 202);
setTile(117, 22, 12, 202);
setTile(117, 22, 13, 202);
setTile(117, 23, 8, 202);
setTile(117, 23, 9, 202);
setTile(117, 23, 10, 202);
setTile(117, 23, 11, 202);
setTile(117, 23, 12, 202);
setTile(117, 23, 13, 202);
setTiles(110, 114, 9, 9, 11, 18, 171, 5);
setTile(112, 21, 14, 64, 1);
setTile(112, 22, 14, 64, 8);
setTile(107, 9, 19, 64, 2);
setTile(107, 10, 19, 64, 9);
setTile(107, 9, 20, 64, 2);
setTile(107, 10, 20, 64, 8);
setTiles(116, 116, 24, 24, 8, 13, 202);
setTile(119, 8, 49, 221);
}
else if(part==2){
for(var xx=120;xx<150;xx++){
for(var zz=3;zz<80;zz++){
setTile(xx, 3, zz, 7);
setTile(xx,30,zz,7);}}
for(var xx=120;xx<150;xx++){
for(var yy=3;yy<30;yy++){
setTile(xx, yy, 3, 7);
setTile(xx,yy, 80,7);}}
for(var yy=3;yy<30;yy++){
for(var zz=3;zz<80;zz++){
setTile(150,yy,zz,7);}}
for(var xx=120;xx<150;xx++){
for(var zz=4;zz<80;zz++){
for(var yy=4;yy<6;yy++)
setTile(xx, yy, zz, 1);
setTile(xx, 6, zz, 3);
setTile(xx, 7, zz, 2);
setTile(xx, 29, zz, 208);
for(var yy=8;yy<29;yy++)
setTile(xx,yy,zz,0);
}}
Magica.makeTree(123, 7, 26);
Magica.makeTree(125, 7, 14);
Magica.makeTree(126, 7, 8);
Magica.makeTree(126, 7, 20);
Magica.makeTree(127, 7, 16);
Magica.makeTree(128, 7, 25);
Magica.makeTree(128, 7, 30);
Magica.makeTree(128, 7, 37);
Magica.makeTree(130, 7, 7);
Magica.makeTree(133, 7, 26);
Magica.makeTree(133, 7, 31);
Magica.makeTree(135, 7, 36);
Magica.makeTree(135, 7, 53);
Magica.makeTree(135, 7, 63);
Magica.makeTree(136, 7, 42);
Magica.makeTree(136, 7, 59);
Magica.makeTree(136, 7, 68);
Magica.makeTree(137, 7, 6);
Magica.makeTree(138, 7, 29);
Magica.makeTree(139, 7, 38);
Magica.makeTree(139, 7, 64);
Magica.makeTree(141, 7, 27);
Magica.makeTree(141, 7, 34);
Magica.makeTree(141, 7, 50);
Magica.makeTree(141, 7, 54);
Magica.makeTree(142, 7, 40);
Magica.makeTree(142, 7, 61);
Magica.makeTree(143, 7, 66);
Magica.makeTree(144, 7, 6);
Magica.makeTree(145, 7, 12);
Magica.makeTree(145, 7, 38);
Magica.makeTree(145, 7, 57);
Magica.makeTree(146, 7, 16);
Magica.makeTree(146, 7, 23);
Magica.makeTree(146, 7, 32);
Magica.makeTree(146, 7, 47);
Magica.makeTree(146, 7, 205);
Magica.makeTree(147, 7, 8);
Magica.makeTree(147, 7, 34);
Magica.makeTree(147, 7, 53);
Magica.makeTree(147, 7, 63);
Magica.makeTree(147, 7, 71);
setTile(121, 8, 40, 200);
setTile(122, 8, 30, 200);
setTile(122, 8, 36, 216);
setTile(122, 8, 45, 201);
setTile(123, 8, 43, 216);
setTile(124, 8, 34, 201);
setTile(125, 8, 44, 200);
setTile(126, 8, 39, 200);
setTile(128, 8, 46, 203);
setTile(128, 8, 47, 203);
setTile(128, 8, 48, 203);
setTile(128, 8, 49, 203);
setTile(128, 8, 50, 203);
setTile(129, 8, 33, 200);
setTile(129, 8, 44, 216);
setTile(129, 8, 46, 203);
setTile(129, 8, 47, 203);
setTile(129, 8, 48, 203);
setTile(129, 8, 49, 203);
setTile(129, 8, 50, 203);
setTile(131, 8, 40, 201);
setTile(133, 8, 35, 216);
setTile(135, 8, 38, 201);
setTile(135, 8, 43, 200);
setTile(120, 8, 59, 211);
setTile(120, 9, 59, 211);
setTile(120, 10, 59, 211);
setTile(120, 11, 59, 200);
setTile(122, 8, 72, 211);
setTile(122, 8, 75, 211);
setTile(122, 8, 76, 211);
setTile(122, 9, 72, 211);
setTile(122, 9, 75, 203);
setTile(122, 9, 76, 203);
setTile(122, 10, 72, 211);
setTile(122, 11, 72, 200);
setTile(123, 8, 59, 211);
setTile(123, 8, 62, 211);
setTile(123, 8, 69, 211);
setTile(123, 8, 70, 211);
setTile(123, 9, 59, 203);
setTile(123, 9, 60, 203);
setTile(123, 9, 61, 203);
setTile(123, 9, 62, 203);
setTile(123, 9, 69, 203);
setTile(123, 9, 70, 203);
setTile(123, 9, 75, 203);
setTile(123, 9, 76, 203);
setTile(124, 8, 59, 211);
setTile(124, 8, 62, 211);
setTile(124, 9, 59, 203);
setTile(124, 9, 60, 203);
setTile(124, 9, 61, 203);
setTile(124, 9, 62, 203);
setTile(124, 9, 69, 203);
setTile(124, 9, 70, 203);
setTile(124, 9, 75, 203);
setTile(124, 9, 76, 203);
setTile(125, 8, 75, 211);
setTile(125, 8, 76, 211);
setTile(125, 9, 69, 203);
setTile(125, 9, 70, 203);
setTile(125, 9, 75, 203);
setTile(125, 9, 76, 203);
setTile(126, 8, 58, 211);
setTile(126, 8, 65, 211);
setTile(126, 8, 69, 211);
setTile(126, 8, 70, 211);
setTile(126, 9, 58, 211);
setTile(126, 9, 65, 211);
setTile(126, 9, 69, 203);
setTile(126, 9, 70, 203);
setTile(126, 10, 58, 211);
setTile(126, 10, 65, 211);
setTile(126, 11, 58, 200);
setTile(126, 11, 65, 200);
setTile(127, 8, 53, 211);
setTile(127, 9, 53, 211);
setTile(127, 10, 53, 211);
setTile(127, 11, 53, 200);
setTile(128, 8, 46, 203);
setTile(128, 8, 47, 203);
setTile(128, 8, 48, 203);
setTile(128, 8, 49, 203);
setTile(128, 8, 50, 203);
setTile(128, 8, 51, 203);
setTile(128, 8, 52, 203);
setTile(128, 8, 73, 211);
setTile(128, 9, 73, 211);
setTile(128, 10, 73, 211);
setTile(128, 11, 73, 200);
setTile(129, 8, 46, 203);
setTile(129, 8, 47, 203);
setTile(129, 8, 48, 203);
setTile(129, 8, 49, 203);
setTile(129, 8, 50, 203);
setTile(129, 8, 51, 203);
setTile(129, 8, 52, 203);
setTile(129, 8, 60, 211);
setTile(129, 8, 63, 211);
setTile(129, 8, 69, 211);
setTile(129, 8, 74, 211);
setTile(129, 8, 75, 211);
setTile(129, 9, 60, 211);
setTile(129, 9, 63, 203);
setTile(129, 9, 64, 203);
setTile(129, 9, 65, 203);
setTile(129, 9, 66, 203);
setTile(129, 9, 67, 203);
setTile(129, 9, 68, 203);
setTile(129, 9, 69, 203);
setTile(129, 9, 74, 203);
setTile(129, 9, 75, 203);
setTile(129, 10, 60, 211);
setTile(129, 11, 60, 200);
setTile(130, 8, 63, 211);
setTile(130, 8, 69, 211);
setTile(130, 9, 63, 203);
setTile(130, 9, 64, 203);
setTile(130, 9, 65, 203);
setTile(130, 9, 66, 203);
setTile(130, 9, 67, 203);
setTile(130, 9, 68, 203);
setTile(130, 9, 69, 203);
setTile(130, 9, 74, 203);
setTile(130, 9, 75, 203);
setTile(131, 8, 55, 211);
setTile(131, 8, 74, 211);
setTile(131, 8, 75, 211);
setTile(131, 9, 55, 211);
setTile(131, 9, 74, 203);
setTile(131, 9, 75, 203);
setTile(131, 10, 55, 211);
setTile(131, 11, 55, 200);
setTile(132, 8, 67, 211);
setTile(132, 9, 67, 211);
setTile(132, 10, 67, 211);
setTile(132, 11, 67, 200);
setTile(134, 8, 78, 211);
setTile(134, 9, 78, 211);
setTile(134, 10, 78, 211);
setTile(134, 11, 78, 200);
setTiles(143, 149, 7, 7, 42, 45, 9);
setTiles(132, 142, 7, 7, 45, 47, 9);
setTiles(124, 136, 7, 7, 48, 49, 9);
setTiles(119, 127, 7, 7, 50, 52, 9);
setTile(119, 7, 53, 9);
setTile(119, 7, 54, 9);
setTile(119, 7, 55, 9);
setTile(120, 7, 53, 9);
setTile(120, 7, 54, 9);
setTile(121, 7, 49, 9);
setTile(121, 7, 53, 9);
setTile(121, 7, 54, 9);
setTile(122, 7, 49, 9);
setTile(122, 7, 53, 9);
setTile(123, 7, 49, 9);
setTile(123, 7, 53, 9);
setTile(124, 7, 53, 9);
setTile(127, 7, 47, 9);
setTile(128, 7, 47, 9);
setTile(128, 7, 50, 9);
setTile(128, 7, 51, 9);
setTile(129, 7, 47, 9);
setTile(129, 7, 50, 9);
setTile(129, 7, 51, 9);
setTile(130, 7, 46, 9);
setTile(130, 7, 47, 9);
setTile(130, 7, 50, 9);
setTile(130, 7, 51, 9);
setTile(131, 7, 46, 9);
setTile(131, 7, 47, 9);
setTile(131, 7, 50, 9);
setTile(132, 7, 50, 9);
setTile(133, 7, 50, 9);
setTile(136, 7, 44, 9);
setTile(137, 7, 44, 9);
setTile(137, 7, 48, 9);
setTile(138, 7, 44, 9);
setTile(138, 7, 48, 9);
setTile(139, 7, 43, 9);
setTile(139, 7, 44, 9);
setTile(139, 7, 48, 9);
setTile(140, 7, 43, 9);
setTile(140, 7, 44, 9);
setTile(141, 7, 43, 9);
setTile(141, 7, 44, 9);
setTile(142, 7, 43, 9);
setTile(142, 7, 44, 9);
setTile(143, 7, 46, 9);
setTile(144, 7, 46, 9);
setTile(145, 7, 41, 9);
setTile(146, 7, 41, 9);
setTile(147, 7, 40, 9);
setTile(147, 7, 41, 9);
setTile(147, 7, 46, 9);
setTile(148, 7, 39, 9);
setTile(148, 7, 40, 9);
setTile(148, 7, 41, 9);
setTile(148, 7, 46, 9);
setTile(148, 7, 47, 9);
setTile(149, 7, 39, 9);
setTile(149, 7, 40, 9);
setTile(149, 7, 41, 9);
setTile(149, 7, 46, 9);
setTile(149, 7, 47, 9);
setTiles(137, 143, 12, 12, 71, 77, 202);
setTiles(137, 143, 8, 8, 71, 77, 202);
setTile(137, 9, 71, 202);
setTile(137, 9, 72, 202);
setTile(137, 9, 73, 202);
setTile(137, 9, 75, 202);
setTile(137, 9, 76, 202);
setTile(137, 9, 77, 202);
setTile(137, 10, 71, 202);
setTile(137, 10, 72, 202);
setTile(137, 10, 73, 202);
setTile(137, 10, 75, 202);
setTile(137, 10, 76, 202);
setTile(137, 10, 77, 202);
setTile(137, 11, 71, 202);
setTile(137, 11, 72, 202);
setTile(137, 11, 73, 202);
setTile(137, 11, 74, 202);
setTile(137, 11, 75, 202);
setTile(137, 11, 76, 202);
setTile(137, 11, 77, 202);
setTile(138, 9, 71, 202);
setTile(138, 9, 72, 47);
setTile(138, 9, 76, 47);
setTile(138, 9, 77, 202);
setTile(138, 10, 71, 202);
setTile(138, 10, 72, 47);
setTile(138, 10, 76, 47);
setTile(138, 10, 77, 202);
setTile(138, 11, 71, 202);
setTile(138, 11, 72, 47);
setTile(138, 11, 76, 47);
setTile(138, 11, 77, 202);
setTile(139, 9, 71, 202);
setTile(139, 9, 72, 47);
setTile(139, 9, 76, 47);
setTile(139, 9, 77, 202);
setTile(139, 10, 71, 202);
setTile(139, 10, 72, 47);
setTile(139, 10, 76, 47);
setTile(139, 10, 77, 202);
setTile(139, 11, 71, 202);
setTile(139, 11, 72, 47);
setTile(139, 11, 76, 47);
setTile(139, 11, 77, 202);
setTile(140, 9, 71, 202);
setTile(140, 9, 72, 47);
setTile(140, 9, 74, 116);
setTile(140, 9, 76, 47);
setTile(140, 9, 77, 202);
setTile(140, 10, 71, 202);
setTile(140, 10, 72, 47);
setTile(140, 10, 76, 47);
setTile(140, 10, 77, 202);
setTile(140, 11, 71, 202);
setTile(140, 11, 72, 47);
setTile(140, 11, 76, 47);
setTile(140, 11, 77, 202);
setTile(141, 9, 71, 202);
setTile(141, 9, 72, 47);
setTile(141, 9, 76, 47);
setTile(141, 9, 77, 202);
setTile(141, 10, 71, 202);
setTile(141, 10, 72, 47);
setTile(141, 10, 76, 47);
setTile(141, 10, 77, 202);
setTile(141, 11, 71, 202);
setTile(141, 11, 72, 47);
setTile(141, 11, 76, 47);
setTile(141, 11, 77, 202);
setTile(142, 9, 71, 202);
setTile(142, 9, 72, 47);
setTile(142, 9, 73, 47);
setTile(142, 9, 74, 47);
setTile(142, 9, 75, 47);
setTile(142, 9, 76, 47);
setTile(142, 9, 77, 202);
setTile(142, 10, 71, 202);
setTile(142, 10, 72, 47);
setTile(142, 10, 73, 47);
setTile(142, 10, 74, 47);
setTile(142, 10, 75, 47);
setTile(142, 10, 76, 47);
setTile(142, 10, 77, 202);
setTile(142, 11, 71, 202);
setTile(142, 11, 72, 47);
setTile(142, 11, 73, 47);
setTile(142, 11, 74, 47);
setTile(142, 11, 75, 47);
setTile(142, 11, 76, 47);
setTile(142, 11, 77, 202);
setTile(143, 9, 71, 202);
setTile(143, 9, 72, 202);
setTile(143, 9, 73, 202);
setTile(143, 9, 74, 202);
setTile(143, 9, 75, 202);
setTile(143, 9, 76, 202);
setTile(143, 9, 77, 202);
setTile(143, 10, 71, 202);
setTile(143, 10, 72, 202);
setTile(143, 10, 73, 202);
setTile(143, 10, 74, 202);
setTile(143, 10, 75, 202);
setTile(143, 10, 76, 202);
setTile(143, 10, 77, 202);
setTile(143, 11, 71, 202);
setTile(143, 11, 72, 202);
setTile(143, 11, 73, 202);
setTile(143, 11, 74, 202);
setTile(143, 11, 75, 202);
setTile(143, 11, 76, 202);
setTile(143, 11, 77, 202);
setTile(137, 9, 74, 64, 2);
setTile(137, 10, 74, 64, 8);
setTile(140, 12, 74, 200);
for(var yy=8;yy<17;yy++){
setTile(132, yy, 9, 204);
setTile(132, yy, 17, 204);
setTile(140, yy, 9, 204);
setTile(140, yy, 17, 204);
}
setTiles(133, 139, 8, 8, 10, 16, 202);
setTiles(133, 139, 12, 12, 10, 16, 202);
setTiles(133, 139, 16, 16, 10, 16, 202);
for(var xx=132;xx<141;xx++){
setTile(xx, 17, 9, 211);
setTile(xx, 17, 17, 211);
}
for(var zz=10;zz<17;zz++){
setTile(132, 17, zz, 211);
setTile(140, 17, zz, 211);
setTile(132, 8, zz, 202);
setTile(132, 9, zz, 202);
setTile(132, 11, zz, 202);
setTile(132, 12, zz, 204);
setTile(132, 13, zz, 202);
setTile(132, 15, zz, 202);
setTile(132, 16, zz, 204);
setTile(140, 8, zz, 202);
setTile(140, 9, zz, 202);
setTile(140, 11, zz, 202);
setTile(140, 12, zz, 204);
setTile(140, 13, zz, 202);
setTile(140, 15, zz, 202);
setTile(140, 16, zz, 204);
}
setTile(132, 10, 10, 202);
setTile(132, 10, 11, 102);
setTile(132, 10, 12, 102);
setTile(132, 10, 13, 202);
setTile(132, 10, 14, 102);
setTile(132, 10, 15, 102);
setTile(132, 10, 16, 202);
setTile(132, 14, 10, 202);
setTile(132, 14, 11, 102);
setTile(132, 14, 12, 102);
setTile(132, 14, 13, 202);
setTile(132, 14, 14, 102);
setTile(132, 14, 15, 102);
setTile(132, 14, 16, 202);
setTile(133, 8, 9, 202);
setTile(133, 8, 17, 202);
setTile(133, 9, 9, 202);
setTile(133, 9, 10, 200);
setTile(133, 9, 16, 200);
setTile(133, 9, 17, 202);
setTile(133, 10, 9, 202);
setTile(133, 10, 17, 202);
setTile(133, 11, 9, 202);
setTile(133, 11, 17, 202);
setTile(133, 12, 9, 204);
setTile(133, 12, 17, 204);
setTile(133, 13, 9, 202);
setTile(133, 13, 10, 220);
setTile(133, 13, 16, 220);
setTile(133, 13, 17, 202);
setTile(133, 14, 9, 202);
setTile(133, 14, 17, 202);
setTile(133, 15, 9, 202);
setTile(133, 15, 17, 202);
setTile(133, 16, 9, 204);
setTile(133, 16, 17, 204);
setTile(134, 8, 9, 202);
setTile(134, 8, 17, 202);
setTile(134, 9, 9, 202);
setTile(134, 9, 17, 202);
setTile(134, 10, 9, 102);
setTile(134, 10, 17, 102);
setTile(134, 11, 9, 202);
setTile(134, 11, 17, 202);
setTile(134, 12, 9, 204);
setTile(134, 12, 17, 204);
setTile(134, 13, 9, 202);
setTile(134, 13, 17, 202);
setTile(134, 14, 9, 102);
setTile(134, 14, 17, 102);
setTile(134, 15, 9, 202);
setTile(134, 15, 17, 202);
setTile(134, 16, 9, 204);
setTile(134, 16, 17, 204);
setTile(135, 8, 9, 202);
setTile(135, 8, 17, 202);
setTile(135, 8, 18, 203);
setTile(135, 9, 9, 202);
setTile(135, 9, 17, 202);
setTile(135, 10, 9, 102);
setTile(135, 10, 17, 202);
setTile(135, 11, 9, 202);
setTile(135, 11, 17, 202);
setTile(135, 12, 9, 204);
setTile(135, 12, 17, 204);
setTile(135, 13, 9, 202);
setTile(135, 13, 17, 202);
setTile(135, 14, 9, 102);
setTile(135, 14, 17, 102);
setTile(135, 15, 9, 202);
setTile(135, 15, 17, 202);
setTile(135, 16, 9, 204);
setTile(135, 16, 17, 204);
setTile(135, 20, 12, 203);
setTile(135, 20, 13, 203);
setTile(135, 20, 14, 203);
setTile(136, 8, 9, 202);
setTile(136, 8, 17, 202);
setTile(136, 8, 18, 203);
setTile(136, 9, 9, 202);
setTile(136, 10, 9, 202);
setTile(136, 11, 9, 202);
setTile(136, 11, 17, 202);
setTile(136, 12, 9, 204);
setTile(136, 12, 17, 204);
setTile(136, 13, 9, 202);
setTile(136, 13, 17, 202);
setTile(136, 14, 9, 202);
setTile(136, 14, 17, 202);
setTile(136, 15, 9, 202);
setTile(136, 15, 17, 202);
setTile(136, 16, 9, 204);
setTile(136, 16, 17, 204);
setTile(136, 20, 12, 203);
setTile(136, 20, 13, 200);
setTile(136, 20, 14, 203);
setTile(137, 8, 9, 202);
setTile(137, 8, 17, 202);
setTile(137, 8, 18, 203);
setTile(137, 9, 9, 202);
setTile(137, 9, 17, 202);
setTile(137, 10, 9, 102);
setTile(137, 10, 17, 202);
setTile(137, 11, 9, 202);
setTile(137, 11, 17, 202);
setTile(137, 12, 9, 204);
setTile(137, 12, 17, 204);
setTile(137, 13, 9, 202);
setTile(137, 13, 17, 202);
setTile(137, 14, 9, 102);
setTile(137, 14, 17, 102);
setTile(137, 15, 9, 202);
setTile(137, 15, 17, 202);
setTile(137, 16, 9, 204);
setTile(137, 16, 17, 204);
setTile(137, 20, 12, 203);
setTile(137, 20, 13, 203);
setTile(137, 20, 14, 203);
setTile(138, 8, 9, 202);
setTile(138, 8, 17, 202);
setTile(138, 9, 9, 202);
setTile(138, 9, 17, 202);
setTile(138, 10, 9, 102);
setTile(138, 10, 17, 102);
setTile(138, 11, 9, 202);
setTile(138, 11, 17, 202);
setTile(138, 12, 9, 204);
setTile(138, 12, 17, 204);
setTile(138, 13, 9, 202);
setTile(138, 13, 17, 202);
setTile(138, 14, 9, 102);
setTile(138, 14, 17, 102);
setTile(138, 15, 9, 202);
setTile(138, 15, 17, 202);
setTile(138, 16, 9, 204);
setTile(138, 16, 17, 204);
setTile(139, 8, 9, 202);
setTile(139, 8, 17, 202);
setTile(139, 9, 9, 202);
setTile(139, 9, 10, 200);
setTile(139, 9, 16, 200);
setTile(139, 9, 17, 202);
setTile(139, 10, 9, 202);
setTile(139, 10, 17, 202);
setTile(139, 11, 9, 202);
setTile(139, 11, 17, 202);
setTile(139, 12, 9, 204);
setTile(139, 12, 17, 204);
setTile(139, 13, 9, 202);
setTile(139, 13, 10, 220);
setTile(139, 13, 16, 220);
setTile(139, 13, 17, 202);
setTile(139, 14, 9, 202);
setTile(139, 14, 17, 202);
setTile(139, 15, 9, 202);
setTile(139, 15, 17, 202);
setTile(139, 16, 9, 204);
setTile(139, 16, 17, 204);
setTile(140, 10, 10, 202);
setTile(140, 10, 11, 102);
setTile(140, 10, 12, 102);
setTile(140, 10, 13, 202);
setTile(140, 10, 14, 102);
setTile(140, 10, 15, 102);
setTile(140, 10, 16, 202);
setTile(140, 14, 10, 202);
setTile(140, 14, 11, 102);
setTile(140, 14, 12, 102);
setTile(140, 14, 13, 202);
setTile(140, 14, 14, 102);
setTile(140, 14, 15, 102);
setTile(140, 14, 16, 202);
setTile(136, 9, 17, 64, 1);
setTile(136, 10, 17, 64, 8);
setTile(136, 8, 13, 204);
for(var yy=9;yy<20;yy++){
setTile(136, yy, 13, 204);
setTile(135, yy, 13, 65, 4);
setTile(137, yy, 13, 65, 5);
setTile(136, yy, 12, 65, 2);
setTile(136, yy, 14, 65, 3);
}
setTile(139, 14, 10, 63, 2);
Level.setSignText(139, 14, 10, 1, "Xiky");
setTile(139, 14, 16, 63, 6);
Level.setSignText(139, 14, 16, 1, "Tector");
setTile(133, 14, 10, 63, 14);
Level.setSignText(133, 14, 10, 1, "Higher");
Level.setSignText(133, 14, 10, 2, "World");
setTile(133, 14, 16, 63, 10);
Level.setSignText(133, 14, 16, 1, "Mosia");
setTile(136, 8, 73, 203);
setTile(136, 8, 74, 203);
setTile(136, 8, 75, 203);

}


}


function makeArea(type){
/*
Mosia - 1
Tector - 2
Xiky - 3
*/
if(type==1){
for(var xx=3;xx<40;xx++){
for(var zz=90;zz<130;zz++){
setTile(xx, 2, zz, 7);
setTile(xx,30,zz,7);}}
for(var xx=3;xx<40;xx++){
for(var yy=0;yy<30;yy++){
setTile(xx, yy, 90, 7);
setTile(xx,yy, 130,7);}}
for(var yy=0;yy<30;yy++){
for(var zz=90;zz<130;zz++){
setTile(3, yy, zz, 7);
setTile(40,yy,zz,7);}}
for(var xx=4;xx<40;xx++){
for(var zz=91;zz<130;zz++){
for(var yy=8;yy<29;yy++)
setTile(xx, yy, zz, 0);
setTile(xx, 3, zz, 1);
setTile(xx, 4, zz, 3);
setTile(xx, 5, zz, 3);
setTile(xx, 6, zz, 2);
setTile(xx, 7, zz, 9);
setTile(xx, 29, zz, 208);
setTile(xx, 30, zz, 7);
}}
Magica.makeTree(6, 6, 118, 204);
Magica.makeTree(7, 6, 96, 204);
Magica.makeTree(8, 6, 111, 204);
Magica.makeTree(8, 6, 126, 204);
Magica.makeTree(9, 6, 105, 204);
Magica.makeTree(12, 6, 98, 204);
Magica.makeTree(12, 6, 117, 204);
Magica.makeTree(14, 6, 111, 204);
Magica.makeTree(19, 6, 94, 204);
Magica.makeTree(19, 6, 101, 204);
Magica.makeTree(20, 6, 107, 204);
Magica.makeTree(20, 6, 116, 204);
Magica.makeTree(24, 6, 105, 204);
Magica.makeTree(24, 6, 123, 204);
Magica.makeTree(25, 6, 97, 204);
Magica.makeTree(26, 6, 113, 204);
Magica.makeTree(28, 6, 102, 204);
Magica.makeTree(31, 6, 117, 204);
Magica.makeTree(33, 6, 96, 204);
Magica.makeTree(34, 6, 107, 204);
Magica.makeTree(35, 6, 123, 204);
setTile(15, 7, 125, 202);
setTile(15, 7, 126, 202);
setTile(15, 8, 126, 211);
setTile(15, 9, 126, 211);
setTile(15, 10, 126, 214);
setTile(16, 7, 125, 202);
setTile(16, 7, 126, 202);
setTile(16, 8, 126, 219);
setTile(16, 9, 126, 63, 8);
Level.setSignText(16, 9, 126, 1, "Return");
setTile(17, 7, 125, 202);
setTile(17, 7, 126, 202);
setTile(17, 8, 126, 211);
setTile(17, 9, 126, 211);
setTile(17, 10, 126, 214);
setTile(4, 8, 102, 111);
setTile(5, 8, 94, 111);
setTile(6, 8, 108, 111);
setTile(7, 8, 101, 111);
setTile(7, 8, 125, 111);
setTile(8, 8, 106, 111);
setTile(8, 8, 113, 111);
setTile(9, 8, 109, 111);
setTile(9, 8, 121, 111);
setTile(10, 8, 97, 111);
setTile(11, 8, 122, 111);
setTile(11, 8, 123, 111);
setTile(12, 8, 112, 111);
setTile(12, 8, 122, 111);
setTile(12, 8, 126, 111);
setTile(13, 8, 94, 111);
setTile(13, 8, 121, 111);
setTile(14, 8, 103, 111);
setTile(14, 8, 104, 111);
setTile(14, 8, 112, 111);
setTile(15, 8, 104, 111);
setTile(15, 8, 128, 111);
setTile(16, 8, 98, 111);
setTile(16, 8, 116, 111);
setTile(17, 8, 109, 111);
setTile(17, 8, 122, 111);
setTile(18, 8, 113, 111);
setTile(18, 8, 127, 111);
setTile(19, 8, 104, 111);
setTile(20, 8, 117, 111);
setTile(21, 8, 97, 111);
setTile(21, 8, 122, 111);
setTile(22, 8, 91, 111);
setTile(22, 8, 102, 111);
setTile(22, 8, 107, 111);
setTile(22, 8, 113, 111);
setTile(23, 8, 116, 111);
setTile(23, 8, 119, 111);
setTile(23, 8, 127, 111);
setTile(24, 8, 111, 111);
setTile(26, 8, 94, 111);
setTile(26, 8, 105, 111);
setTile(26, 8, 108, 111);
setTile(26, 8, 123, 111);
setTile(27, 8, 100, 111);
setTile(28, 8, 110, 111);
setTile(29, 8, 105, 111);
setTile(29, 8, 118, 111);
setTile(29, 8, 126, 111);
setTile(30, 8, 92, 111);
setTile(30, 8, 96, 111);
setTile(31, 8, 123, 111);
setTile(32, 8, 94, 111);
setTile(32, 8, 109, 111);
setTile(33, 8, 99, 111);
setTile(33, 8, 102, 111);
setTile(33, 8, 113, 111);
setTile(33, 8, 118, 111);
setTile(33, 8, 125, 111);
setTile(34, 8, 91, 111);
setTile(34, 8, 94, 111);
setTile(37, 8, 116, 111);
setTile(37, 8, 127, 111);
setTile(38, 8, 95, 111);
setTile(38, 8, 96, 111);
setTile(38, 8, 105, 111);
setTile(38, 8, 119, 111);
}


}


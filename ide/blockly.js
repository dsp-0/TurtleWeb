//import * as Blockly from 'blockly/core';
//import {javascriptGenerator, Order} from 'blockly/javascript';

let demoWorkspace;
let ttow;
let wtot;
let saveWorkspace;
let loadWorkspace;
let makeCode;
let progBuf;
let hexToRgb;
let bytecodeGenerator;
let code;

let g=[1,2,3,4,5,6,7,9,10,11,13,15,17,20,23,26,30,35,41,47,55,64,75,87,102,120,142,168,199,235,256],
    rb=[1,2,3,4,6,9,13,20,29,43,65,99,144,196,256];
let ig=0,irb=0;
let xg=[],xrb=[];
for(let i=0; i<256; i++){
  if(i<g[ig]) xg[i]=ig;
  else xg[i]=++ig;
  if(i<rb[irb]) xrb[i]=irb;
  else xrb[i]=++irb;
}

console.log(document)
document.addEventListener("DOMContentLoaded",async function(){

registerFieldAngle();
t = await getT();
Blockly.common.defineBlocksWithJsonArray(BLOCKS.map(block => {
	if (!block["tooltip"]) block["tooltip"] = t("block-" + block["type"] + "-tooltip");
	if (!block["message0"]) block["message0"] = t("block-" + block["type"] + "-message0");
	return block;
}) );

bytecodeGenerator = new Blockly.Generator('bytecode');

bytecodeGenerator.scrub_ = function(block, code, thisOnly) {
  const nextBlock =
      block.nextConnection && block.nextConnection.targetBlock();
  if (nextBlock && !thisOnly) {
    return code + ',' + bytecodeGenerator.blockToCode(nextBlock);
  }
  return code;
};

bytecodeGenerator.forBlock['forward'] = function(block, generator) {
  const distance = block.getFieldValue('distance');
  const units = block.getFieldValue('units');
  return 'F'+(distance*units).toString();
//  return 0x
};

bytecodeGenerator.forBlock['back'] = function(block, generator) {
  const distance = block.getFieldValue('distance');
  const units = block.getFieldValue('units');
  return 'B'+(distance*units).toString();
};

bytecodeGenerator.forBlock['feather_up'] = function(block, generator) {
  return 'U';
};

bytecodeGenerator.forBlock['feather_down'] = function(block, generator) {
  return 'D';
};

BLOCKS.forEach(block => {
	if(!bytecodeGenerator.forBlock[block["type"]]){
		bytecodeGenerator.forBlock[block["type"]] = (b,g)=>"";
	}
});

hexToRgb = hex =>
  hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
             ,(m, r, g, b) => '#' + r + r + g + g + b + b)
    .substring(1).match(/.{2}/g)
    .map(x => parseInt(x, 16))

bytecodeGenerator.forBlock['eyes'] = function(block, generator) {
  const leftColor = block.getFieldValue('left');
  const rightColor = block.getFieldValue('right');
  const leftRGB = hexToRgb(leftColor);
  const rightRGB = hexToRgb(rightColor);
  const leftX=(xrb[leftRGB[0]]<<9)|(xg[leftRGB[1]]<<4)|(xrb[leftRGB[2]]);
  const rightX=(xrb[rightRGB[0]]<<9)|(xg[rightRGB[1]]<<4)|(xrb[rightRGB[2]]);
  return 'L'+leftX+'_'+rightX;
};


bytecodeGenerator.forBlock['right'] = function(block, generator) {
  const angle = block.getFieldValue('angle');
  return 'R'+angle;
};

bytecodeGenerator.forBlock['left'] = function(block, generator) {
  const angle = block.getFieldValue('angle');
  return 'R-'+angle;
};

demoWorkspace = Blockly.inject('blocklyDiv', {
  media: './blockly/media/',
  toolbox: toolbox,
  renderer: 'zelos',
  zoom: {
		controls: true,
		// wheel: true,
		startScale: 0.8,
		maxScale: 1,
		minScale: 0.3,
		scaleSpeed: 1.2,
		// pinch: true
	},
	move: {
		scrollbars: {
			horizontal: true,
			vertical: true,
		},
		drag: true,
		wheel: true
	},
});

progBuf=new Uint16Array(0);

makeCode = function(c){
	if(!c)
  code=bytecodeGenerator.workspaceToCode(demoWorkspace);
	else code=c;
  data=new Uint16Array(1000);
  i=0;
  for(s of code.split(','))
  {
	if(s.length==0)continue;
	if(i==1000) break; // avoid overflow
    if(s[0]=='F') data[i]=(+s.substring(1))&0x03FF|0x8000;
    else if(s[0]=='B') data[i]=(-s.substring(1))&0x03FF|0x8000;
    else if(s[0]=='R') data[i]=(+s.substring(1))&0x01FF|0x8400;
    else if(s[0]=='U') data[i]=0x87FF;
    else if(s[0]=='D') data[i]=0x87FE;
    else if(s[0]=='L'){
      let lr=s.substring(1).split('_');
      data[i]=0xC000|lr[0];
      data[++i]=0xE000|lr[1];
    }
    i++;
  }
  progBuf=data.slice(0,i);
//  document.getElementById('codelab').innerText=code;
	return progBuf;
}

wtot =function (w){
	return Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(w))
}
ttow = function (text){
	return Blockly.utils.xml.textToDom(text)
}

saveWorkspace = function (w){
	localStorage["workspace"] = wtot(w);
}

loadWorkspace = function (w){
	Blockly.Xml.clearWorkspaceAndLoadFromXml(ttow(localStorage["workspace"]), w);
}

if (localStorage["workspace"]){
	loadWorkspace(demoWorkspace);
}

demoWorkspace.addChangeListener( event => {
	if (event.type === Blockly.Events.BLOCK_CREATE ||
		event.type === Blockly.Events.BLOCK_DELETE ||
		event.type === Blockly.Events.BLOCK_MOVE ||
		event.type === Blockly.Events.BLOCK_CHANGE){
		saveWorkspace(demoWorkspace);
	}
});

let savebtn = document.getElementById("save-to-file");
let clearbtn = document.getElementById("clear-workspace");
let loadinput = document.getElementById("file-input");
if (savebtn){
	savebtn.addEventListener("click", ()=>{
		let blob = new Blob([wtot(demoWorkspace)], {type:"text/plain"});
		let url = URL.createObjectURL(blob);
		let a = document.createElement("a");
		a.setAttribute("download", "workspace");
		a.href = url;
		a.click();
	})
}
if (clearbtn){
	clearbtn.addEventListener("click", ()=>{
		localStorage.removeItem("workspace");
		location.reload();
	})
}
if (loadinput){
	loadinput.addEventListener("change", (e)=>{
		// console.log(e)
		let file = e.target.files[0];
		let reader = new FileReader();
		reader.onload = e2 => {
			Blockly.Xml.clearWorkspaceAndLoadFromXml(ttow(reader.result),demoWorkspace);
			document.getElementById("file-input").value=''
		}
		reader.readAsText(file);
	})
}

document.getElementById("load-from-file").addEventListener("click", e=>{
	loadinput.click()
})

});
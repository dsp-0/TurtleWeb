//import * as Blockly from 'blockly/core';
//import {javascriptGenerator, Order} from 'blockly/javascript';

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

registerFieldAngle();
Blockly.common.defineBlocksWithJsonArray([
  {
    "type": "forward",
    "tooltip": "Ехать вперед",
    "helpUrl": "",
    "message0": "вперед %1 %2 %3",
    "args0": [
      {
        "type": "field_number",
        "name": "distance",
        "value": 10,
        "min": -3000,
        "max": 3000
      },
      {
        "type": "field_dropdown",
        "name": "units",
        "options": [
          [
            "cm",
            "10"
          ],
          [
            "mm",
            "1"
          ]
        ]
      },
      {
        "type": "input_dummy",
        "name": "NAME"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
  "colour": "#4F7CF7"
  },
  {
    "type": "back",
    "tooltip": "Ехать назад",
    "helpUrl": "",
    "message0": "назад %1 %2 %3",
    "args0": [
      {
        "type": "field_number",
        "name": "distance",
        "value": 10,
        "min": -128,
        "max": 127
      },
      {
        "type": "field_dropdown",
        "name": "units",
        "options": [
          [
            "cm",
            "10"
          ],
          [
            "mm",
            "1"
          ]
        ]
      },
      {
        "type": "input_dummy",
        "name": "NAME"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
  "colour": "#4F7CF7"
  },
  {
    "type": "feather_up",
    "tooltip": "Поднять перо",
    "helpUrl": "",
    "message0": "Поднять перо %1",
    "args0": [
      {
        "type": "input_dummy",
        "name": "NAME"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
  "colour": "#4ED1C1"
  },
  {
    "type": "feather_down",
    "tooltip": "Опустить перо",
    "helpUrl": "",
    "message0": "Опустить перо %1",
    "args0": [
      {
        "type": "input_dummy",
        "name": "NAME"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
  "colour": "#4ED1C1"
  },
  {
    "type": 'eyes',
    "message0": 'Глаз левый %1 , правый %2 %3',
    "args0": [
      {
        "type": 'field_colour_hsv_sliders',
        "name": 'left',
        "colour": '#40E0D0',
      },
      {
        "type": 'field_colour_hsv_sliders',
        "name": 'right',
        "colour": '#CCCCFF',
      },
      {
        "type": "input_dummy",
        "name": "NAME"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 219
  },
  {
    "type": "right",
    "tooltip": "Повернуть",
    "helpUrl": "",
    "message0": "повернуть на %1 вправо %2",
    "args0": [{
      "type": "field_angle",
        "name": "angle",
        "clockwise": true,
        "offset": 90,
        "value": 90,
        "precision": 1,

        "max": 180
      },
      {
        "type": "input_dummy",
        "name": "NAME"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
  "colour": "#7C6AED"
  },
  {
    "type": "left",
    "tooltip": "Повернуть",
    "helpUrl": "",
    "message0": "повернуть на %1 влево %2",
    "args0": [{
      "type": "field_angle",
        "name": "angle",
        "offset": 90,
        "value": 90,
        "precision": 1,
        "max": 180
      },
      {
        "type": "input_dummy",
        "name": "NAME"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
  "colour": "#7C6AED"
  },
  {
    type: "repeat",
    tooltip: "repeat constexpr amount of times",
    message0: "Повторить %1 раз %2 %3",
    inputsInline: true,
    args0: [
      {
        type: "field_number",
        name: "times",
        min: 2,
        max: 64,
        value: 4,
      },{
        type: "input_dummy",
        name: "timeszz",
      },{
        type: "input_statement",
        name: "body",
      },
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#F6A04D"
  },
                                                            
]);

const toolbox = {
  kind: 'flyoutToolbox',
  contents: [
    {
      kind: 'block',
      type: 'forward',
    },
    {
      kind: 'block',
      type: 'back',
    },
    {
      kind: 'block',
      type: 'right',
    },
    {
      kind: 'block',
      type: 'left',
    },
    {
      kind: 'block',
      type: 'feather_up',
    },
    {
      kind: 'block',
      type: 'feather_down',
    },
    {
      kind: 'block',
      type: 'eyes',
    },
    {
      kind: "block",
      type: "repeat"
    }
    
    /*{
      kind: 'block',
      type: 'controls_repeat',
    },
    {
      kind: 'block',
      type: 'math_number',
      fields: {
        NUM: 123,
      },
    },*/
    //{
    //  kind: 'block',
    //  type: 'math_arithmetic',
    //},
    //{
    //  kind: 'block',
    //  type: 'text',
    //},
    //{
    //  kind: 'block',
    //  type: 'text_print',
    //},
  ],
};
const bytecodeGenerator = new Blockly.Generator('bytecode');

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

const hexToRgb = hex =>
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

bytecodeGenerator.forBlock["repeat"] = function(block, generator) {
  let body = generator.statementToCode(block,"body",0).trim();
  let times = block.getFieldValue("times");

  return `C${times-1},${body},E`;
}

const demoWorkspace = Blockly.inject('blocklyDiv', {
	media: './blockly/media/',
	toolbox: toolbox,
	renderer: 'zelos',
	// rtl: locale=="ar",
	maxInstances:{
		start:1
	},
	grid: {
		spacing: 40,
		snap: true,
		length: 5,
		colour: "#888",
	},
	zoom: {
		controls: true,
		startScale: 0.8,
		maxScale: 1,
		minScale: 0.1,
		scaleSpeed: 1.5,
		wheel: true,
	},
	move: {
		scrollbars: {
			horizontal: true,
			vertical: true,
		},
		drag: true,
		wheel: true,
	},
  theme: {
    componentStyles : {
      workspaceBackgroundColour: "#F1F4F9",
      toolboxBackgroundColour: "#FFFFFF",
      flyoutBackgroundColour: "#FFFFFF",
      scrollbarColour: "#5050B0",
      scrollbarOpacity: 0.3, 
    }
  },
});

const blocklyArea = document.getElementById('blocklyArea');
const blocklyDiv = document.getElementById('blocklyDiv');

const onresize = function(e) {
  // Compute the absolute coordinates and dimensions of blocklyArea.
  let element = blocklyArea;
  let x = 0;
  let y = 0;
  do {
    x += element.offsetLeft;
    y += element.offsetTop;
    element = element.offsetParent;
  } while (element);
  // Position blocklyDiv over blocklyArea.
  blocklyDiv.style.left = x + 'px';
  blocklyDiv.style.top = y + 'px';
  blocklyDiv.style.width = (blocklyArea.offsetWidth - x) + 'px';
  blocklyDiv.style.height = (blocklyArea.offsetHeight - y) + 'px';
  Blockly.svgResize(demoWorkspace);
};
window.addEventListener('resize', onresize, false);
onresize();

progBuf=new Uint16Array(0);

function makeCode(){
  code=bytecodeGenerator.workspaceToCode(demoWorkspace);
  data=new Uint16Array(1000);
  i=0;
  for(s of code.split(','))
  {
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
    else if(s[0]=='C'){
      const mask = 0xFFC0;
      let times = +s.substring(1);
      data[i] = times & (mask ^ 0xFFFF);
    }
      else if(s[0]=='E'){
      data[i] = 0x0000;
    }
    i++;
  }
  progBuf=data.slice(0,i);
//  document.getElementById('codelab').innerText=code;
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
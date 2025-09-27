
let errmsg;
let vars;

tohex = (txt) => {
	let hex="";
	for(let i=0;i<txt.length;i++) hex+= txt.charCodeAt(i).toString(16).padStart(2,0);
	return hex;
}
fromhex = (hex) => {
	let txt="";
	for(let i=0;i<hex.length;i+=2) txt += String.fromCharCode(parseInt(hex.substr(i,2),16));
	return txt;
}

Actions = {
	fail: Symbol(),
	move: function(x){
		if(x<0){
			return 'B'+x.toString();
		} else {
			return 'F'+x.toString();
		}
	},
	turn: function(x){
		if(x<0){
			return "R-"+x;
		} else {
			return 'R'+x;
		}
	},
	up: function(x){return 'U';},
	down: function(x){return 'D';},
	eyes: function(l,r){
  const leftColor = l;
  const rightColor = r;
  const leftRGB = hexToRgb(leftColor);
  const rightRGB = hexToRgb(rightColor);
  const leftX=(xrb[leftRGB[0]]<<9)|(xg[leftRGB[1]]<<4)|(xrb[leftRGB[2]]);
  const rightX=(xrb[rightRGB[0]]<<9)|(xg[rightRGB[1]]<<4)|(xrb[rightRGB[2]]);
  return 'L'+leftX+'_'+rightX;
	},
	push: x=>{
		if(code==Actions.fail)return;
		if(x==Actions.fail){
			code = Actions.fail; return;
		}
		if(code!="")code+=','
		code += x;
	}
}

let prepGen = new Blockly.Generator('prep');

prepGen.scrub_ = (block, code, thisOnly) => {
	let next = "";
	if (!thisOnly && block.nextConnection) {
		var nextBlock = block.nextConnection.targetBlock();
		if (nextBlock) {
			next = prepGen.blockToCode(nextBlock);
		}
	}
	return code+next
};

prepGen.forBlock["start"] = (b,g)=>"code='';";

prepGen.forBlock['forward'] = function (block, generator) {
  return `Actions.push(Actions.move(${block.getFieldValue("distance") * block.getFieldValue("units")}));`
}
prepGen.forBlock['back'] = function (block, generator) {
  return `Actions.push(Actions.move(${block.getFieldValue("distance") * block.getFieldValue("units") * -1}));`
}
prepGen.forBlock['feather_up'] = function (block, generator) {
  return `Actions.push(Actions.up());`
}
prepGen.forBlock['feather_down'] = function (block, generator) {
  return `Actions.push(Actions.down());`
}
prepGen.forBlock['left'] = function (block, generator) {
  return `Actions.push(Actions.turn(${-block.getFieldValue("angle")}));`
}
prepGen.forBlock['right'] = function (block, generator) {
  return `Actions.push(Actions.turn(${block.getFieldValue("angle")}));`
}
prepGen.forBlock['eyes'] = function (block, generator) {
  return `Actions.push(Actions.eyes(${block.getFieldValue("left")},${block.getFieldValue("right")}));`
}

prepGen.forBlock["blank"] = (b,g)=>"";

prepGen.forBlock["move"] = (b,g) => {
	let val = prepGen.valueToCode(b,"dist",0);
	if(!val) val=0;
	val *= b.getFieldValue("units");
	return `Actions.push(Actions.move(${val}));`;
};

prepGen.forBlock["rotate"] = (b,g) => {
	let val = prepGen.valueToCode(b,"angle",0);
	if(!val) val=0;
	return `Actions.push(Actions.turn(${val}));`;
}

prepGen.forBlock["const_number"] = (b,g) => {
	return [`${b.getFieldValue("value")}`,0];
}
prepGen.forBlock["shadow_number"] = prepGen.forBlock["const_number"];

function makejs(w){
	return prepGen.workspaceToCode(w)+"code";
}

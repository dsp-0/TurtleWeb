
let errmsg;
let vars;
let counter;

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

prepGen.forBlock["start"] = (b,g)=>"code='';vars={};";

prepGen.forBlock['forward'] = function (block, generator) {
	return `move(${block.getFieldValue("distance") * block.getFieldValue("units")});`
}
prepGen.forBlock['back'] = function (block, generator) {
	return `move(${block.getFieldValue("distance") * block.getFieldValue("units") * -1});`
}
prepGen.forBlock['feather_up'] = function (block, generator) {
  return `up();`
}
prepGen.forBlock['feather_down'] = function (block, generator) {
  return `down();`
}
prepGen.forBlock['left'] = function (block, generator) {
  return `turn(${-block.getFieldValue("angle")});`
}
prepGen.forBlock['right'] = function (block, generator) {
  return `turn(${block.getFieldValue("angle")});`
}
prepGen.forBlock['eyes'] = function (block, generator) {
  return `eyes("${block.getFieldValue("left")}","${block.getFieldValue("right")}");`
}

prepGen.forBlock["blank"] = (b,g)=>"";

prepGen.forBlock["move"] = (b,g) => {
	let val = prepGen.valueToCode(b,"dist",0);
	if(!val) val=0;
	return `move(${val}*${b.getFieldValue("units")});`;
};

prepGen.forBlock["rotate"] = (b,g) => {
	let val = prepGen.valueToCode(b,"angle",0);
	if(!val) val=0;
	return `turn(${val});`;
}

prepGen.forBlock["const_number"] = (b,g) => {
	return [`${b.getFieldValue("value")}`,0];
}
prepGen.forBlock["shadow_number"] = prepGen.forBlock["const_number"];

prepGen.forBlock["shadow_bool"] = prepGen.forBlock["const_bool"] = (b,g) =>{
	return [b.getFieldValue("value").toLoverCase()=="true"? `true`:`false`,0];
}

prepGen.forBlock["shadow_str"] = prepGen.forBlock["const_str"] = (b,g) =>{
	return [`(${JSON.stringify(b.getFieldValue("value"))})`,0];
}

prepGen.forBlock["repeat"] = (b,g) => {
	let body = prepGen.statementToCode(b,"body",0);
	let vname = `vars["u_${counter++}"]`
	return `for(${vname}=0;${vname}<${prepGen.valueToCode(b,"times",0)};${vname}++){${body}}`;
}

prepGen.forBlock["if"] = (b,g) => {
	let body = g.statementToCode(b,"body",0);
	let condition = g.valueToCode(b,"condition",0);
	return `if(${condition}){${body}}`
}

prepGen.forBlock["_misc_connector"] = (b,g) => ["",0];

prepGen.forBlock["binary_op_num"] = prepGen.forBlock["binary_op_bool"] = (b,g) => {
	let op = b.getFieldValue("op");
	op = {
		sum: "+", prod: "*", diff: "-", quot: "/",
		eq: "==", gt: ">", lt: "<", ne: "<>", ge: ">=", le: "<=",
	}[op];
	let left = prepGen.valueToCode(b,"left",0);
	let right = prepGen.valueToCode(b,"right",0);
	return [`(${left}${op}${right})`,0];
};

prepGen.forBlock["_misc_log"] = (b,g) => {
	return `${b.getFieldValue("func")}(${g.valueToCode(b,"value",0)});`;
}

prepGen.forBlock["_misc_repr"] = (b,g) => {
	return [`${JSON.stringify(g.valueToCode(b,"value",0))}`,0];
}

prepGen.forBlock["_misc_exec"] = (b,g) => {
	return eval(g.valueToCode(b,"body",0));
}

prepGen.forBlock["invert"] = (b,g) => {
	return [`(!${g.valueToCode(b,"input",0)})`,0];
}

prepGen.forBlock["var_set"] = (b,g) => {
	let vname = `vars["v_"+${(g.valueToCode(b,"var",0))}]`;
	return `${vname}=${g.valueToCode(b,"value",0)};`;
}

prepGen.forBlock["var_num"] = (b,g) => {
	let vname = `vars["v_"+${(g.valueToCode(b,"var",0))}]`;
	return [`(['number','boolean'].includes(typeof ${vname})?${vname}:0)`,0];
}
prepGen.forBlock["var_str"] = (b,g) => {
	let vname = `vars["v_"+${(g.valueToCode(b,"var",0))}]`;
	return [`String(${vname})`,0];
}
prepGen.forBlock["var_bool"] = (b,g) => {
	let vname = `vars["v_"+${(g.valueToCode(b,"var",0))}]`;
	return [`(['number','boolean'].includes(typeof ${vname})?${vname}:false)`,0];
}
prepGen.forBlock["var_func"] = (b,g) => {
	let vname = `vars["v_"+${(g.valueToCode(b,"var",0))}]`;
	return [`(['function'].includes(typeof ${vname})?${vname}:()=>{})`,0];
}


prepGen.forBlock["lambda0"] = (b,g) => {
	return [`()=>{${g.statementToCode(b,"body",0)}}`,0];
}

prepGen.forBlock["call0"] = (b,g) => {
	return `${g.valueToCode(b,"func",0)}();`;
}

function makejs(b){
	counter=0;
	return prepGen.blockToCode(b);
}
function process(j){
	return eval(
		"code='';vars={};"+
		["move","turn","up","down","eyes"]
		.reduce((acc,act)=>acc+`let ${act}=((...a)=>Actions.push(Actions.${act}(...a)));`,"")
		+ j + "code"
	);
}

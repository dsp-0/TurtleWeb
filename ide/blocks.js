
const COLORS={
	inline: "#aaaaaa",
	movement: 0,
	control: 120,
	math: "#00aaaa",
	shadow: "#000000",
	misc: "#ff00aa",
	vars: 240,
}

const BLOCKS=[
	{
	"type": "forward",
	"helpUrl": "",
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
	"colour": COLORS.inline,
	},
	{
	"type": "back",
	"helpUrl": "",
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
	"colour": COLORS.inline,
	},
	{
	"type": "feather_up",

	"helpUrl": "",

	"args0": [
		{
		"type": "input_dummy",
		"name": "NAME"
		}
	],
	"previousStatement": null,
	"nextStatement": null,
	"colour": COLORS.inline,
	},
	{
	"type": "feather_down",
	"helpUrl": "",
	"args0": [
		{
		"type": "input_dummy",
		"name": "NAME"
		}
	],
	"previousStatement": null,
	"nextStatement": null,
	"colour": COLORS.inline,
	},
	{
	"type": 'eyes',

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
	"colour": COLORS.inline,
	},
	{
	"type": "right",
	"helpUrl": "",
	"args0": [{
		"type": "field_angle",
		"name": "angle",
		"clockwise": true,
		"offset": 90,
		"value": 90,
		"max": 180
		},
		{
		"type": "input_dummy",
		"name": "NAME"
		}
	],
	"previousStatement": null,
	"nextStatement": null,
	"colour": COLORS.inline,
	},
	{
	"type": "left",
	"helpUrl": "",
	"args0": [{
		"type": "field_angle",
		"name": "angle",
		"offset": 90,
		"value": 90,
		"max": 180
		},
		{
		"type": "input_dummy",
		"name": "NAME"
		}
	],
	"previousStatement": null,
	"nextStatement": null,
	"colour": COLORS.inline,
	},
	{
		type: "start",
		args0: [
			{
				type: "input_dummy",
				name: "NAME"
			},
		],
		nextStatement: null,
		colour: COLORS.control,
	},
	{
		type: "blank",
		previousStatement: null,
		nextStatement: null,
		output: null,
	},
	{
		type: "move",
		previousStatement: null,
		nextStatement: null,
		colour: 0,
		args0:[
			{
				type: "field_dropdown",
				name: "units",
				options: [
					["cm","10"],
					["mm","1"],
				],
			},
			{
				type: "input_value",
				name: "dist",
				check: ["num", "float"],
			},
		]
	},
	{
		type: "rotate",
		previousStatement: null, nextStatement: null,
		colour: 0,
		args0:[
			{
				type: "input_value",
				name: "angle",
				check: ["num", "float"],
			},
		]
	},
	{
		type: "const_number",
		args0: [
			{
				type: "field_number",
				name: "value",
				value: 0
			},
			{
				type: "input_end_row",
			},
		],
		output: "num",
		colour: 120,
	},
	{
		type: "const_bool",
		args0: [
			{
				type: "field_checkbox",
				name: "value",
				value: "FALSE"
			},
			{
				type: "input_end_row",
			},
		],
		output: "bool",
		colour: 120,
	},
	{
		type: "const_str",
		args0: [
			{
				type: "field_input",
				name: "value",
				value: "",
			},
			{
				type: "input_end_row",
			},
		],
		output: "str",
		colour: 120,
	},
	{
		type: "shadow_number",
		message0: "%1 %2",
		args0: [
			{
			type: "field_number",
			name: "value",
				value: 0
			},
			{
				type: "input_end_row",
			},
		],
		output: "num",
	},
	{
		type: "shadow_bool",
		message0: "%1 %2",
		output: "bool",
		args0: [
			{
				type: "field_checkbox",
				name: "value"
			},{type:"input_end_row"}
		],
	},
	{
		type: "shadow_str",
		message0: "%1 %2",
		args0: [
			{
				type: "field_input",
				name: "value",
				value: "",
			},
			{
				type: "input_end_row",
			},
		],
		output: "str",
		colour: 120,
	},
	{
		type: "repeat",
		previousStatement: null, nextStatement: null,
		colour: COLORS.control,
		args0: [
			{
				type: "input_value",
				name: "times",
				check: "num"
			},
			{type: "input_dummy",},
			{
				type: "input_statement",
				name: "body",
			}
		],
	},
	{
		type: "if",
		previousStatement: null, nextStatement: null,
		colour: COLORS.control,
		inputsInline: true,
		args0: [
			{
				type: "input_value",
				name: "condition",
				check: ["bool","num","str"],
			},
			{
				type: "input_statement",
				name: "body",
			}, {type: "input_dummy"},
		],
		inputs:{
			condition:{shadow:{
				type: "shadow_bool",
				fields: {value:"TRUE"},
			}}
		}
	},
	{
		type: "binary_op_num",
		output: "num",
		colour: COLORS.math,
		message0: "%1 %2 %3",
		inputsInline: true,
		args0: [
			{
				type: "input_value",
				name: "left",
				check: ["num","bool"],
			},
			{
				type: "field_dropdown",
				options: [
					["+","sum"],
					["-","diff"],
					["*","prod"],
					["/","quot"],
				],
				name: "op"
			},
			{
				type: "input_value",
				name: "right",
				check: ["num","bool"],
			},
		],
		inputs:{
			left:{ shadow: {
				type: "shadow_number",
				fields:{value:0}
			}},
			right:{ shadow: {
				type: "shadow_number",
				fields:{value:0}
			}},
		}
	},
	{
		type: "binary_op_bool",
		output: "bool",
		colour: COLORS.math,
		message0: "%1 %2 %3",
		inputsInline: true,
		args0: [
			{
				type: "input_value",
				name: "left",
				check: ["num", "bool"],
			},
			{
				type: "field_dropdown",
				options: [
					["=", "eq"],
					["<","lt"],
					[">","gt"],
					["<=","le"],
					[">=","ge"],
					["<>", "ne"],
				],
				name: "op"
			},
			{
				type: "input_value",
				name: "right",
				check: ["num","bool"],
			},
		],
		inputs:{
			left:{ shadow: {
				type: "shadow_number",
				fields:{value:0}
			}},
			right:{ shadow: {
				type: "shadow_number",
				fields:{value:0}
			}},
		}
	},
	{
		type: "invert",
		output: "bool",
		colour: COLORS.math,
		inputsInline: true,
		args0: [
			{
				type: "input_value",
				name: "input",
				check: ["num","bool"],
			},
		],
		inputs:{
			input:{ shadow: {
				type: "shadow_bool",
				fields:{value:"FALSE"}
			}},
		}
	},
	{
		type: "_misc_connector",
		output: "_misc_connector",  nextStatement: null,
		message0: "insert",
		colour: COLORS.misc,
	},
	{
		type: "_misc_null"
	},
	{
		type: "_misc_log",
		previousStatement: null, nextStatement: null,
		colour: COLORS.misc,
		message0: "%1 %2",
		args0: [
			{
				type: "field_dropdown",
				name: "func",
				options: [
					["log","console.log"],
					["alert","alert"],
					["warn","console.warn"],
					["error","console.error"],
				]
			},
			{
				type: "input_value",
				name: "value",
				check: ["str", "num", "bool"],
			}
		],
		inputs:{
			value:{shadow:{
				type: "shadow_str",
				fields:{value:""}
			}}
		}
	},
	{
		type: "_misc_repr",
		output: "str",
		colour: COLORS.misc,
		message0: "repr %1",
		args0: [
			{
				type: "input_value",
				name: "value",
				check: null,
			}
		]
	},
	{
		type: "_misc_exec",
		previousStatement: null, nextStatement: null,
		colour: "#ff0000",
		message0: "exec %1",
		args0: [
			{
				type: "input_value",
				name: "body",
				check: null,
			}
		],
		inputs:{body:{shadow:{
			type: "shadow_str",
			fields:{value:""},
		}}}
	},
	{
		type: "var_set",
		previousStatement: null, nextStatement: null,
		colour: COLORS.vars,
		inputsInline: true,
		args0: [
			{
				type: "input_value",
				name: "var",
				check: ["str","num"],
			},
			{
				type: "input_value",
				name: "value",
				check: ["str","num","bool","func"],
			},
		],
		inputs:{
			var:{shadow:{
				type: "shadow_str",
				fields:{value:"x"},
			}},
			value:{shadow:{
				type: "shadow_number",
				fields:{value:42},
			}}
		}
	},
	{
		type: "var_num",
		output: "num",
		colour: COLORS.vars,
		args0: [
			{
				type: "input_value",
				name: "var",
				check: ["str","num"],
			}
		],
		inputs:{var:{shadow:{
			type: "shadow_str",
			fields:{value:"x"},
		}}}
	},
	{
		type: "var_str",
		output: "str",
		colour: COLORS.vars,
		args0: [
			{
				type: "input_value",
				name: "var",
				check: ["str","num"],
			}
		],
		inputs:{var:{shadow:{
			type: "shadow_str",
			fields:{value:"x"},
		}}}
	},
	{
		type: "var_bool",
		output: "bool",
		colour: COLORS.vars,
		args0: [
			{
				type: "input_value",
				name: "var",
				check: ["str","num"],
			}
		],
		inputs:{var:{shadow:{
			type: "shadow_str",
			fields:{value:"x"},
		}}}
	},
	{
		type: "var_func",
		output: "func",
		colour: COLORS.vars,
		args0: [
			{
				type: "input_value",
				name: "var",
				check: ["str","num"],
			}
		],
		inputs:{var:{shadow:{
			type: "shadow_str",
			fields:{value:"x"},
		}}}
	},
	{
		type: "lambda0",
		output: "func",
		colour: COLORS.misc,
		message0: "%1",
		args0: [
			{
				type: "input_statement",
				name: "body",
			},
		]
	},
	{
		type: "call0",
		previousStatement: null, nextStatement: null,
		colour: COLORS.misc,
		args0: [
			{
				type: "input_value",
				name: "func",
				check: "func",
			},
		]
	},
]
const BLOCKSD = BLOCKS.reduce((acc,block)=>{acc[block.type]=block; return acc},{});

let toolbox;

{
	block = type => {
		let b = (typeof(type)=="string" ? {kind:"block", type:type} : type);
		if(BLOCKSD[type]?.inputs) b.inputs=BLOCKSD[type].inputs;
		if(BLOCKSD[type]?.fields) b.inputs=BLOCKSD[type].fields;
		return b;
	};

	toolbox = {
		kind: "categoryToolbox",
		contents: [
			{
				kind: "category",
				name: "inline",
				contents: [
					"forward",
					"back",
					"right",
					"left",
					"feather_up",
					"feather_down",
					"eyes",
				].map(block)
			},
			{
				kind: "category",
				name: "control logic",
				contents: [
					"start",
					{
						kind: "block",
						type: "repeat",
						inputs:{
							times:{shadow:{
								type:"shadow_number",
								fields:{value:4},
							}}
						}
					},
					"if",
				].map(block)
			},
			{
				kind: "category",
				name: "movement",
				contents: [
					{
						kind: "block",
						type: "move",
						inputs:{
							"dist":{shadow:{
								type: "shadow_number",
								fields:{value:10},
							}}
						}
					},
					{
						kind: "block",
						type: "rotate",
						inputs:{
							angle:{shadow:{
								type: "shadow_number",
								fields:{value:45},
							}}
						}
					},
				].map(block)
			},
			{
				kind: "category",
				name: "literals",
				contents: [
					"const_number",
					"const_bool",
					"const_str",
				].map(block)
			},
			{
				kind: "category",
				name: "math",
				contents: [
					"binary_op_num",
					"binary_op_bool",
					"invert",
				].map(block),
			},
			{
				kind: "category",
				name: "other",
				contents: [
					"_misc_connector",
					"_misc_null",
					"_misc_log",
					"_misc_repr",
					"_misc_exec",
					"lambda0",
					"call0",
				].map(block),
			},
			{
				kind: "category",
				name: "variables",
				contents: [
					"var_set",
					"var_num",
					"var_str",
					"var_bool",
					"var_func",
				].map(block)
			},
		]
	}
}
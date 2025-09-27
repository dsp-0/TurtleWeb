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
	"colour": "#aaaaaa"
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
	"colour": "#aaaaaa"
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
	"colour": "#aaaaaa"
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
	"colour": "#aaaaaa"
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
	"colour": "#aaaaaa"
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
	"colour": "#aaaaaa"
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
	"colour": "#aaaaaa"
	},
	{
		"type": "start",
		"args0": [
			{
				"type": "input_dummy",
				"name": "NAME"
			},
		],
		"nextStatement": null,
		"colour": 120
	},
	{
		"type": "blank",
		"previousStatement": null,
		"nextStatement": null,
		"colour": 120
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
		output: null,
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
		output: null,
		colour: 120,
	},
]

let toolbox;

{
	block = type => (typeof(type)=="string" ? {kind:"block", type:type} : type);

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
					"start"
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
					"const_number"
				].map(block)
			},
		]
	}
}
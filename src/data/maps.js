import { THEMES, LAYERS } from '../constants'

export const overworldMaps = [
	{
		theme: THEMES.TOWN_1,
		location: { x: 0, y: 0 },
		spawn: { x: 2, y: 2 },
		tiles: `
			1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
			1 0 0 0 0 0 0 0 0 0 0 0 0 0 1
			1 0 0 0 0 0 0 0 0 0 0 0 0 0 1
			1 0 0 0 0 0 0 0 0 0 0 0 0 0 1
			1 0 0 0 0 0 0 0 0 0 0 0 0 0 1
			1 0 0 0 0 0 0 0 0 0 0 0 0 0 1
			1 0 0 0 0 0 0 0 0 0 0 0 0 0 1
			1 0 0 0 0 0 0 0 0 0 0 0 0 0 1
			1 0 0 0 0 0 0 0 0 0 0 0 0 0 1
			1 0 0 0 0 0 0 0 0 0 0 0 0 0 1
			1 0 0 0 0 0 0 0 0 0 0 0 0 0 1
			1 0 0 0 0 0 0 0 0 0 0 0 0 0 1
			1 0 0 0 0 0 0 0 0 0 0 0 0 0 1
			1 0 0 0 0 0 0 0 0 0 0 0 0 0 1
			1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
		`,
		objects: `
			0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
			0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
			0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
			0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
			0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
			0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
			0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
			0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
			0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
			0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
			0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
			0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
			0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
			0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
			0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
		`,
		doors: [
			{
				entrance: { x: 2, y: 1 },
				layer: LAYERS.INTERIOR,
				location: { x: 0, y: 0 },
				spawn: { x: 3, y: 4 },
			},
		]
	},
]

export const interiorMaps = [
	// ...
]

export const dungeonMaps = [
	// ...
]

export const maps = [ overworldMaps, interiorMaps, dungeonMaps ]

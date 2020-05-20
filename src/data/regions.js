import { VILLAGE_1 } from '../constants/themes'

export const regions = [
	{ // REGION 1
		world_position: { x: 0, y: 0 },
		chunks: [
			{
				theme: VILLAGE_1,
				chunk_position: { x: 0, y: 0 },
				tiles: {
					sprites: [
						1, 6, 6, 6, 1,
						1, 5, 7, 5, 1,
						1, 8, 0, 0, 0,
						1, 0, 0, 0, 1,
						1, 1, 1, 1, 1
					],
					collision: [ 1, 5, 6, 8 ],
					doors: []
				}
			},
			{
				theme: VILLAGE_1,
				chunk_position: { x: 1, y: 0 },
				tiles: {
					sprites: [
						1, 1, 1, 1, 1,
						1, 0, 0, 0, 1,
						0, 0, 0, 0, 1,
						1, 0, 0, 0, 1,
						1, 1, 0, 1, 1
					],
					collision: [ 1 ],
					doors: []
				}
			},
			{
				theme: VILLAGE_1,
				chunk_position: { x: 2, y: 0 },
				tiles: {
					sprites: [
						1, 1, 1, 1, 1,
						1, 0, 0, 0, 1,
						1, 0, 0, 0, 1,
						1, 0, 0, 0, 1,
						1, 1, 1, 1, 1
					],
					collision: [ 1 ],
					doors: []
				}
			},
			{
				theme: VILLAGE_1,
				chunk_position: { x: 0, y: 1 },
				tiles: {
					sprites: [
						1, 1, 1, 1, 1,
						1, 0, 0, 0, 1,
						1, 0, 0, 0, 1,
						1, 0, 0, 0, 1,
						1, 1, 1, 1, 1
					],
					collision: [ 1 ],
					doors: []
				}
			},
			{
				theme: VILLAGE_1,
				chunk_position: { x: 1, y: 1 },
				tiles: {
					sprites: [
						1, 1, 0, 1, 1,
						1, 0, 0, 0, 0,
						1, 0, 0, 0, 0,
						1, 0, 0, 0, 0,
						1, 1, 1, 1, 1
					],
					collision: [ 1 ],
					doors: []
				}
			},
			{
				theme: VILLAGE_1,
				chunk_position: { x: 2, y: 1 },
				tiles: {
					sprites: [
						0, 0, 1, 1, 1,
						0, 8, 0, 1, 1,
						0, 0, 0, 0, 0,
						0, 0, 0, 0, 0,
						0, 0, 0, 0, 0
					],
					collision: [ 1, 8 ],
					doors: []
				}
			},
			{
				theme: VILLAGE_1,
				chunk_position: { x: 0, y: 2 },
				tiles: {
					sprites: [
						1, 1, 1, 1, 1,
						1, 0, 0, 0, 1,
						1, 0, 0, 0, 1,
						1, 0, 0, 0, 1,
						1, 1, 1, 1, 1
					],
					collision: [ 1 ],
					doors: []
				}
			},
			{
				theme: VILLAGE_1,
				chunk_position: { x: 1, y: 2 },
				tiles: {
					sprites: [
						1, 1, 1, 1, 1,
						1, 0, 0, 0, 1,
						1, 0, 0, 0, 1,
						1, 0, 0, 0, 1,
						1, 1, 1, 1, 1
					],
					collision: [ 1 ],
					doors: []
				}
			},
			{
				theme: VILLAGE_1,
				chunk_position: { x: 2, y: 2 },
				tiles: {
					sprites: [
						1, 1, 1, 1, 1,
						1, 0, 0, 0, 1,
						1, 0, 0, 0, 1,
						1, 0, 0, 0, 1,
						1, 1, 1, 1, 1
					],
					collision: [ 1 ],
					doors: []
				}
			},
		]
	},
	{ // REGION 2
		world_position: { x: 1, y: 0 },
		chunks: [
			{
				theme: VILLAGE_1,
				chunk_position: { x: 0, y: 0 },
				tiles: {
					sprites: [
						1, 1, 1, 1, 1,
						1, 0, 0, 0, 1,
						1, 0, 0, 0, 1,
						1, 0, 0, 0, 1,
						1, 1, 1, 1, 1
					],
					collision: [ 1, 5, 6, 8 ],
					doors: []
				}
			},
			{
				theme: VILLAGE_1,
				chunk_position: { x: 1, y: 0 },
				tiles: {
					sprites: [
						1, 6, 6, 6, 1,
						1, 5, 7, 5, 1,
						1, 8, 0, 0, 0,
						1, 0, 0, 0, 1,
						1, 1, 1, 1, 1
					],
					collision: [ 1 ],
					doors: []
				}
			},
			{
				theme: VILLAGE_1,
				chunk_position: { x: 2, y: 0 },
				tiles: {
					sprites: [
						1, 1, 1, 1, 1,
						0, 0, 8, 0, 1,
						0, 0, 0, 0, 1,
						0, 0, 0, 0, 1,
						1, 1, 0, 1, 1
					],
					collision: [ 1 ],
					doors: []
				}
			},
			{
				theme: VILLAGE_1,
				chunk_position: { x: 0, y: 1 },
				tiles: {
					sprites: [
						1, 1, 1, 1, 1,
						1, 0, 0, 0, 1,
						0, 0, 0, 6, 6,
						0, 1, 0, 5, 7,
						0, 1, 0, 0, 0
					],
					collision: [ 1 ],
					doors: []
				}
			},
			{
				theme: VILLAGE_1,
				chunk_position: { x: 1, y: 1 },
				tiles: {
					sprites: [
						1, 1, 1, 1, 1,
						1, 0, 0, 0, 1,
						6, 6, 6, 0, 1,
						5, 7, 5, 0, 0,
						1, 0, 0, 0, 1
					],
					collision: [ 1 ],
					doors: []
				}
			},
			{
				theme: VILLAGE_1,
				chunk_position: { x: 2, y: 1 },
				tiles: {
					sprites: [
						1, 1, 0, 1, 1,
						1, 0, 0, 8, 1,
						1, 0, 1, 1, 1,
						0, 0, 1, 1, 1,
						1, 1, 1, 1, 1
					],
					collision: [ 1 ],
					doors: []
				}
			},
			{
				theme: VILLAGE_1,
				chunk_position: { x: 0, y: 2 },
				tiles: {
					sprites: [
						1, 1, 1, 1, 1,
						1, 0, 0, 0, 1,
						1, 0, 0, 0, 1,
						1, 0, 0, 0, 1,
						1, 1, 1, 1, 1
					],
					collision: [ 1 ],
					doors: []
				}
			},
			{
				theme: VILLAGE_1,
				chunk_position: { x: 1, y: 2 },
				tiles: {
					sprites: [
						1, 1, 1, 1, 1,
						1, 0, 0, 0, 1,
						1, 0, 0, 0, 1,
						1, 0, 0, 0, 1,
						1, 1, 1, 1, 1
					],
					collision: [ 1 ],
					doors: []
				}
			},
			{
				theme: VILLAGE_1,
				chunk_position: { x: 2, y: 2 },
				tiles: {
					sprites: [
						1, 1, 1, 1, 1,
						1, 0, 0, 0, 1,
						1, 0, 0, 0, 1,
						1, 0, 0, 0, 1,
						1, 1, 1, 1, 1
					],
					collision: [ 1 ],
					doors: []
				}
			},
		]
	},
	
]
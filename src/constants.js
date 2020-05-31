export const SIZE_BLOCK = 80 // px
export const SIZE_INTERFACE = 4 * SIZE_BLOCK // px
export const SIZE_WORLD = 3 * SIZE_BLOCK // px
export const SIZE_MAP = 15 // 15x15 tiles
export const SIZE_TILE = SIZE_WORLD / SIZE_MAP // px
export const SIZE_SPRITESHEET = 9

export const PLAYER_SPEED = 300 // ms

export const SOUTH = 0 // based on character facing in spritesheet
export const EAST = 1
export const WEST = 2
export const NORTH = 3

export const SPRITESHEET_KEY = '0123456789abcdefghijklmnopqrstuvqxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!?@£$€%^&*#[]{}()<>'
export const BLANK_TILE_STR = '000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
export const BLANK_ENTITY_STR = '.................................................................................................................................................................................................................................'

export const MAP_TYPES = { OVERWORLD: 0, INTERIOR: 1, DUNGEON: 2 }

export const LAYERS = {
	OVERWORLD: 0,
	INTERIOR: 1,
	DUNGEON: 2,
}

export const THEMES = {
	TOWN_1: 0,
	HOUSE_1: 1,
	FOREST_1: 2,
	DUNGEON_1: 3,
}

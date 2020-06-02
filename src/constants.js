export const SIZES = {
	BLOCK: 80, // px
	INTERFACE: 4 * 80, // px
	WORLD: 3 * 80, // px
	MAP: 15, // 15x15 tiles
	TILE: 16, // px
	SPRITESHEET: 9
}

export const TYPES = {
	TILE: 0,
	ENTITY: 1,
	COLLISION: 2,
	TRIGGER: 3,
	OVERWORLD: 4,
	INTERIOR: 5,
	DUNGEON: 6,
}

export const DIRECTIONS = { // based on character facing in spritesheet
	NORTH: 3,
	EAST: 1,
	SOUTH: 0,
	WEST: 2,
}

export const THEMES = {
	TOWN_1: 0,
	HOUSE_1: 1,
	FOREST_1: 2,
	DUNGEON_1: 3,
}

export const SPEEDS = { // s
	WALK: 0.3,
	TRAVEL: 1.5,
}

export const SPRITESHEET_KEY = '0123456789abcdefghijklmnopqrstuvqxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!?@£$€%^&*#[]{}()<>'
export const BLANK_TILE_STR = '000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
export const BLANK_ENTITY_STR = '.................................................................................................................................................................................................................................'

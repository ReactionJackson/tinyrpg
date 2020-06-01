import { SIZES, SPRITESHEET_KEY } from '../constants'

export const convertCharToCoords = char => {
	const index = SPRITESHEET_KEY.indexOf(char)
	const x = index % SIZES.SPRITESHEET
	const y = (index - x) / SIZES.SPRITESHEET
	return { x, y }
}

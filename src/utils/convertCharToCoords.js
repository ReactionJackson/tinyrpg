import { SPRITESHEET_KEY, SIZE_SPRITESHEET } from '../constants'
export const convertCharToCoords = char => {
	const index = SPRITESHEET_KEY.indexOf(char)
	const x = index % SIZE_SPRITESHEET
	const y = (index - x) / SIZE_SPRITESHEET
	return { x, y }
}

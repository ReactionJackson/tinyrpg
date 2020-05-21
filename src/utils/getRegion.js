import { regions } from '../data/regions'

export const getRegion = ({ x = 0, y = 0 }) => {
	return regions.find(({ worldPosition }) => x === worldPosition.x && y === worldPosition.y)
}
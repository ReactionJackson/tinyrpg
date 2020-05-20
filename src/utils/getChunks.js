import { regions } from '../data/regions'

export const getChunks = ({ x = 0, y = 0 }) => {
	return regions.find(({ world_position }) => x === world_position.x && y === world_position.y)
}
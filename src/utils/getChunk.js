export const getChunk = ({ chunks, x = 0, y = 0 }) => {
	return chunks.find(({ chunkPosition }) => x === chunkPosition.x && y === chunkPosition.y)
}

export const hasCoordsInList = ({ x, y }, list) => (
	list.find(item => item.x === x && item.y === y)
)

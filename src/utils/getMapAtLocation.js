import { TYPES } from '../constants'
import { overworldMaps, interiorMaps, dungeonMaps } from '../data/maps'
export const getMapAtLocation = ({ x, y }, mapType) => {
  let maps = []
  switch(mapType) {
    case TYPES.OVERWORLD: maps = overworldMaps; break
    case TYPES.INTERIOR: maps = interiorMaps; break
    case TYPES.DUNGOEN: maps = dungeonMaps; break
  }
  return maps.find(m => m.location.x === x && m.location.y === y)
}

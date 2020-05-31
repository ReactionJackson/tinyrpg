import { MAP_TYPES } from '../constants'
import { overworldMaps, interiorMaps, dungeonMaps } from '../data/maps'
export const getMapAtLocation = ({ x, y }, mapType) => {
  let maps = []
  switch(mapType) {
    case MAP_TYPES.OVERWORLD: maps = overworldMaps; break
    case MAP_TYPES.INTERIOR: maps = interiorMaps; break
    case MAP_TYPES.DUNGOEN: maps = dungeonMaps; break
  }
  return maps.find(m => m.location.x === x && m.location.y === y)
}

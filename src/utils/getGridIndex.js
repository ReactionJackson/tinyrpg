import { SIZE_SPRITESHEET } from '../constants'
export const getGridIndex = ({ x, y }, size) => (y * size) + x

import React, { useEffect } from 'react'
import { SIZE_TILE } from '../constants'

const Character = ({ pos, flip = false }) => {
  // ...
  return (
    <div style={{
      zIndex: 10,
      position: 'absolute',
      left: pos.x * SIZE_TILE,
      top: pos.y * SIZE_TILE,
      width: SIZE_TILE,
      height: SIZE_TILE,
      background: `url(${ require('../assets/sprites/guy-4.png') }) center no-repeat`,
      backgroundSize: 'cover',
      transform: `rotateY(${ flip ? 180 : 0 }deg)`,
      pointerEvents: 'none'
    }} />
  )
}

export default Character

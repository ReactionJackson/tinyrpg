import React from 'react'
import { tileSize } from '../constants/settings'

const Character = ({ pos, flip = false }) => {
  // ...
  return (
    <div style={{
      zIndex: 10,
      position: 'absolute',
      left: pos.x * tileSize,
      top: pos.y * tileSize,
      width: tileSize,
      height: tileSize,
      background: `url(${ require('../assets/sprites/guy-4.png') }) center no-repeat`,
      backgroundSize: 'cover',
      transform: `rotateY(${ flip ? 180 : 0 }deg)`
    }} />
  )
}

export default Character
import React, { useState, useEffect } from 'react'
import { SIZE_TILE, SIZE_MAP } from '../constants'
import { useListener } from '../hooks/useListener'
import { useLog } from '../hooks/useLog'

const isWalkable = (target, collisionData) => (
  !collisionData.find(({ x, y }) => x === target.x && y === target.y)
)

const Player = ({ collisionData }) => {

  const [ pos, setPos ] = useState({ x: 0, y: 0 })
  const [ flip, setFlip ] = useState(false)

  useListener('keyup', ({ code }) => {

    let newPos = pos

    switch(code) {
      case 'KeyW': // North
        if(newPos.y === 0) {
          newPos.y = SIZE_MAP - 1
        } else if(isWalkable({ x: pos.x, y: pos.y - 1 }, collisionData)) {
          newPos.y--
        }
        break
      case 'KeyD': // East
        if(newPos.x === SIZE_MAP - 1) {
          newPos.x = 0
        } else if(isWalkable({ x: pos.x + 1, y: pos.y }, collisionData)) {
          newPos.x++
        }
        setFlip(false)
        break
      case 'KeyS': // South
        if(newPos.y === SIZE_MAP - 1) {
          newPos.y = 0
        } else if(isWalkable({ x: pos.x, y: pos.y + 1 }, collisionData)) {
          newPos.y++
        }
        break
      case 'KeyA': // West
        if(newPos.x === 0) {
          newPos.x = SIZE_MAP - 1
        } else if(isWalkable({ x: pos.x - 1, y: pos.y }, collisionData)) {
          newPos.x--
        }
        setFlip(true)
        break
    }

    setPos({ ...newPos })

  }, [])

  // useEffect(() => console.log(pos), [ pos ])

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

export default Player
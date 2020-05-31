import React, { useState, useEffect } from 'react'
import { SIZE_TILE, SIZE_MAP, NORTH, EAST, SOUTH, WEST, PLAYER_SPEED } from '../constants'
import { useListener } from '../hooks/useListener'
import { Sprite } from './Sprite'

/*
  Need to see if I can improve the walking so you can't
  shift directions and such when pressing keys in a
  specific way
*/

let walkTimeout = null

const Player = ({ doScreenTransition, collisionData }) => {

  const [ pos, setPos ] = useState({ x: 0, y: 0, facing: SOUTH })
  const [ isWalking, setIsWalking ] = useState(false)
  const [ isAnimating, setIsAnimating ] = useState(false)

  const isWalkable = target => (
    !collisionData.find(({ x, y }) => x === target.x && y === target.y)
  )

  const doWalk = code => {

    let newPos = pos

    switch(code) {
      case 'KeyW': // North
        newPos.facing = NORTH
        if(newPos.y === 0) {
          newPos.y = SIZE_MAP - 1
          doScreenTransition(NORTH)
        } else if(isWalkable({ x: pos.x, y: pos.y - 1 })) {
          newPos.y--
        }
        break
      case 'KeyD': // East
        newPos.facing = EAST
        if(newPos.x === SIZE_MAP - 1) {
          newPos.x = 0
          doScreenTransition(EAST)
        } else if(isWalkable({ x: pos.x + 1, y: pos.y })) {
          newPos.x++
        }
        break
      case 'KeyS': // South
        newPos.facing = SOUTH
        if(newPos.y === SIZE_MAP - 1) {
          newPos.y = 0
          doScreenTransition(SOUTH)
        } else if(isWalkable({ x: pos.x, y: pos.y + 1 })) {
          newPos.y++
        }
        break
      case 'KeyA': // West
        newPos.facing = WEST
        if(newPos.x === 0) {
          newPos.x = SIZE_MAP - 1
          doScreenTransition(WEST)
        } else if(isWalkable({ x: pos.x - 1, y: pos.y })) {
          newPos.x--
        }
        break
    }

    setTimeout(() => setIsAnimating(false), PLAYER_SPEED)

    setPos({ ...newPos })
  }

  useListener('keydown', ({ repeat, code }) => {
    if(repeat) return false
    if(!isWalking && !isAnimating) {
      setIsWalking(code)
      setIsAnimating(true)
    }
  }, [])

  useListener('keyup', () => {
    setIsWalking(false)
  }, [])

  useEffect(() => {
    if(isWalking) {
      doWalk(isWalking)
      walkTimeout = setInterval(() => {
        switch(pos.facing) {
          case NORTH: return doWalk('KeyW')
          case EAST: return doWalk('KeyD')
          case SOUTH: return doWalk('KeyS')
          case WEST: return doWalk('KeyA')
        }
      }, PLAYER_SPEED)
    } else {
      clearInterval(walkTimeout)
    }
  }, [ isWalking ])

  return (
    <Sprite
      id="00"
      type="character"
      x={ 0 }
      y={ pos.facing } // facing based on spritesheet rows
      size={ 256 }
      style={{
        zIndex: 10,
        position: 'absolute',
        left: pos.x * SIZE_TILE,
        top: pos.y * SIZE_TILE,
        pointerEvents: 'none',
        backgroundColor: 'rgba(255, 0, 255, 0.4)',
        outline: 'none'
      }}
    />
  )
}

export default Player

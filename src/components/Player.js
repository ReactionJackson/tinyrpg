import React, { useState, useEffect } from 'react'
import { SIZES, DIRECTIONS, SPEEDS } from '../constants'
import { useListener } from '../hooks/useListener'
import { Sprite } from './Sprite'

/*
  Need to see if I can improve the walking so you can't
  shift directions and such when pressing keys in a
  specific way
*/

let walkTimeout = null

const Player = ({ doScreenTransition, collisionData }) => {

  const [ pos, setPos ] = useState({ x: 0, y: 0, facing: DIRECTIONS.SOUTH })
  const [ isWalking, setIsWalking ] = useState(false)
  const [ isAnimating, setIsAnimating ] = useState(false)

  const isWalkable = target => (
    !collisionData.find(({ x, y }) => x === target.x && y === target.y)
  )

  const doWalk = code => {

    let newPos = pos

    switch(code) {
      case 'KeyW': // North
        newPos.facing = DIRECTIONS.NORTH
        if(newPos.y === 0) {
          newPos.y = SIZES.MAP - 1
          doScreenTransition(DIRECTIONS.NORTH)
        } else if(isWalkable({ x: pos.x, y: pos.y - 1 })) {
          newPos.y--
        }
        break
      case 'KeyD': // East
        newPos.facing = DIRECTIONS.EAST
        if(newPos.x === SIZES.MAP - 1) {
          newPos.x = 0
          doScreenTransition(DIRECTIONS.EAST)
        } else if(isWalkable({ x: pos.x + 1, y: pos.y })) {
          newPos.x++
        }
        break
      case 'KeyS': // South
        newPos.facing = DIRECTIONS.SOUTH
        if(newPos.y === SIZES.MAP - 1) {
          newPos.y = 0
          doScreenTransition(DIRECTIONS.SOUTH)
        } else if(isWalkable({ x: pos.x, y: pos.y + 1 })) {
          newPos.y++
        }
        break
      case 'KeyA': // West
        newPos.facing = DIRECTIONS.WEST
        if(newPos.x === 0) {
          newPos.x = SIZES.MAP - 1
          doScreenTransition(DIRECTIONS.WEST)
        } else if(isWalkable({ x: pos.x - 1, y: pos.y })) {
          newPos.x--
        }
        break
    }

    setTimeout(() => setIsAnimating(false), SPEEDS.PLAYER)

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
          case DIRECTIONS.NORTH: return doWalk('KeyW')
          case DIRECTIONS.EAST: return doWalk('KeyD')
          case DIRECTIONS.SOUTH: return doWalk('KeyS')
          case DIRECTIONS.WEST: return doWalk('KeyA')
        }
      }, SPEEDS.PLAYER)
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
        left: pos.x * SIZES.TILE,
        top: pos.y * SIZES.TILE,
        pointerEvents: 'none',
        backgroundColor: 'rgba(255, 0, 255, 0.4)',
        outline: 'none'
      }}
    />
  )
}

export default Player

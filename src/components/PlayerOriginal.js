import React, { useState, useEffect } from 'react'
import { SIZES, DIRECTIONS, SPEEDS } from '../constants'
import { useListener } from '../hooks/useListener'
import { Sprite } from './Sprite'

let walkTimeout = null

const PlayerOriginal = ({ doTravel, collisionData }) => {

  const [ pos, setPos ] = useState({ x: 0, y: 0, facing: DIRECTIONS.SOUTH })
  const [ speed, setSpeed ] = useState(SPEEDS.WALK)
  const [ isWalking, setIsWalking ] = useState(false)
  const [ isAnimating, setIsAnimating ] = useState(false)

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
    if(isWalking && speed !== SPEEDS.TRAVEL) {
      doWalk(isWalking)
      walkTimeout = setInterval(() => {
        switch(pos.facing) {
          case DIRECTIONS.NORTH: return doWalk('KeyW')
          case DIRECTIONS.EAST: return doWalk('KeyD')
          case DIRECTIONS.SOUTH: return doWalk('KeyS')
          case DIRECTIONS.WEST: return doWalk('KeyA')
        }
      }, SPEEDS.WALK)
    } else {
      clearInterval(walkTimeout)
    }
  }, [ isWalking ])

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
          setSpeed(SPEEDS.TRAVEL)
          doTravel(DIRECTIONS.NORTH)
          setTimeout(() => setSpeed(SPEEDS.WALK), SPEEDS.TRAVEL)
        } else if(isWalkable({ x: pos.x, y: pos.y - 1 })) {
          setSpeed(SPEEDS.WALK)
          newPos.y--
        }
        break
      case 'KeyD': // East
        newPos.facing = DIRECTIONS.EAST
        if(newPos.x === SIZES.MAP - 1) {
          newPos.x = 0
          setSpeed(SPEEDS.TRAVEL)
          doTravel(DIRECTIONS.EAST)
          setTimeout(() => setSpeed(SPEEDS.WALK), SPEEDS.TRAVEL)
        } else if(isWalkable({ x: pos.x + 1, y: pos.y })) {
          setSpeed(SPEEDS.WALK)
          newPos.x++
        }
        break
      case 'KeyS': // South
        newPos.facing = DIRECTIONS.SOUTH
        if(newPos.y === SIZES.MAP - 1) {
          newPos.y = 0
          setSpeed(SPEEDS.TRAVEL)
          doTravel(DIRECTIONS.SOUTH)
          setTimeout(() => setSpeed(SPEEDS.WALK), SPEEDS.TRAVEL)
        } else if(isWalkable({ x: pos.x, y: pos.y + 1 })) {
          setSpeed(SPEEDS.WALK)
          newPos.y++
        }
        break
      case 'KeyA': // West
        newPos.facing = DIRECTIONS.WEST
        if(newPos.x === 0) {
          newPos.x = SIZES.MAP - 1
          setSpeed(SPEEDS.TRAVEL)
          doTravel(DIRECTIONS.WEST)
          setTimeout(() => setSpeed(SPEEDS.WALK), SPEEDS.TRAVEL)
        } else if(isWalkable({ x: pos.x - 1, y: pos.y })) {
          setSpeed(SPEEDS.WALK)
          newPos.x--
        }
        break
    }

    setTimeout(() => setIsAnimating(false), SPEEDS.PLAYER)

    setPos({ ...newPos })
  }

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
        outline: 'none',
        transition: `left linear ${ speed }ms, top linear ${ speed }ms`
      }}
    />
  )
}

export default PlayerOriginal

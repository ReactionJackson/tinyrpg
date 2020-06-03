import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import { SIZES, SPEEDS, DIRECTIONS } from '../constants'
import { useListener } from '../hooks/useListener'
import { getDirectionMod } from '../utils/getDirectionMod'
import { Sprite } from './Sprite'

let isAnimating = false
let isWalking = false
let currentDirection = DIRECTIONS.SOUTH

const Player = ({ doTravel, isTravelling, collisionData }) => {

	const [ positions, setPositions ] = useState([
    { x: 0, y: 0, facing: DIRECTIONS.SOUTH },
    { x: 0, y: 0, facing: DIRECTIONS.SOUTH },
    { x: 0, y: 0, facing: DIRECTIONS.SOUTH },
  ])

 useListener('keydown', ({ repeat, code: key }) => {
    if(repeat) return false
    if(!isWalking && !isAnimating) {
      isWalking = true
      currentDirection = key
      doWalk(currentDirection)
    }
  }, [])

  useListener('keyup', () => {
  	isWalking = false
  }, [])

  const isWalkable = target => (
    !collisionData.find(({ x, y }) => x === target.x && y === target.y)
  )

  const doWalk = key => {

    let newPos = { ...positions[0] }

    switch(key) {
      case 'KeyW':
        newPos.facing = DIRECTIONS.NORTH
        if(newPos.y === 0) {
          newPos.y = SIZES.MAP - 1
          doTravel(DIRECTIONS.NORTH)
        } else if(isWalkable({ x: newPos.x, y: newPos.y - 1 })) {
          newPos.y--
        }
        break
      case 'KeyD':
        newPos.facing = DIRECTIONS.EAST
        if(newPos.x === SIZES.MAP - 1) {
          newPos.x = 0
          doTravel(DIRECTIONS.EAST)
        } else if(isWalkable({ x: newPos.x + 1, y: newPos.y })) {
          newPos.x++
        }
        break
      case 'KeyS':
        newPos.facing = DIRECTIONS.SOUTH
        if(newPos.y === SIZES.MAP - 1) {
          newPos.y = 0
          doTravel(DIRECTIONS.SOUTH)
        } else if(isWalkable({ x: newPos.x, y: newPos.y + 1 })) {
          newPos.y++
        }
        break
      case 'KeyA':
        newPos.facing = DIRECTIONS.WEST
        if(newPos.x === 0) {
          newPos.x = SIZES.MAP - 1
          doTravel(DIRECTIONS.WEST)
        } else if(isWalkable({ x: newPos.x - 1, y: newPos.y })) {
          newPos.x--
        }
        break
    }

    let rest = [ ...positions ]
    rest.pop()
		
    if(!isWalkable(newPos)) {
      setPositions([ { facing: newPos.facing, ...positions[0] }, ...rest ])
      isWalking = false
    } else {
      setPositions([ { ...newPos }, ...rest ])
    }
  }

  const onUpdateWalk = ({ x, y }) => isAnimating = true

  const onFinishWalk = () => {
    isAnimating = false
    const mod = getDirectionMod(currentDirection)
  	if(isWalking && isWalkable({ x: positions[0].x + mod.x, y: positions[0].y + mod.y })) {
      doWalk(currentDirection)
      isAnimating = true
    }
  }

  return (
    <>
    {
      [...Array(positions.length)].map((_, i) => {
        const { x, y, facing } = positions[i]
        return (
          <motion.div
            initial={{
              x: x * SIZES.TILE,
              y: y * SIZES.TILE
            }}
            animate={{
              x: x * SIZES.TILE,
              y: y * SIZES.TILE
            }}
            onUpdate={ onUpdateWalk }
            onAnimationComplete={ onFinishWalk }
            transition={{ duration: isTravelling ? SPEEDS.TRAVEL : SPEEDS.WALK, ease: 'linear' }}
            style={{ zIndex: 10, position: 'absolute', left: 0, top: 0 }}
          >
            <Character x={ 0 } y={ facing } />
          </motion.div>
        )
      })
    }
    </>
  )
}

const Character = styled.div`
  pointer-events: none;
	width: ${ SIZES.TILE }px;
	height: ${ SIZES.TILE }px;
	${ ({ x, y }) => `
		background-image: url(${ require(`../assets/sprites/character_00.png`) });
		background-size: 256px auto;
		background-position: left ${ x * -SIZES.TILE }px top ${ y * -SIZES.TILE }px;
		background-color: rgba(255, 0, 255, 0.4);
	`}
`

export default Player

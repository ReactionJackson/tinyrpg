import React, { useState, useEffect, Fragment } from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import { SIZES, SPEEDS, DIRECTIONS } from '../constants'
import { useListener } from '../hooks/useListener'
import { getDirectionMod } from '../utils/getDirectionMod'
import { Sprite } from './Sprite'

const Player = ({ doTravel, collisionData }) => {

	const partySize = 1
	const [ isTravelling, setIsTravelling ] = useState(false)
	const [ isWalking, setIsWalking ] = useState(false)
	const [ isAnimating, setIsAnimating ] = useState(false)
	const [ positions, setPositions ] = useState([...Array(partySize)].map(_ => ({ x: 0, y: 0, facing: DIRECTIONS.SOUTH })))

 useListener('keydown', ({ repeat, code }) => {
    if(repeat) return false
    if(!isWalking && !isAnimating) {
      setIsWalking(code)
    }
  }, [])

  useListener('keyup', () => {
  	setIsWalking(false)
  }, [])

  useEffect(() => {
    if(isWalking) {
    	setIsAnimating(true)
      doWalk(isWalking)
    } else {
    	setIsAnimating(false)
    }
  }, [ isWalking ])

  useEffect(() => {
    console.log('isWalking:', isWalking)
    console.log('isAnimating:', isAnimating)
  }, [ isWalking, isAnimating ])


  const isWalkable = target => (
    !collisionData.find(({ x, y }) => x === target.x && y === target.y)
  )

  const doWalk = code => {

  	let positionsClone = [ ...positions ]
    let newPositions = positionsClone.filter((pos, i) => i < partySize ? pos : false)
    let newPos = { ...newPositions[0] }

    switch(code) {
      case 'KeyW':
        newPos.facing = DIRECTIONS.NORTH
        if(newPos.y === 0) {
          newPos.y = SIZES.MAP - 1
          doTravel(DIRECTIONS.NORTH)
          setIsTravelling(true)
        } else if(isWalkable({ x: newPos.x, y: newPos.y - 1 })) {
          newPos.y--
        }
        break
      case 'KeyD':
        newPos.facing = DIRECTIONS.EAST
        if(newPos.x === SIZES.MAP - 1) {
          newPos.x = 0
          doTravel(DIRECTIONS.EAST)
          setIsTravelling(true)
        } else if(isWalkable({ x: newPos.x + 1, y: newPos.y })) {
          newPos.x++
        }
        break
      case 'KeyS':
        newPos.facing = DIRECTIONS.SOUTH
        if(newPos.y === SIZES.MAP - 1) {
          newPos.y = 0
          doTravel(DIRECTIONS.SOUTH)
          setIsTravelling(true)
        } else if(isWalkable({ x: newPos.x, y: newPos.y + 1 })) {
          newPos.y++
        }
        break
      case 'KeyA':
        newPos.facing = DIRECTIONS.WEST
        if(newPos.x === 0) {
          newPos.x = SIZES.MAP - 1
          doTravel(DIRECTIONS.WEST)
          setIsTravelling(true)
        } else if(isWalkable({ x: newPos.x - 1, y: newPos.y })) {
          newPos.x--
        }
        break
    }

    if(newPos.x === positions[0].x && newPos.y === positions[0].y) {
    	newPositions[0].facing = newPos.facing
    	setPositions([ ...newPositions ])
    } else {
			setPositions([ { ...newPos }, ...newPositions ])
    }
  }

  const onFinishWalk = () => {
  	console.log('onFinishWalk()')
  	if(isTravelling) {
  		setIsTravelling(false)
  	}
  	if(isWalking) {
  		doWalk(isWalking)
  	} else {
  		setIsAnimating(false)
  	}
  }

  return (
	  <Fragment>
			{ [...Array(partySize)].map((_, i) => {
				const { x, y, facing } = positions[i]
				return (
			  	<motion.div
			  		initial={{
			  			x: x - 1 * SIZES.TILE,
			  			y: y - 1 * SIZES.TILE
			  		}}
			  		animate={{
			  			x: x * SIZES.TILE,
			  			y: y * SIZES.TILE
			  		}}
			  		onAnimationComplete={ onFinishWalk }
			  		transition={{ duration: isTravelling ? SPEEDS.TRAVEL : SPEEDS.WALK, ease: 'linear' }}
			  		style={{ zIndex: 10, position: 'absolute', left: 0, top: 0 }}
			  	>
						<Character x={ 0 } y={ facing } />
			    </motion.div>
			   )
		  })}
	  </Fragment>
  )
}

const Character = styled.div`
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

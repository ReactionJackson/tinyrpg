import React, { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import styled from 'styled-components'
import { SIZES, SPEEDS, TYPES, DIRECTIONS } from '../constants'
import { useListener } from '../hooks/useListener'
import { getMapAtLocation } from '../utils/getMapAtLocation'
import { Panel } from './Panel'
import LevelEditor from './LevelEditor'
import Screen from './Screen'
import Player from './Player'
import PlayerOriginal from './PlayerOriginal'

const { NORTH, EAST, SOUTH, WEST } = DIRECTIONS

const World = () => {

	const [ mapId, setMapId ] = useState(0)
	const [ worldPos, setWorldPos ] = useState({ x: 0, y: 0 })
	const [ mapData, setMapData ] = useState(getMapAtLocation(worldPos, TYPES.OVERWORLD))
	const [ isTravelling, setIsTravelling ] = useState(false)
	const [ direction, setDirection ] = useState(false)

	const doTravel = direction => {
		let { x, y } = worldPos
		switch(direction) {
			case NORTH: y--; break
			case EAST: x++; break
			case SOUTH: y++; break
			case WEST: x--; break
		}
		setMapId(mapId + 1)
		setWorldPos({ x, y })
		setMapData(getMapAtLocation({ x, y }, TYPES.OVERWORLD))
		setDirection(direction)
		setIsTravelling(true)
	}

	const onFinishTravelling = () => {
		setIsTravelling(false)
	}

	const rule = `translate${ direction === NORTH || direction === SOUTH ? 'Y' : 'X'}`
	const mod = direction === NORTH || direction === WEST ? -1 : 1

	return (
		<Panel width={ 3 } height={ 3 } x={ 1 } y={ 0 }>
			<AnimatePresence initial={ false }>
				<motion.div
					key={ mapId }
					transition={{ duration: SPEEDS.TRAVEL, ease: 'linear' }}
					initial={{ [rule]: `${ 100 * (mod * -1) }%` }}
					animate={{ [rule]: `0%` }}
					exit={{ [rule]: `${ 100 * mod }%` }}
					style={{ position: 'absolute' }}
					onAnimationComplete={ onFinishTravelling }
				>
			    <Screen mapData={ mapData } />
			  </motion.div>
			  <Player
			  	doTravel={ doTravel }
			  	isTravelling={ isTravelling }
			  	collisionData={ mapData.collision }
			  />
	  	</AnimatePresence>
		</Panel>
	)
}

export default World

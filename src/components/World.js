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

const World = () => {

	const [ mapId, setMapId ] = useState(0)
	const [ worldPos, setWorldPos ] = useState({ x: 0, y: 0 })
	const [ mapData, setMapData ] = useState(getMapAtLocation(worldPos, TYPES.OVERWORLD))
	const [ isTravelling, setIsTravelling ] = useState(false)

	const doTravel = direction => {
		let { x, y } = worldPos
		switch(direction) {
			case DIRECTIONS.NORTH: y--; break
			case DIRECTIONS.EAST: x++; break
			case DIRECTIONS.SOUTH: y++; break
			case DIRECTIONS.WEST: x--; break
		}
		setMapId(mapId + 1)
		setWorldPos({ x, y })
		setMapData(getMapAtLocation({ x, y }, TYPES.OVERWORLD))
		setIsTravelling(true)
	}

	const onFinishTravelling = () => {
		setIsTravelling(false)
	}

	return (
		<Panel width={ 3 } height={ 3 } x={ 1 } y={ 0 }>
			<AnimatePresence initial={ false }>
				<motion.div
					key={ mapId }
					transition={{ duration: SPEEDS.TRAVEL, ease: 'linear' }}
					initial={{ x: `${ 100 * ((mapId % 2) - 1 === 0 ? -1 : 1) }%` }}
					animate={{ x: `0%` }}
					exit={{ x: `${ 100 * ((mapId % 2) - 1 === 0 ? -1 : 1) }%` }}
					onAnimationComplete={ onFinishTravelling }
					style={{ position: 'absolute' }}
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

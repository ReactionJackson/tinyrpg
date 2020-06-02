import React, { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import styled from 'styled-components'
import { SIZES, TYPES, DIRECTIONS } from '../constants'
import { useListener } from '../hooks/useListener'
import { getMapAtLocation } from '../utils/getMapAtLocation'
import { Panel } from './Panel'
import LevelEditor from './LevelEditor'
import Screen from './Screen'
import Player from './Player'

const World = () => {

	const [ worldPos, setWorldPos ] = useState({ x: 0, y: 0 })
	const [ mapData, setMapData ] = useState(getMapAtLocation(worldPos, TYPES.OVERWORLD))
	const [ mapId, setMapId ] = useState(0)

	useListener('keyup', ({ code }) => {
		if(code === 'KeyT') {
			setMapId(mapId + 1)
			setMapData(getMapAtLocation({ x: mapData.location.x === 0 ? -1 : 0, y: 0 }, TYPES.OVERWORLD))
		}
	}, [])

	const doScreenTransition = direction => {
		console.clear()
		console.log(`doScreenTransition(${ direction })`)
		// let { x, y } = screenPos
		// switch(direction) {
		// 	case NORTH: y--; break
		// 	case EAST: x++; break
		// 	case SOUTH: y++; break
		// 	case WEST: x--; break
		// }
		// setScreenPos({ x, y })
	}

	// useEffect(() => {
	// 	setMapData(getMapAtLocation(screenPos, MAP_TYPES.OVERWORLD))
	// }, [ screenPos ])

	// useEffect(() => {
	// 	setTileData(mapData.tiles)
	// 	setEntityData(mapData.entities)
	// 	setCollisionData(mapData.collision)
	// }, [ mapData ])

	return (
		<Panel width={ 3 } height={ 3 } x={ 1 } y={ 0 }>
			<AnimatePresence initial={ false }>
		    <Screen mapId={ mapId } mapData={ mapData } />
		    <Player
		    	doScreenTransition={ direction => doScreenTransition(direction) }
		    	collisionData={ mapData.collision }
		    />
	  	</AnimatePresence>
		</Panel>
	)
}

const Screens = styled.div`
	position: relative;
	width: ${ SIZES.WORLD * 3 }px;

`

export default World

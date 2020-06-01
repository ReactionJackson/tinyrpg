import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { SIZES, DIRECTIONS } from '../constants'
import { Panel } from './Panel'
import LevelEditor from './LevelEditor'
import Screen from './Screen'
import Player from './Player'

const World = () => {

	const [ worldPos, setWorldPos ] = useState({ x: 0, y: 0 })

	// World Traversal Stuff:

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
			<Screens>
		    {/*<Player
		    	doScreenTransition={ direction => doScreenTransition(direction) }
		    	collisionData={ collisionData }
		    />*/}
		    <Screen />
			</Screens>
		</Panel>
	)
}

const Screens = styled.div`
	position: relative;
	width: ${ SIZES.WORLD * 3 }px;

`

export default World

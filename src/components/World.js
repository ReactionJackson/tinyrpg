import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import {
	SIZE_MAP,
	SIZE_TILE,
	SIZE_SPRITESHEET,
	SPRITESHEET_KEY,
	MAP_TYPES,
	NORTH,
	EAST,
	SOUTH,
	WEST
} from '../constants'
import { replaceAt } from '../utils/replaceAt'
import { getGridIndex } from '../utils/getGridIndex'
import { convertCharToCoords } from '../utils/convertCharToCoords'
import { getMapAtLocation } from '../utils/getMapAtLocation'
import { hasCoordsInList } from '../utils/hasCoordsInList'
import { copyToClipboard } from '../utils/copyToClipboard'
import { useListener } from '../hooks/useListener'
import { overworldMaps } from '../data/maps'
import { Panel } from './Panel'
import { Sprite } from './Sprite'
import Player from './Player'
import SpriteSheets from './SpriteSheets'

const ADD_COLLISION = -1, REMOVE_COLLISION = -2
const TYPE_TILE = 0, TYPE_ENTITY = 1

const World = () => {

	const [ screenPos, setScreenPos ] = useState({ x: 0, y: 0 })
	const [ mapData, setMapData ] = useState(getMapAtLocation(screenPos, MAP_TYPES.OVERWORLD))
	const [ tileData, setTileData ] = useState(mapData.tiles)
	const [ entityData, setEntityData ] = useState(mapData.entities)
	const [ collisionData, setCollisionData ] = useState(mapData.collision)
	const [ triggerData, setTriggerData ] = useState([]) // a 2d array of groups of coords?

	const [ tileSheet, setTileSheet ] = useState('01')
	const [ entitySheet, setEntitySheet ] = useState('01')

	const [ tilePos, setTilePos ] = useState({ x: 0, y: 0 })
	const [ entityPos, setEntityPos ] = useState({ x: 0, y: 0 })

	const [ paintType, setPaintType ] = useState(TYPE_ENTITY)
	const [ isPainting, setIsPainting ] = useState(false)
	const [ isErasing, setIsErasing ] = useState(false)
	
	useEffect(() => setTimeout(() => {
		console.clear()
	}, 300), [])

	// World Traversal Stuff:

	const doScreenTransition = direction => {
		console.clear()
		console.log(`doScreenTransition(${ direction })`)
		let { x, y } = screenPos
		switch(direction) {
			case NORTH: y--; break
			case EAST: x++; break
			case SOUTH: y++; break
			case WEST: x--; break
		}
		setScreenPos({ x, y })
	}

	useEffect(() => {
		setMapData(getMapAtLocation(screenPos, MAP_TYPES.OVERWORLD))
	}, [ screenPos ])

	useEffect(() => {
		setTileData(mapData.tiles)
		setEntityData(mapData.entities)
		setCollisionData(mapData.collision)
	}, [ mapData ])

	// Level Editor Stuff:

	const saveMapData = () => {
		let data = ''
		data += `\t\ttiles: ${ JSON.stringify(tileData) },`
		data += `\n\t\tentities: ${ JSON.stringify(entityData) },`
		data += `\n\t\tcollision: ${ JSON.stringify(collisionData) },`
		copyToClipboard(data)
		console.log('copied!')
	}

	const updateSpriteData = mapPos => {
		const pos = paintType === TYPE_TILE ? tilePos : entityPos
		const data = paintType === TYPE_TILE ? tileData : entityData
		const spriteIndex = getGridIndex(pos, SIZE_SPRITESHEET)
		const mapIndex = getGridIndex(mapPos, SIZE_MAP)
		const spriteKey = !isErasing ? SPRITESHEET_KEY[spriteIndex] : (paintType === TYPE_TILE ? '0' : '.')
		const newData = replaceAt(data, mapIndex, spriteKey)
		paintType === TYPE_TILE ? setTileData(newData) : setEntityData(newData)
	}

	const updateCollisionData = mapPos => {
		if(!isErasing && !collisionData.find(({ x, y }) => x === mapPos.x && y === mapPos.y)) {
			setCollisionData([ ...collisionData, { ...mapPos } ])
		} else if(isErasing) {
			let data = [ ...collisionData ]
			data = data.filter(({ x, y }) => (x !== mapPos.x || y !== mapPos.y))
			setCollisionData(data)
		}
	}

	const updateTriggerData = () => {
		// ...
	}

	const selectSprite = (sprite, type) => {
		console.log('selectSprite')
		switch(type) {
			case TYPE_TILE:
				setPaintType(TYPE_TILE)
				setTilePos(sprite)
				break
			case TYPE_ENTITY:
				setPaintType(TYPE_ENTITY)
				setEntityPos(sprite)
				break
		}
	}

	return (
		<Panel width={ 3 } height={ 3 } x={ 1 } y={ 0 }>
			<SpriteSheets
				saveMapData={ _ => saveMapData() }
				selectTile={ tile => selectSprite(tile, TYPE_TILE) }
				selectEntity={ entity => selectSprite(entity, TYPE_ENTITY) }
				toggleErasing={ _ => setIsErasing(!isErasing) }
				isErasing={ isErasing }
			/>
	    <Grid
	    	onMouseDown={ _ => setIsPainting(!isPainting) }
	    	onMouseUp={ _ => setIsPainting(!isPainting) }
	    >
	    {[...Array(SIZE_MAP)].map((_, y) => (
    		[...Array(SIZE_MAP)].map((_, x) => (
    			<Tile
    				paintType={ paintType }
    				isPainting={ isPainting }
    				initialTile={ convertCharToCoords(tileData[(y * SIZE_MAP) + x]) }
    				initialEntity={ convertCharToCoords(entityData[(y * SIZE_MAP) + x]) }
    				tileSheet={ tileSheet }
    				entitySheet={ entitySheet }
    				tilePos={ tilePos }
    				entityPos={ entityPos }
    				updateSpriteData={ _ => updateSpriteData({ x, y }) }
    				updateCollisionData={ collision => updateCollisionData({ x, y }, collision) }
    				hasCollision={ hasCoordsInList({ x, y }, collisionData) }
    				hasTrigger={ hasCoordsInList({ x, y }, triggerData) }
    			/>
    		))
    	))}
	    </Grid>
	    
	    <Player
	    	doScreenTransition={ direction => doScreenTransition(direction) }
	    	collisionData={ collisionData }
	    />
	  </Panel>
  )
}

const Tile = ({
	paintType,
	isPainting,
	initialTile = { x: 0, y: 0 },
	initialEntity = { x: 0, y: 0 },
	tileSheet,
	entitySheet,
	tilePos,
	entityPos,
	updateSpriteData,
	updateCollisionData,
	hasCollision,
	hasTrigger,
}) => {

	const [ tile, setTile ] = useState(initialTile)
	const [ entity, setEntity ] = useState(initialEntity)

	useEffect(() => setTile(initialTile), [ initialTile ])	
	useEffect(() => setEntity(initialEntity), [ initialEntity ])

	const handleSelection = () => {
		if(paintType === TYPE_TILE) {
			if(tilePos === ADD_COLLISION) {
				updateCollisionData()
			} else {
				setTile(tilePos)
				updateSpriteData()
			}
		} else if(paintType === TYPE_ENTITY) {
			setEntity(entityPos)
			updateSpriteData()
		}
	}

	return (
		<Sprite
    	type="tiles"
    	id={ tileSheet }
    	x={ tile.x }
    	y={ tile.y }
    	onMouseDown={ _ => handleSelection() }
    	onMouseOver={ _ => isPainting ? handleSelection() : null }
    >
			<Sprite
				type="entities"
				id={ entitySheet }
				x={ entity.x }
				y={ entity.y }
			/>
    	{ hasCollision ? <Collision /> : null }
    	{ hasTrigger ? <Trigger /> : null }
    </Sprite>
  )
}

const Grid = styled.div`
	display: flex;
	flex-wrap: wrap;
	width: 100%;
	height: 100%;
`

const Marker = styled.div`
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	opacity: 0.5;
`

const Collision = styled(Marker)`background-color: red;`
const Trigger = styled(Marker)`background-color: magenta;`

export default World

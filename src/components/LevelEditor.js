import React, { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import styled from 'styled-components'
import { SIZES, TYPES, DIRECTIONS, SPRITESHEET_KEY } from '../constants'
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
import { GridContainer } from './GridContainer'
import SpriteSheets from './SpriteSheets'
import Player from './Player'
import EditorTile from './EditorTile'

const LevelEditor = () => {

	const [ mapData, setMapData ] = useState(getMapAtLocation({ x: 0, y: 0 }, TYPES.OVERWORLD))
	const [ tileSheet, setTileSheet ] = useState('01')
	const [ entitySheet, setEntitySheet ] = useState('01')
	const [ tilePos, setTilePos ] = useState({ x: 0, y: 0 })
	const [ entityPos, setEntityPos ] = useState({ x: 0, y: 0 })
	const [ paintType, setPaintType ] = useState(TYPES.ENTITY)
	const [ isPainting, setIsPainting ] = useState(false)
	const [ isErasing, setIsErasing ] = useState(false)
	const [ isEditing, setIsEditing ] = useState(false)
	
	useListener('keyup', ({ code }) => {
		if(code === 'KeyE') setIsEditing(!isEditing)
	}, [])

	const saveMapData = () => {
		let data = ''
		data += `\t\ttiles: ${ JSON.stringify(mapData.tiles) },`
		data += `\n\t\tentities: ${ JSON.stringify(mapData.entities) },`
		data += `\n\t\tcollision: ${ JSON.stringify(mapData.collision) },`
		copyToClipboard(data)
		console.log('copied!')
	}

	const updateSpriteData = mapPos => {
		const pos = paintType === TYPES.TILE ? tilePos : entityPos
		const data = paintType === TYPES.TILE ? mapData.tiles : mapData.entities
		const dataType = paintType === TYPES.TILE ? 'tiles' : 'entities'
		const spriteIndex = getGridIndex(pos, SIZES.SPRITESHEET)
		const mapIndex = getGridIndex(mapPos, SIZES.MAP)
		const spriteKey = !isErasing ? SPRITESHEET_KEY[spriteIndex] : (paintType === TYPES.TILE ? '0' : '.')
		const newData = replaceAt(data, mapIndex, spriteKey)
		setMapData({ ...mapData, [dataType]: newData })
	}

	const updateCollisionData = mapPos => {
		if(!isErasing && !mapData.collision.find(({ x, y }) => x === mapPos.x && y === mapPos.y)) {
			setMapData({ ...mapData, collision: [ ...mapData.collision, { ...mapPos } ] })
		} else if(isErasing) {
			let collision = [ ...mapData.collision ]
			collision = collision.filter(({ x, y }) => (x !== mapPos.x || y !== mapPos.y))
			setMapData({ ...mapData, collision })
		}
	}

	const updateTriggerData = () => {
		// ...
	}

	const selectSprite = (sprite, type) => {
		switch(type) {
			case TYPES.TILE:
				setPaintType(TYPES.TILE)
				setTilePos(sprite)
				break
			case TYPES.ENTITY:
				setPaintType(TYPES.ENTITY)
				setEntityPos(sprite)
				break
		}
	}

	return (
		<Editor hidden={ !isEditing }>
			<SpriteSheets
				saveMapData={ _ => saveMapData() }
				selectTile={ tile => selectSprite(tile, TYPES.TILE) }
				selectEntity={ entity => selectSprite(entity, TYPES.ENTITY) }
				toggleErasing={ _ => setIsErasing(!isErasing) }
				isErasing={ isErasing }
			/>
	    <GridContainer
	    	onMouseDown={ _ => setIsPainting(!isPainting) }
	    	onMouseUp={ _ => setIsPainting(!isPainting) }
	    >
		  {[...Array(SIZES.MAP)].map((_, y) => (
				[...Array(SIZES.MAP)].map((_, x) => (
	  			<EditorTile
	  				paintType={ paintType }
	  				isPainting={ isPainting }
	  				initialTile={ convertCharToCoords(mapData.tiles[(y * SIZES.MAP) + x]) }
	  				initialEntity={ convertCharToCoords(mapData.entities[(y * SIZES.MAP) + x]) }
	  				tileSheet={ tileSheet }
	  				entitySheet={ entitySheet }
	  				tilePos={ tilePos }
	  				entityPos={ entityPos }
	  				updateSpriteData={ _ => updateSpriteData({ x, y }) }
	  				updateCollisionData={ collision => updateCollisionData({ x, y }, collision) }
	  				hasCollision={ hasCoordsInList({ x, y }, mapData.collision) }
	  				hasTrigger={ hasCoordsInList({ x, y }, mapData.triggers) }
	  			/>
				))
			))}
	    </GridContainer>
	  </Editor>
  )
}

const Editor = styled.aside`
	position: fixed;
	left: 50%;
	top: 50%;
	transform: translate3d(-35%, -25%, 0);
	display: ${ ({ hidden }) => hidden ? 'none' : 'flex' };
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
	width: ${ SIZES.TILE * SIZES.MAP }px;
	height: ${ SIZES.TILE * SIZES.MAP }px;
	outline: 500px solid #1a1a1a;
`

export default LevelEditor

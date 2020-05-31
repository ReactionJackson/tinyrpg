import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { SIZE_MAP, SIZE_TILE, SIZE_SPRITESHEET, SPRITESHEET_KEY, BLANK_MAP_STR } from '../constants'
import { replaceAt } from '../utils/replaceAt'
import { getGridIndex } from '../utils/getGridIndex'
import { convertCharToCoords } from '../utils/convertCharToCoords'
import { hasCoordsInList } from '../utils/hasCoordsInList'
import { copyToClipboard } from '../utils/copyToClipboard'
import { useListener } from '../hooks/useListener'
import { overworldMaps } from '../data/maps'
import { Panel } from './Panel'
import { Sprite } from './Sprite'
import Player from './Player'
import SpriteSheets from './SpriteSheets'

const ADD_COLLISION = -1, REMOVE_COLLISION = -2

const World = ({ spawnPos }) => {
	
	const [ tileData, setTileData ] = useState(overworldMaps[0].tiles)
	const [ objectData, setObjectData ] = useState(BLANK_MAP_STR)
	const [ collisionData, setCollisionData ] = useState(overworldMaps[0].collision)
	const [ triggerData, setTriggerData ] = useState([]) // a 2d array of groups of coords?

	const [ isPainting, setIsPainting ] = useState(false)
	const [ entitySheet, setEntitySheet ] = useState('01')
	const [ spriteSheet, setSpriteSheet ] = useState('01')
	const [ spritePos, setSpritePos ] = useState({ x: 0, y: 0 })
	const [ screenPos, setScreenPos ] = useState({ x: 0, y: 0 })
	
	useEffect(() => setTimeout(() => {
		console.clear()
		console.log(tileData)
	}, 100), [])

	useListener('click', _ => convertCharToCoords('l'), [])

	useEffect(() => console.log('collisionData', collisionData), [ collisionData ])

	const saveMapData = () => {
		let data = ''
		data += `\t\tcollision: ${ JSON.stringify(collisionData) },`
		data += `\n\t\ttiles: ${ JSON.stringify(tileData) },`
		copyToClipboard(data)
		console.log('copied!')
	}

	const updateTileData = tilePos => {
		const spriteIndex = getGridIndex(spritePos, SIZE_SPRITESHEET)
		const tileIndex = getGridIndex(tilePos, SIZE_MAP)
		const spriteKey = SPRITESHEET_KEY[spriteIndex]
		const data = replaceAt(tileData, tileIndex, spriteKey)
		// console.log(spriteIndex, tileIndex, spriteKey)
		setTileData(data)
	}

	const updateCollisionData = (tilePos, collision) => {
		if(collision === ADD_COLLISION
		&& !collisionData.find(({ x, y }) => x === tilePos.x && y === tilePos.y)) {
			setCollisionData([ ...collisionData, { ...tilePos } ])
		} else if(collision === REMOVE_COLLISION) {
			let data = [ ...collisionData ]
			data = data.filter(({ x, y }) => (x !== tilePos.x || y !== tilePos.y))
			setCollisionData(data)
		}
	}

	return (
		<Panel width={ 3 } height={ 3 } x={ 1 } y={ 0 }>
			<SpriteSheets
				saveMapData={ _ => saveMapData() }
				selectSprite={ sprite => setSpritePos(sprite) }
			/>
	    <Grid
	    	onMouseDown={ _ => setIsPainting(!isPainting) }
	    	onMouseUp={ _ => setIsPainting(!isPainting) }
	    >
	    {[...Array(SIZE_MAP)].map((_, y) => (
    		[...Array(SIZE_MAP)].map((_, x) => (
    			<Tile
    				initialSprite={ convertCharToCoords(tileData[(y * SIZE_MAP) + x]) }
    				spriteSheet={ spriteSheet }
    				entitySheet={ entitySheet }
    				hasCollision={ hasCoordsInList({ x, y }, collisionData) }
    				hasTrigger={ hasCoordsInList({ x, y }, triggerData) }
    				hasEntity={ x === 2 && y === 5 } // testing
    				spritePos={ spritePos }
    				isPainting={ isPainting }
    				updateTileData={ _ => updateTileData({ x, y }) }
    				updateCollisionData={ collision => updateCollisionData({ x, y }, collision) }
    			/>
    		))
    	))}
	    </Grid>
	    <Player collisionData={ collisionData } />
	  </Panel>
  )
}

const Tile = ({
	initialSprite = { x: 0, y: 0 },
	spriteSheet,
	entitySheet,
	isPainting,
	spritePos,
	hasCollision,
	hasTrigger,
	hasEntity,
	showGrid,
	updateTileData,
	updateCollisionData
}) => {

	const [ sprite, setSprite ] = useState(initialSprite)

	const handleSelection = toggleCollision => {
		if(spritePos === ADD_COLLISION) {
			updateCollisionData(ADD_COLLISION)
		} else if(spritePos === REMOVE_COLLISION) {
			updateCollisionData(REMOVE_COLLISION)
		} else {
			setSprite(spritePos)
			updateTileData()
		}
	}

	return (
    <Sprite
    	x={ sprite.x }
    	y={ sprite.y }
    	id={ spriteSheet }
    	onMouseDown={ _ => handleSelection() }
    	onMouseOver={ _ => isPainting ? handleSelection() : null }
    >
    	{ hasCollision ? <Collision /> : null }
    	{ hasTrigger ? <Trigger /> : null }
    	{ hasEntity ? <Entity x={ 0 } y={ 0 } /> : null }
    </Sprite>
  )
}

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

const Entity = styled.div`
	width: 50%;
	height: 50%;
	position: absolute;
	left: 25%;
	top: 25%;
	background: lime;
	border: 1px solid #000;
`

const Grid = styled.div`
	display: flex;
	flex-wrap: wrap;
	width: 100%;
	height: 100%;
`

export default World

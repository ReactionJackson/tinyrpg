import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { SIZE_MAP, SIZE_TILE, SPRITESHEET_KEY, BLANK_MAP_STR } from '../constants'
import { replaceAt } from '../utils/replaceAt'
import { useListener } from '../hooks/useListener'
import { Panel } from './Panel'
import { Sprite } from './Sprite'
import Player from './Player'
import SpriteSheets from './SpriteSheets'

const ADD_COLLISION = -1, REMOVE_COLLISION = -2

const World = () => {
	
	const [ tileData, setTileData ] = useState(BLANK_MAP_STR)
	const [ objectData, setObjectData ] = useState(BLANK_MAP_STR)
	const [ collisionData, setCollisionData ] = useState([]) // an array of coords
	const [ triggerData, setTriggerData ] = useState([]) // a 2d array of groups of coords?

	const [ isPainting, setIsPainting ] = useState(false)
	const [ entitySheet, setEntitySheet ] = useState('01')
	const [ spriteSheet, setSpriteSheet ] = useState('01')
	const [ spritePos, setSpritePos ] = useState({ x: 0, y: 0 })
	const [ screenPos, setScreenPos ] = useState({ x: 0, y: 0 })

	// useListener('keyup', ({ code }) => {
	// 	if(code === 'KeyG') setShowGrid(!showGrid)
	// }, [])

	useEffect(() => setTimeout(() => console.clear(), 100), [])

	const updateTileData = tilePos => {
		const { x, y } = tilePos
		const spriteStr = SPRITESHEET_KEY[spritePos.x] + SPRITESHEET_KEY[spritePos.y]
		const data = replaceAt(tileData, ((x * 2) + ((SIZE_TILE * 2) * y)) - (y * 2), spriteStr)
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

	const hasCoordsInList = ({ x, y }, list) => (
		list.find(item => item.x === x && item.y === y)
	)

	return (
		<Panel width={ 3 } height={ 3 } x={ 1 } y={ 0 }>
			<SpriteSheets selectSprite={ sprite => setSpritePos(sprite) } />
	    <Grid
	    	onMouseDown={ _ => setIsPainting(!isPainting) }
	    	onMouseUp={ _ => setIsPainting(!isPainting) }
	    >
	    {[...Array(SIZE_MAP)].map((_, y) => (
    		[...Array(SIZE_MAP)].map((_, x) => (
    			<Tile
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

	const [ sprite, setSprite ] = useState({ x: 0, y: 0 })

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

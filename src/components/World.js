import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { SIZE_MAP, SIZE_TILE, SPRITESHEET_KEY, BLANK_MAP_STR } from '../constants'
import { replaceAt } from '../utils/replaceAt'
import { useListener } from '../hooks/useListener'
import { useLog } from '../hooks/useLog'
import { Panel } from './Panel'
import { Sprite } from './Sprite'
import Player from './Player'
import SpriteSheet from './SpriteSheet'

const ADD_COLLISION = -1, REMOVE_COLLISION = -2

const World = () => {
	
	const [ isPainting, setIsPainting ] = useState(false)
	const [ spriteSheet, setSpriteSheet ] = useState('01')
	const [ spritePos, setSpritePos ] = useState({ x: 0, y: 0 })
	const [ screenPos, setScreenPos ] = useState({ x: 0, y: 0 })
	const [ showGrid, setShowGrid ] = useState(false)
	const [ tileData, setTileData ] = useState(BLANK_MAP_STR)
	const [ objectData, setObjectData ] = useState(BLANK_MAP_STR)
	const [ collisionData, setCollisionData ] = useState([]) // an array of coords

	useListener('keyup', ({ code }) => {
		if(code === 'KeyG') setShowGrid(!showGrid)
	}, [])

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

	return (
		<Panel width={ 3 } height={ 3 } x={ 1 } y={ 0 }>
			<SpriteSheet selectSprite={ sprite => setSpritePos(sprite) } />
	    <Grid
	    	onMouseDown={ _ => setIsPainting(!isPainting) }
	    	onMouseUp={ _ => setIsPainting(!isPainting) }
	    >
	    {[...Array(SIZE_MAP)].map((_, y) => (
    		[...Array(SIZE_MAP)].map((_, x) => (
    			<Tile
    				x={ x }
    				y={ y }
    				spritePos={ spritePos }
    				showGrid={ showGrid }
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

const Tile = ({ isPainting, spritePos, showGrid, updateTileData, updateCollisionData }) => {

	const [ sprite, setSprite ] = useState({ x: 0, y: 0 })
	const [ collision, setCollision ] = useState(false)

	const handleSelection = toggleCollision => {
		if(spritePos === ADD_COLLISION) {
			setCollision(true)
			updateCollisionData(ADD_COLLISION)
		} else if(spritePos === REMOVE_COLLISION) {
			setCollision(false)
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
    	grid={ showGrid }
    	onMouseDown={ _ => handleSelection() }
    	onMouseOver={ _ => isPainting ? handleSelection() : null }
    >
    	x{ sprite.x } y{ sprite.y }
    	{ collision ? <Collision /> : null }
    </Sprite>
  )
}

const Collision = styled(Sprite)`
	position: absolute;
	left: 0;
	top: 0;
	opacity: 0.5;
	background: red;
`

const Grid = styled.div`
	display: flex;
	flex-wrap: wrap;
	width: 100%;
	height: 100%;
`

export default World

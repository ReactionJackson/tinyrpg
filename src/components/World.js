import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { SIZE_MAP, SIZE_TILE, SPRITESHEET_KEY, BLANK_MAP_STR } from '../constants'
import { replaceAt } from '../utils/replaceAt'
import { useListener } from '../hooks/useListener'
import { useLog } from '../hooks/useLog'
import { Panel } from './Panel'
import { Sprite } from './Sprite'
import Player from './Player'
import PaintEditor from './PaintEditor'

const World = () => {
	
	const [ isPainting, setIsPainting ] = useState(false)
	const [ spriteSheet, setSpriteSheet ] = useState('01')
	const [ spritePos, setSpritePos ] = useState({ x: 0, y: 0 })
	const [ screenPos, setScreenPos ] = useState({ x: 0, y: 0 })
	const [ showGrid, setShowGrid ] = useState(false)
	const [ tileData, setTileData ] = useState(BLANK_MAP_STR)
	const [ objectData, setObjectData ] = useState(BLANK_MAP_STR)

	useEffect(() => {
		console.clear()
		console.log('tileData', tileData, tileData.length)
	}, [ tileData ])

	// useLog('spritePos:', spritePos)
	// useLog('isPainting:', isPainting)

	useListener('keyup', ({ code }) => {
		if(code === 'KeyG') setShowGrid(!showGrid)
	}, [])

	const updateTileData = tilePos => {
		const { x, y } = tilePos
		const spriteStr = SPRITESHEET_KEY[spritePos.x] + SPRITESHEET_KEY[spritePos.y]
		const data = replaceAt(tileData, ((x * 2) + ((SIZE_TILE * 2) * y)) - (y * 2), spriteStr)
		setTileData(data)
	}

	return (
		<Panel width={ 3 } height={ 3 } x={ 1 } y={ 0 }>
			<PaintEditor selectSprite={ sprite => setSpritePos(sprite) } />
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
    			/>
    		))
    	))}
	    </Grid>
	    <Player />
	  </Panel>
  )
}

const Tile = ({ isPainting, spritePos, showGrid, updateTileData }) => {
	const [ sprite, setSprite ] = useState({ x: 0, y: 0 })
	const handleSelection = () => {
		setSprite(spritePos)
		updateTileData()
	}
	return (
    <Sprite
    	x={ sprite.x }
    	y={ sprite.y }
    	grid={ showGrid }
    	onMouseDown={ _ => handleSelection() }
    	onMouseOver={ _ => isPainting ? handleSelection() : null }
    >x{ sprite.x } y{ sprite.y }</Sprite>
  )
}

const Grid = styled.div`
	display: flex;
	flex-wrap: wrap;
	width: 100%;
	height: 100%;
`

export default World

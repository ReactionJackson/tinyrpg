import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { SIZE_MAP, SIZE_TILE, BLANK_MAP_STR } from '../constants'
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
	const [ sprite, setSprite ] = useState({ x: 0, y: 0 })
	const [ screen, setScreen ] = useState({ x: 0, y: 0 })
	const [ showGrid, setShowGrid ] = useState(false)
	const [ tileData, setTileData ] = useState(BLANK_MAP_STR)
	const [ objectData, setObjectData ] = useState(BLANK_MAP_STR)

	useLog('tileData', tileData)
	useLog('isPainting', isPainting)
	useLog('sprite', sprite)

	useListener('keyup', ({ code }) => {
		if(code === 'KeyG') setShowGrid(!showGrid)
	}, [])

	const updateTextureData = (x, y, char) => {
		let data = tileData
		data = replaceAt(data, (y * SIZE_TILE) + x, char)
		setTileData(data)
	}

	return (
		<Panel width={ 3 } height={ 3 } x={ 1 } y={ 0 }>
			<PaintEditor selectSprite={ data => setSprite(data) } />
	    <Grid
	    	onMouseDown={ _ => setIsPainting(!isPainting) }
	    	onMouseUp={ _ => setIsPainting(!isPainting) }
	    >
	    {[...Array(SIZE_MAP)].map((_, y) => (
    		[...Array(SIZE_MAP)].map((_, x) => (
    			<Tile
    				x={ x }
    				y={ y }
    				sprite={ sprite }
    				showGrid={ showGrid }
    				isPainting={ isPainting }
    				updateTextureData={ _ => updateTextureData(x, y) }
    			/>
    		))
    	))}
	    </Grid>
	    <Player />
	  </Panel>
  )
}

const Tile = ({ isPainting, sprite, showGrid, updateTextureData }) => {
	const [ texture, setTexture ] = useState({ x: null, y: null })
	const handleSelection = () => {
		setTexture(sprite)
		updateTextureData()
	}
	return (
    <Sprite
    	x={ texture.x }
    	y={ texture.y }
    	grid={ showGrid }
    	onMouseDown={ _ => handleSelection() }
    	onMouseOver={ _ => isPainting ? handleSelection() : null }
    >x{ texture.x } y{ texture.y }</Sprite>
  )
}

const Grid = styled.div`
	display: flex;
	flex-wrap: wrap;
	width: 100%;
	height: 100%;
`

export default World

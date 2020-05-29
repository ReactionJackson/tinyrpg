import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { SIZE_MAP, SIZE_TILE } from '../constants'
import { replaceAt } from '../utils/replaceAt'
import { useListener } from '../hooks/useListener'
import { Panel } from './Panel'
import { Sprite } from './Sprite'
import Player from './Player'
import PaintEditor from './PaintEditor'

const World = () => {
	
	const [ isPainting, setIsPainting ] = useState(false)
	const [ sprite, setSprite ] = useState({ x: 0, y: 0, spriteKey: null })
	const [ screen, setScreen ] = useState({ x: 0, y: 0 })
	const [ showGrid, setShowGrid ] = useState(true)
	const [ textureData, setTextureData ] = useState('.................................................................................................................................................................................................................................')

	useEffect(() => {
		console.clear()
		console.log('textureData', textureData)
	}, [ textureData ])

	useEffect(() => console.log('painting:', isPainting), [ isPainting ])
	useEffect(() => console.log('sprite:', sprite), [ sprite ])

	useListener('keyup', ({ code }) => {
		if(code === 'KeyG') {
			setShowGrid(!showGrid)
		}
	}, [])

	const updateTextureData = (x, y, char) => {
		let data = textureData
		data = replaceAt(data, (y * SIZE_TILE) + x, char)
		setTextureData(data)
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
    				updateTextureData={ _ => updateTextureData(x, y, sprite.spriteKey) }
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

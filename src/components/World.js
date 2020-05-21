import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { SIZE_MAP, SIZE_TILE } from '../constants/sizes'
import { replaceAt } from '../utils/replaceAt'
import { useListener } from '../hooks/useListener'
import PaintEditor from './PaintEditor'
import { Sprite } from './Sprite'

const World = () => {
	
	const [ isPainting, setIsPainting ] = useState(false)
	const [ paint, setPaint ] = useState('#fff')
	const [ screen, setScreen ] = useState([])
	const [ showGrid, setShowGrid ] = useState(true)
	const [ textureData, setTextureData ] = useState('.................................................................................................................................................................................................................................')

	useEffect(() => {
		console.clear()
		console.log('textureData', textureData)
	}, [ textureData ])

	useEffect(() => console.log('painting:', isPainting), [ isPainting ])
	useEffect(() => console.log('paint:', paint), [ paint ])

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
		<div>
			<PaintEditor selectPaint={ paint => setPaint(paint) } />
	    <Grid
	    	onMouseDown={ _ => setIsPainting(!isPainting) }
	    	onMouseUp={ _ => setIsPainting(!isPainting) }
	    >
	    {[...Array(SIZE_MAP)].map((_, y) => (
    		[...Array(SIZE_MAP)].map((_, x) => (
    			<Tile
    				x={ x }
    				y={ y }
    				paint={ paint }
    				isPainting={ isPainting }
    				showGrid={ showGrid }
    				updateTextureData={ _ => updateTextureData(x, y, '!') }
    			/>
    		))
    	))}
	    </Grid>
	  </div>
  )
}

const Tile = ({ isPainting, paint, showGrid, updateTextureData }) => {
	const [ texture, setTexture ] = useState('#fff')
	const handleSelection = () => {
		setTexture(paint)
		updateTextureData()
	}
	return (
    <Sprite
    	grid={ showGrid }
    	texture={ texture }
    	onMouseDown={ _ => handleSelection() }
    	onMouseOver={ _ => isPainting ? handleSelection() : null }
    />
  )
}

const Grid = styled.div`
	display: flex;
	flex-wrap: wrap;
	width: 100%;
	height: 100%;
`

export default World

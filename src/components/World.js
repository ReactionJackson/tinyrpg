import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { SIZE_MAP, SIZE_TILE } from '../constants/sizes'
import { useListener } from '../hooks/useListener'
import PaintEditor from './PaintEditor'
import { Sprite } from './Sprite'

const World = () => {
	
	const [ isPainting, setIsPainting ] = useState(false)
	const [ paint, setPaint ] = useState('#fff')
	const [ screen, setScreen ] = useState([])
	const [ showGrid, setShowGrid ] = useState(true)

	useEffect(() => console.log('painting:', isPainting), [ isPainting ])
	useEffect(() => console.log('paint:', paint), [ paint ])

	useListener('keyup', ({ code }) => {
		if(code === 'KeyG') {
			setShowGrid(!showGrid)
		}
	}, [])

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
    			/>
    		))
    	))}
	    </Grid>
	  </div>
  )
}

const Tile = ({ isPainting, paint, showGrid }) => {
	const [ texture, setTexture ] = useState('#fff')
	return (
    <Sprite
    	grid={ showGrid }
    	texture={ texture }
    	onMouseDown={ _ => setTexture(paint) }
    	onMouseOver={ _ => isPainting ? setTexture(paint) : null }
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

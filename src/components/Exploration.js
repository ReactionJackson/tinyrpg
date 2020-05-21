import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { getRegion } from '../utils/getRegion'
import { isDirectionalInput } from '../utils/isDirectionalInput'
import { blockSize, chunkSize, regionSize, tileSize } from '../constants/settings'
import { themes } from '../constants/themes'
import { Panel } from './Panel'
import Character from './Character'

const getCharacterPos = (chunk, tile) => ({
	x: (chunk.x * chunkSize) + tile.x,
	y: (chunk.y * chunkSize) + tile.y
})

const Exploration = () => {

	const [ pos, setPos ] = useState({
		region: { x: 0, y: 0 },
		chunk: { x: 0, y: 0 },
		tile: { x: 2, y: 2 }
	})

	const [ regionData, setRegionData ] = useState(getRegion(pos.region))
	const [ flip, setFlip ] = useState(false)

	useEffect(() => {

		if(regionData.worldPosition !== pos.region.x
		|| regionData.worldPosition.y !== pos.region.y) {
			setRegionData(getRegion(pos.region))
		}

	}, [ pos ])

  useEffect(() => {
  	console.clear()
  	console.log(`region x${ pos.region.x } y${ pos.region.y }`)
  	console.log(`chunk x${ pos.chunk.x } y${ pos.chunk.y }`)
  	console.log(`tile x${ pos.tile.x } y${ pos.tile.y }`)
  }, [pos])

	useEffect(() => {
		document.addEventListener('keyup', ({ code }) => {

			if(!isDirectionalInput(code))
				return false

			let { region, chunk, tile } = pos
			let showNewChunk = false

			switch(code) {
				case 'KeyW': // North
					if(tile.y === 0) {
						tile.y = chunkSize - 1
						if(chunk.y === 0) {
							chunk.y = regionSize - 1
							region.y--
						} else {
							chunk.y--
						}
						showNewChunk = true
					} else {
						tile.y--
					}
					break
				case 'KeyD': // East
					if(tile.x === chunkSize - 1) {
						tile.x = 0
						if(chunk.x === regionSize - 1) {
							chunk.x = 0
							region.x++
						} else {
							chunk.x++
						}
						showNewChunk = true
					} else {
						tile.x++
					}
					setFlip(false)
					break
				case 'KeyS': // South
					if(tile.y === chunkSize - 1) {
						tile.y = 0
						if(chunk.y === regionSize - 1) {
							chunk.y = 0
							region.y++
						} else {
							chunk.y++
						}
						showNewChunk = true
					} else {
						tile.y++
					}
					break
				case 'KeyA': // West
					if(tile.x === 0) {
						tile.x = chunkSize - 1
						if(chunk.x === 0) {
							chunk.x = regionSize - 1
							region.x--
						} else {
							chunk.x--
						}
						showNewChunk = true
					} else {
						tile.x--
					}
					setFlip(true)
					break
			}

			if(showNewChunk) {
				const { chunks } = regionData
				chunks.forEach(({ position }, i, a) => {
					if(position.x === chunk.x
					&& position.y === chunk.y) {
						a[i].visible = 1
					}
				})
				setRegionData({ ...regionData, chunks })
			}

			setPos({ region, chunk, tile })

		})
	}, [])

  return (
    <Panel width={ 3 } height={ 3 } x={ 1 } y={ 0 }>
      <Character pos={ getCharacterPos(pos.chunk, pos.tile) } flip={ flip } />
      <Region chunks={ regionData.chunks } />
    </Panel>
  )
}

const Region = ({ chunks }) => {
	console.log('chunks', chunks)
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
    	{
    		chunks.map(({ theme, tiles, visible }, i) => (
    			<Chunk
    				key={ i }
    				visible={ visible }
    				tiles={ tiles }
    			/>
    		))
    	}
    </div>
  )
}

const Chunk = ({ visible = 1, tiles, theme }) => {
	const { collision, sprites } = tiles
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', width: blockSize, height: blockSize, opacity: visible }}>
      {
      	sprites.map((sprite, i) => (
      		<Tile
      			key={ i }
      			sprite={ sprite }
      			collision={ collision.indexOf(sprite) > -1 }
      		/>
      	))
    	}
    </div>
  )
}

const Tile = styled.div`
	position: relative;
	width: ${ tileSize }px;
	height: ${ tileSize }px;
	lineHeight: ${ tileSize }px;
	text-align: center;
	background: ${ ({ sprite }) => themes[0][sprite] };
	&::after {
		display: ${ ({ collision }) => collision ? 'block' : 'none' };
		content: '';
		position: absolute;
		z-index: 10;
		left: 37.5%;
		top: 37.5%;
		width: 25%;
		height: 25%;
		background: red;
	}
`

export default Exploration
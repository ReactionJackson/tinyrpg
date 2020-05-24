import React from 'react'
import styled from 'styled-components'
import { SIZE_TILE, SIZE_MAP, SPRITESHEET_KEY, SIZE_SPRITESHEET, THEMES, TILES } from '../constants'

// <Tile sprite={ THEME_1[dataCharIndex(spriteId)] } { ...otherStuff } />

const PaintEditor = ({ theme = THEMES.TOWN_1, selectSprite }) => (
	<SpriteSheet>
	{
		[...Array(SIZE_SPRITESHEET.y)].map((_, y) => (
			[...Array(SIZE_SPRITESHEET.x)].map((_, x) => {
				const spriteKey = SPRITESHEET_KEY[(y * SIZE_SPRITESHEET.x) + x]
				const spriteData = ({ x, y, spriteKey })
				return (
					<Cell
						key={ spriteKey + x + y }
						spriteKey={ spriteKey }
						onClick={ _ => selectSprite(spriteData) }
					>{ spriteKey }</Cell>
				)
			})
		))
	}
	</SpriteSheet>
)

const SpriteSheet = styled.aside`
	display: flex;
	flex-wrap: wrap;
	position: absolute;
	right: 0;
	bottom: calc(100% + ${ SIZE_TILE }px);
	width: ${ SIZE_TILE * 20 }px;
	height: ${ SIZE_TILE * 4 }px;
	background: url(${ require('../assets/sprites/links_awakening.png') }) no-repeat left top / 688px auto magenta;
`

const Cell = styled.div`
	color: #fff;
	font-size: 4px;
	line-height: 8px;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	width: ${ SIZE_TILE }px;
	height: ${ SIZE_TILE }px;
	border-top: 1px solid #000;
	border-left: 1px solid #000;
	text-shadow: 0 0 1px #000, 0 0 1px #000, 0 0 1px #000, 0 0 1px #000;
`

export default PaintEditor

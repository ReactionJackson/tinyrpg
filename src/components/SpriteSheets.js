import React from 'react'
import styled from 'styled-components'
import { SIZE_INTERFACE, SIZE_TILE, SIZE_MAP, SPRITESHEET_KEY, SIZE_SPRITESHEET, THEMES } from '../constants'

const SpriteSheets = ({ theme = THEMES.TOWN_1, selectSprite }) => (
	<Sheets>
		<Sheet type="tiles" id="01">
		{
			[...Array(SIZE_SPRITESHEET)].map((_, y) => (
				[...Array(SIZE_SPRITESHEET)].map((_, x) => (
					<Tile
						key={ x + y }
						onClick={ _ => selectSprite({ x, y }) }
					/>
				))
			))
		}
		<Tile
			key="collision"
			onClick={ _ => selectSprite(-1) }
			style={{ position: 'absolute', bottom: SIZE_TILE, left: -SIZE_TILE, background: 'red' }}
		/>
		<Tile
			key="remove-collision"
			onClick={ _ => selectSprite(-2) }
			style={{ position: 'absolute', bottom: 0, left: -SIZE_TILE, background: 'red' }}
		>X</Tile>
		</Sheet>
		<Sheet type="objects" id="01">
		{
			[...Array(SIZE_SPRITESHEET)].map((_, y) => (
				[...Array(SIZE_SPRITESHEET)].map((_, x) => (
					<Tile
						key={ x + y }
						onClick={ _ => selectSprite({ x, y }) }
					/>
				))
			))
		}
		</Sheet>
	</Sheets>
)

const Sheets = styled.aside`
	display: flex;
	flex-direction: row-reverse;
	justify-content: space-between;
	position: absolute;
	right: 0;
	bottom: calc(100% + ${ SIZE_TILE }px);
	width: ${ SIZE_INTERFACE }px;
`

const Sheet = styled.div`
	display: flex;
	flex-wrap: wrap;
	position: relative;
	width: ${ SIZE_TILE * SIZE_SPRITESHEET }px;
	height: ${ SIZE_TILE * SIZE_SPRITESHEET }px;
	background: url(${ ({ type, id }) => require(`../assets/sprites/${ type }_${ id }.png`) }) no-repeat left top / ${ SIZE_TILE * SIZE_SPRITESHEET }px magenta;
`

const Tile = styled.div`
	cursor: pointer;
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

export default SpriteSheets

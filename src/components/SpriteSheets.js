import React from 'react'
import styled from 'styled-components'
import { SIZE_INTERFACE, SIZE_TILE, SIZE_MAP, SPRITESHEET_KEY, SIZE_SPRITESHEET, THEMES } from '../constants'

const SpriteSheets = ({ theme = THEMES.TOWN_1, selectSprite, saveMapData }) => (
	<Sheets>
		<Sheet type="tiles" id="01">
		{
			[...Array(SIZE_SPRITESHEET)].map((_, y) => (
				[...Array(SIZE_SPRITESHEET)].map((_, x) => (
					<Tile
						key={ x + y }
						onClick={ _ => selectSprite({ x, y }) }
					>{ SPRITESHEET_KEY[(y * SIZE_SPRITESHEET) + x] }</Tile>
				))
			))
		}
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
		<EditorButtons>
			<CollisionButton onClick={ _ => selectSprite(-1) }></CollisionButton>
			<CollisionButton onClick={ _ => selectSprite(-2) }>X</CollisionButton>
			<SaveButton onClick={ _ => saveMapData() }>S</SaveButton>
		</EditorButtons>
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
	font-size: 6px;
	line-height: 8px;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	width: ${ SIZE_TILE }px;
	height: ${ SIZE_TILE }px;
	border-top: 1px solid #000;
	border-left: 1px solid #000;
	text-shadow: 0 0 1px #000, 0 0 1px #000, 0 0 1px #000, 0 0 1px #000, 0 0 1px #000, 0 0 1px #000, 0 0 1px #000, 0 0 1px #000;
`

const EditorButtons = styled.div`
	position: absolute;
	right: ${ SIZE_TILE * SIZE_SPRITESHEET }px;
	width: ${ SIZE_TILE }px;
	height: 100%;
`

const EditorButton = styled(Tile)`
	border-radius: 6px;
	border-bottom: 2px solid #666;
`

const CollisionButton = styled(EditorButton)`
	background-color: red;
`

const SaveButton = styled(EditorButton)`
	background-color: #bbb;
`

export default SpriteSheets

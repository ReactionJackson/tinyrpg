import React from 'react'
import styled from 'styled-components'
import { SIZE_INTERFACE, SIZE_TILE, SIZE_MAP, SPRITESHEET_KEY, SIZE_SPRITESHEET, THEMES } from '../constants'

const SpriteSheets = ({
	saveMapData,
	selectTile,
	selectEntity,
	toggleErasing,
	isErasing,
	theme = THEMES.TOWN_1 // not used yet
}) => (
	<Sheets>
		<Sheet type="tiles" id="01">
		{
			[...Array(SIZE_SPRITESHEET)].map((_, y) => (
				[...Array(SIZE_SPRITESHEET)].map((_, x) => (
					<Tile
						key={ x + y }
						onClick={ _ => selectTile({ x, y }) }
					>{ SPRITESHEET_KEY[(y * SIZE_SPRITESHEET) + x] }</Tile>
				))
			))
		}
		</Sheet>
		<Sheet type="entities" id="01">
		{
			[...Array(SIZE_SPRITESHEET)].map((_, y) => (
				[...Array(SIZE_SPRITESHEET)].map((_, x) => (
					<Tile
						key={ x + y }
						onClick={ _ => selectEntity({ x, y }) }
					/>
				))
			))
		}
		</Sheet>
		<EditorButtons>
			<DrawEraseButton onClick={ _ => toggleErasing() } isErasing={ isErasing } />
			<CollisionButton onClick={ _ => selectTile(-1) } isErasing={ isErasing } />
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
	background: url(${ ({ type, id }) => require(`../assets/sprites/${ type }_${ id }.png`) }) no-repeat left top / ${ SIZE_TILE * SIZE_SPRITESHEET }px tomato;
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
	border-bottom: 2px solid #888;
	border-left: 1px solid #444;
	border-right: 1px solid #444;
	&:active {
		height: 14px;
		margin-top: 2px;
		border-bottom: 0;
		opacity: 0.8;
	}
`

const SaveButton = styled(EditorButton)`
	background-color: #ddd;
`

const DrawEraseButton = styled(EditorButton)`
	${ ({ isErasing }) => `background: url(${ require('../assets/sprites/editor_icons.png') }) no-repeat left ${ !isErasing ? '0px' : '-14px' } top / auto 28px #fff;` }
`

const CollisionButton = styled(EditorButton)`
	${ ({ isErasing }) => `background: url(${ require('../assets/sprites/editor_icons.png') }) no-repeat left ${ !isErasing ? '-28px' : '-42px' } top / auto 28px #fff;` }
`

export default SpriteSheets

import React from 'react'
import styled from 'styled-components'
import { THEMES, TILES } from '../constants/world'
import { SIZE_TILE, SIZE_MAP } from '../constants/sizes'
import { Sprite } from './Sprite'

const PaintEditor = ({ theme = THEMES.TOWN_1, selectPaint }) => (
	<PaintsList>
	{ TILES[theme].map((texture, i) => (
		<Sprite
			texture={ texture }
			onClick={ _ => selectPaint(texture) }
		>{ i }</Sprite>
	)) }
	</PaintsList>
)

const PaintsList = styled.aside`
	font-size: 4px;
	display: flex;
	flex-wrap: wrap;
	position: absolute;
	bottom: calc(100% + ${ SIZE_TILE }px);
	width: ${ SIZE_TILE * SIZE_MAP }px;
`

export default PaintEditor

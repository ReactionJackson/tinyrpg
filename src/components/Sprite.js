import styled from 'styled-components'
import { SIZE_TILE } from '../constants'

export const Sprite = styled.div`
	position: relative;
	width: ${ SIZE_TILE }px;
	height: ${ SIZE_TILE }px;
	text-align: center;
	${ ({ grid = true }) => grid ? 'outline: 1px solid #000' : '' };
	transition: left linear 300ms, top linear 300ms;
	${ ({ x, y, type = 'tiles', id, size = 144 }) => `
		background-image: url(${ require(`../assets/sprites/${ type }_${ id }.png`) });
		background-size: ${ size }px ${ size }px;
		background-position: left ${ x * -SIZE_TILE }px top ${ y * -SIZE_TILE }px;
	`}
`

import styled from 'styled-components'
import { SIZE_TILE, PLAYER_SPEED } from '../constants'

export const Sprite = styled.div`
	position: relative;
	width: ${ SIZE_TILE }px;
	height: ${ SIZE_TILE }px;
	text-align: center;
	${ ({ grid = false }) => grid ? 'outline: 1px solid #000' : '' };
	transition: left linear ${ PLAYER_SPEED }ms, top linear ${ PLAYER_SPEED }ms;
	${ ({ x, y, type = 'tiles', id, size = 144 }) => `
		background-image: url(${ require(`../assets/sprites/${ type }_${ id }.png`) });
		background-size: ${ size }px ${ size }px;
		background-position: left ${ x * -SIZE_TILE }px top ${ y * -SIZE_TILE }px;
	`}
`

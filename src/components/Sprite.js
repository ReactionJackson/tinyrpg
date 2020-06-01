import styled from 'styled-components'
import { SIZES, SPEEDS } from '../constants'

export const Sprite = styled.div`
	position: relative;
	width: ${ SIZES.TILE }px;
	height: ${ SIZES.TILE }px;
	text-align: center;
	${ ({ grid = false }) => grid ? 'outline: 1px solid #000' : '' };
	transition: left linear ${ SPEEDS.PLAYER }ms, top linear ${ SPEEDS.PLAYER }ms;
	${ ({ x, y, type = 'tiles', id, size = 144 }) => `
		background-image: url(${ require(`../assets/sprites/${ type }_${ id }.png`) });
		background-size: ${ size }px ${ size }px;
		background-position: left ${ x * -SIZES.TILE }px top ${ y * -SIZES.TILE }px;
	`}
`

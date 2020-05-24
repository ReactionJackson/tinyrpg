import styled from 'styled-components'
import { SIZE_TILE } from '../constants'

export const Sprite = styled.div`
	position: relative;
	width: ${ SIZE_TILE }px;
	height: ${ SIZE_TILE }px;
	text-align: center;
	${ ({ x, y }) => x !== null && y !== null ? `
		background-image: url(${ require('../assets/sprites/links_awakening.png') });
		background-size: 688px auto;
		background-position: left ${ x * -SIZE_TILE }px top ${ y * -SIZE_TILE }px;
	` : `
		background-color: #fff;
	`}
	${ ({ grid }) => grid ? `
		outline: 1px solid #000;
		font-size: 4px;
		line-height: 5px;
		text-shadow: 0 0 1px #000, 0 0 1px #000, 0 0 1px #000, 0 0 1px #000;
	` : `
		font-size: 0;
		text-shadow: none;
	`}
	&::after {
		display: none;
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

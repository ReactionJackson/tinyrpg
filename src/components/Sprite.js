import styled from 'styled-components'
import { SIZE_TILE } from '../constants/sizes'

export const Sprite = styled.div`
	position: relative;
	width: ${ SIZE_TILE }px;
	height: ${ SIZE_TILE }px;
	line-height: ${ SIZE_TILE }px;
	text-align: center;
	background: ${ ({ texture }) => texture };
	border: ${ ({ grid }) => grid ? '1px solid #000' : 'none' };
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

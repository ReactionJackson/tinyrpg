import styled from 'styled-components'
import { SIZES } from '../constants'

export const GridContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	width: ${ SIZES.MAP * SIZES.TILE }px;
	height: ${ SIZES.MAP * SIZES.TILE }px;
`

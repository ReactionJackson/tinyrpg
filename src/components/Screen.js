import React from 'react'
import { SIZES } from '../constants'
import { convertCharToCoords } from '../utils/convertCharToCoords'
import { GridContainer } from './GridContainer'
import Tile from './Tile'

const Screen = ({ mapId = 0, mapData = {} }) => (
	<GridContainer>
  {[...Array(SIZES.MAP)].map((_, y) => (
		[...Array(SIZES.MAP)].map((_, x) => (
			<Tile
				tileSheet="01"
				entitySheet="01"
				tile={ convertCharToCoords(mapData.tiles[(y * SIZES.MAP) + x]) }
				entity={ convertCharToCoords(mapData.entities[(y * SIZES.MAP) + x]) }
			/>
		))
	))}
	</GridContainer>
)

export default Screen

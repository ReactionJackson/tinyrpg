import React from 'react'
import styled from 'styled-components'
import { SIZES } from '../constants'
import { GridContainer } from './GridContainer'
import Tile from './Tile'

const Screen = () => {

	// ...

	return (
		<GridContainer>
	  {[...Array(SIZES.MAP)].map((_, y) => (
			[...Array(SIZES.MAP)].map((_, x) => (
  			<Tile
  				tileSheet="01"
  				tile={{ x: 0, y: 0 }}
  				entitySheet="01"
  				entity={{ x: -1, y: 0 }}
  			/>
			))
		))}
		</GridContainer>
	)
}

export default Screen

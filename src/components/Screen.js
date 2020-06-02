import React from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import { SIZES } from '../constants'
import { GridContainer } from './GridContainer'
import Tile from './Tile'

const Screen = ({ mapId = 0, mapData = {} }) => {

	// ...

	return (
		<motion.div
			key={ mapId }
			transition={{ duration: 2, ease: 'linear' }}
			initial={{ x: `${ 100 * ((mapId % 2) - 1 === 0 ? -1 : 1) }%` }}
			animate={{ x: `0%` }}
			exit={{ x: `${ 100 * ((mapId % 2) - 1 === 0 ? -1 : 1) }%` }}
			style={{ position: 'absolute' }}
		>
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
		</motion.div>
	)
}

export default Screen

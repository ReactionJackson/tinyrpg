import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Sprite } from './Sprite'

const Tile = ({ tileSheet, tile, entitySheet, entity }) => {

	// ...

	return (
		<Sprite
    	type="tiles"
    	id={ tileSheet }
    	x={ tile.x }
    	y={ tile.y }
    >
			<Sprite
				type="entities"
				id={ entitySheet }
				x={ entity.x }
				y={ entity.y }
			/>
    </Sprite>
  )
}

export default Tile

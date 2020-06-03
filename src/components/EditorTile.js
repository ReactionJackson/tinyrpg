import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { TYPES } from '../constants'
import { Sprite } from './Sprite'

const EditorTile = ({
	paintType,
	isPainting,
	initialTile = { x: 0, y: 0 },
	initialEntity = { x: 0, y: 0 },
	tileSheet,
	entitySheet,
	tilePos,
	entityPos,
	updateSpriteData,
	updateCollisionData,
	updateTriggerData,
	hasCollision,
	hasTrigger,
}) => {

	const [ tile, setTile ] = useState(initialTile)
	const [ entity, setEntity ] = useState(initialEntity)

	useEffect(() => setTile(initialTile), [ initialTile ])	
	useEffect(() => setEntity(initialEntity), [ initialEntity ])

	const handleSelection = () => {
		if(paintType === TYPES.TILE) {
			if(tilePos === TYPES.COLLISION) {
				updateCollisionData()
			} else if(tilePos === TYPES.TRIGGER) {
				updateTriggerData()
			} else {
				setTile(tilePos)
				updateSpriteData()
			}
		} else if(paintType === TYPES.ENTITY) {
			setEntity(entityPos)
			updateSpriteData()
		}
	}

	return (
		<Sprite
			grid={ true }
    	type="tiles"
    	id={ tileSheet }
    	x={ tile.x }
    	y={ tile.y }
    	onMouseDown={ _ => handleSelection() }
    	onMouseOver={ _ => isPainting ? handleSelection() : null }
    >
			<Sprite
				type="entities"
				id={ entitySheet }
				x={ entity.x }
				y={ entity.y }
			/>
    	{ hasCollision ? <Collision /> : null }
    	{ hasTrigger ? <Trigger /> : null }
    </Sprite>
  )
}

const Marker = styled.div`
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
`

const Collision = styled(Marker)`
	opacity: 0.5;
	background-color: #f00;
`

const Trigger = styled(Marker)`
	background: url(${ require('../assets/sprites/editor_icons.png') }) left top -16px / 64px auto;
`

export default EditorTile

import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useListener } from '../hooks/useListener'
import { SIZE_MAP } from '../constants'
import { overworldMaps } from '../data/maps'
import { isDirectionalInput } from '../utils/isDirectionalInput'
import { Panel } from './Panel'
import Character from './Character'
import World from './World'

const Exploration = () => {

	const [ pos, setPos ] = useState({ x: 0, y: 0 })
	const [ flip, setFlip ] = useState(false) // this is bugged if moving from top right corner

	useListener('keyup', ({ code }) => {

		let newPos = pos

		switch(code) {
			case 'KeyW': // North
				if(newPos.y === 0) {
					newPos.y = SIZE_MAP - 1
				} else {
					newPos.y--
				}
				break
			case 'KeyD': // East
				if(newPos.x === SIZE_MAP - 1) {
					newPos.x = 0
				} else {
					newPos.x++
				}
				setFlip(false)
				break
			case 'KeyS': // South
				if(newPos.y === SIZE_MAP - 1) {
					newPos.y = 0
				} else {
					newPos.y++
				}
				break
			case 'KeyA': // West
				if(newPos.x === 0) {
					newPos.x = SIZE_MAP - 1
				} else {
					newPos.x--
				}
				setFlip(true)
				break
		}

		setPos({ ...newPos })

	}, [])

  return (
    <Panel width={ 3 } height={ 3 } x={ 1 } y={ 0 }>
      <Character pos={ pos } flip={ flip } />
      <World />
    </Panel>
  )
}

export default Exploration

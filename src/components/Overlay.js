import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { SIZE_WORLD } from '../constants'

const Overlay = () => {
	
	const [ isOpen, setIsOpen ] = useState(true)
	
	const toggleOverlay = ({ code }) => {
		if(code === 'KeyO') {
			setIsOpen(prev => !prev)
		}
	}
	
	useEffect(() => {
		document.addEventListener('keyup', toggleOverlay)
		return () => document.removeEventListener('keyup', toggleOverlay)
	}, [])
	
	return (
		<div style={{
			pointerEvents: 'none',
			position: 'absolute',
			right: 0,
			width: SIZE_WORLD,
			height: SIZE_WORLD,
			overflow: 'hidden'
		}}>
			<OverlayTop cover={ isOpen } />
			<OverlayLeft cover={ isOpen } />
			<OverlayBottom cover={ isOpen } />
			<OverlayRight cover={ isOpen } />
		</div>
	)
}

const OverlaySide = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	background-color: #000;
	transition: left steps(16) 1s, top steps(16) 1s;
`

const OverlayTop = styled(OverlaySide)`
	left: 0;
	top: ${ ({ cover }) => cover ? '-100%' : 0 };
`

const OverlayLeft = styled(OverlaySide)`
	left: ${ ({ cover }) => cover ? '-100%' : 0 };
	top: 0;
`

const OverlayBottom = styled(OverlaySide)`
	left: 0;
	top: ${ ({ cover }) => cover ? '100%' : 0 };
`

const OverlayRight = styled(OverlaySide)`
	left: ${ ({ cover }) => cover ? '100%' : 0 };
	top: 0;
`

export default Overlay

import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { SIZES } from './constants'
import { useListener } from './hooks/useListener'
import { getMapAtLocation } from './utils/getMapAtLocation'
import { Panel } from './components/Panel'
import World from './components/World'
import Party from './components/Party'
import Actions from './components/Actions'
import Dialog from './components/Dialog'
import Overlay from './components/Overlay'
import LevelEditor from './components/LevelEditor'

//////////////////////////////////////////////////////////////////////

const spritesheet = new Image()
spritesheet.src = require('./assets/sprites/tiles_01.png')

const draw = (ctx, { x, y }) => {
  ctx.drawImage(spritesheet, 0, 0, 16, 16, x, y, 16, 16)
}

const CanvasTest = () => {

  const canvasRef = useRef()
  const [ tiles, setTiles ] = useState([])
  const [ testingCanvas, setTestingCanvas ] = useState(false)

  useListener('keyup', ({ code }) => {
    if(code === 'KeyC') setTestingCanvas(!testingCanvas)
  }, [])

  useEffect(() => console.log(testingCanvas), [ testingCanvas ])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    tiles.forEach(tile => draw(ctx, tile))
  })

  const addTilePos = ({ clientX: x, clientY: y }) => {
    setTiles([ ...tiles, { x, y } ])
  }

  return (
    <div style={{ display: testingCanvas ? 'block' : 'none', zIndex: 100, position: 'fixed', left: 0, top: 0, width: '100%', height: '100%', background: '#1a1a1a' }}>
      <canvas
        ref={ canvasRef }
        onClick={ addTilePos }
        width="256"
        height="256"
        style={{ width: 256, height: 256, outline: '10px solid gold' }}
      />
    </div>
  )
}

//////////////////////////////////////////////////////////////////////

const Game = () => {
  
  useEffect(() => setTimeout(() => {
    console.clear()
  }, 300), [])

  return (
    <Interface>
      <CanvasTest />
      <Party />
      <Panel width={ 1 } height={ 1 } x={ 0 } y={ 3 } border>?</Panel>
      <Actions />
      <Dialog />
      <World />
      <Overlay />
      <LevelEditor />
    </Interface>
  )
}

export const Interface = styled.main`
  position: relative;
  width: ${ SIZES.INTERFACE }px;
  height: ${ SIZES.INTERFACE }px;
  background-color: tomato;
`

export default Game
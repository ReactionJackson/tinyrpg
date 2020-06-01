import React, { useEffect } from 'react'
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

// Interface:

const Game = () => {
  
  useEffect(() => setTimeout(() => {
    console.clear()
  }, 300), [])

  return (
    <Interface>
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
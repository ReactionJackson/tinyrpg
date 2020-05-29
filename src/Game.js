import React from 'react'
import styled from 'styled-components'
import { SIZE_INTERFACE } from './constants'
import { Panel } from './components/Panel'
import World from './components/World'
import Party from './components/Party'
import Actions from './components/Actions'
import Dialog from './components/Dialog'
import Overlay from './components/Overlay'

// Interface:

const Game = () => {
  return (
    <Interface>
      <Party />
      <Panel width={ 1 } height={ 1 } x={ 0 } y={ 3 } border>
        &nbsp;Quest<br/>>Items<br/>&nbsp;Equip<br/>&nbsp;Skill
      </Panel>
      <Actions />
      <Dialog />
      <World />
      <Overlay />
    </Interface>
  )
}

export const Interface = styled.main`
  position: relative;
  width: ${ SIZE_INTERFACE }px;
  height: ${ SIZE_INTERFACE }px;
  background-color: tomato;
`

export default Game
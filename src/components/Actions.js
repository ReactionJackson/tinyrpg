import React, { useState, Fragment } from 'react'
import { Panel } from './Panel'

const Actions = () => {
  // ...
  return (
    <div style={{ textAlign: 'center' }}>
      <Panel width={ 1 } height={ 1 } x={ 1 } y={ 3 } border>
        Action 1
      </Panel>
      <Panel width={ 1 } height={ 1 } x={ 2 } y={ 3 } border>
        Action 2
      </Panel>
      <Panel width={ 1 } height={ 1 } x={ 3 } y={ 3 } border>
        Action 3
      </Panel>
    </div>
  )
}

export default Actions

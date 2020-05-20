import React, { useState, Fragment } from 'react'
import { Panel } from './Panel'

const Party = () => {
  // ...
  return (
    <Fragment>
      <Panel width={ 1 } height={ 1 } x={ 0 } y={ 0 } border>
        >QUILLS<br/>
        HP&nbsp;9/&nbsp;9<br/>
        MP&nbsp;0/12<br/>
        BLM Lv2
      </Panel>
      <Panel width={ 1 } height={ 1 } x={ 0 } y={ 1 } border>
        YOHEFF<br/>
        HP99/99<br/>
        MP99/99<br/>
        WAR Lv1
      </Panel>
      <Panel width={ 1 } height={ 1 } x={ 0 } y={ 2 } border inactive>
        {/* ... */}
      </Panel>
    </Fragment>
  )
}

export default Party

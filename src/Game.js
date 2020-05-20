import React from 'react'
import { Interface } from './components/Interface'
import { Panel } from './components/Panel'
import Exploration from './components/Exploration'

// Interface:

const Game = () => {
  return (
    <Interface>
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
      <Panel width={ 1 } height={ 1 } x={ 0 } y={ 3 } border>
        &nbsp;Quest<br/>
        >Items<br/>
        &nbsp;Equip<br/>
        &nbsp;Skill
      </Panel>
      <Panel width={ 3 } height={ 1 } x={ 1 } y={ 3 } border>
        * De Battié<br />
        ‘Do you copy, commander!? We have the enemy's airship in our sights, over!’
      </Panel>
      <Exploration />
    </Interface>
  )
}

export default Game
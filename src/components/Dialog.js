import React, { useState, useEffect } from 'react'
import { Panel } from './Panel'

const Dialog = () => {
	
	const [ hidden, setHidden ] = useState(true)

	const toggleDialog = ({ code }) => {
		if(code === 'Space') {
			setHidden(prev => !prev)
		}
	}

	useEffect(() => {
		document.addEventListener('keyup', toggleDialog)
		return () => document.removeEventListener('keyup', toggleDialog)
	}, [])

	return (
    <Panel width={ 3 } height={ 1 } x={ 1 } y={ 3 } hidden={ hidden } border>
      * De Battié<br />
      ‘Do you copy, commander!? We have the enemy's airship in our sights, over!’
    </Panel>
	)
}

export default Dialog

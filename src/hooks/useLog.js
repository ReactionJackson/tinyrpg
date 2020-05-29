import { useEffect } from 'react'

export const useLog = (message, logData, clear = false) => {
	useEffect(() => {
		if(clear) console.clear()
		console.log(message, logData)
	}, [ logData ])
}

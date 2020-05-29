import { useEffect } from 'react'

export const useLog = (message, ...logData) => {
	useEffect(() => console.log(message, ...logData), [ logData ])
}

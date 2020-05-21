import { useEffect } from 'react'

export const useListener = (event, callback, deps = []) => {
  useEffect(() => {
    document.addEventListener(event, callback)
    return () => document.removeEventListener(event, callback)
  }, [ event, callback, ...deps ])
}

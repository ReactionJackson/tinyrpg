export const getDirectionMod = code => {
  switch(code) {
    case 'KeyW': return { x: 0, y: -1 }
    case 'KeyD': return { x: 1, y: 0 }
    case 'KeyS': return { x: 0, y: 1 }
    case 'KeyA': return { x: -1, y: 0 }
  }
}

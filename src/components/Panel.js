import styled from 'styled-components'
import { blockSize } from '../constants/settings'

export const Panel = styled.div`
  display: flex;
  justify-content: centerd;
  align-items: centerd;
  position: absolute;
  left: ${ ({ x }) => x * blockSize }px;
  top: ${ ({ y }) => y * blockSize }px;
  width: ${ ({ width }) => width * blockSize }px;
  height: ${ ({ height }) => height * blockSize }px;
  padding: ${ ({ border }) => border ? 12 : 0 }px;
  background-color: #000;
  overflow: hidden;
  transform: scale(${ ({ visible }) => visible ? 0 : 1 });
  transform-origin: center bottom;
  transition: transform steps(3, end) 150ms;
  &::after {
    content: '';
    display: ${ ({ border }) => border ? 'block' : 'none' };
    position: absolute;
    left: 2px;
    top: 2px;
    border: 3px solid ${ ({ inactive }) => inactive ? '#333' : '#eee' };
    border-radius: 4px;
    width: calc(100% - 4px);
    height: calc(100% - 4px);
  }
`
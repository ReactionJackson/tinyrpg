import styled from 'styled-components'
import { SIZES } from '../constants'

export const Panel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  overflow: hidden;
  left: ${ ({ x }) => x * SIZES.BLOCK }px;
  top: ${ ({ y }) => y * SIZES.BLOCK }px;
  width: ${ ({ width }) => width * SIZES.BLOCK }px;
  height: ${ ({ height }) => height * SIZES.BLOCK }px;
  padding: ${ ({ border }) => border ? 12 : 0 }px;
  background-color: #000;
  transform: scale(${ ({ hidden }) => hidden ? 0 : 1 });
  transform-origin: center bottom;
  transition: transform steps(4, end) 150ms;
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
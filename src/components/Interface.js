import styled from 'styled-components'
import { blockSize, interfaceSize } from '../constants/settings'

export const Interface = styled.main`
  position: relative;
  width: ${ interfaceSize * blockSize }px;
  height: ${ interfaceSize * blockSize }px;
  background-color: tomato;
`

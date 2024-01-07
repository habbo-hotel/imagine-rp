import { styled } from 'styled-components';

export const GameUIElement = styled.div`
  position: absolute;
  pointer-events: none; 
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
`

export const GameUIContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-family: Ubuntu !important;
  gap: ${({ theme }) => theme.space.oneUnit};
  padding: ${({ theme }) => theme.space.oneUnit};
  width: 100%;
`
import styled from "styled-components";

export const GameInfoBarElement = styled.div`
  background: ${({ theme }) => theme.color.s20};
  border: ${({ theme }) => `2px solid ${theme.color.s60}`};
  border-radius: ${({ theme }) => theme.radius.oneUnit};
  padding: ${({ theme }) => theme.space.oneUnit};
  width: 150px;
`
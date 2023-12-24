import styled from "styled-components";

export const CorpGridContainerElement = styled.div`
  align-items: center;
  background: ${({ theme }) => theme.color.s20};
  border: ${({ theme }) => `2px solid ${theme.color.s40}`};
  border-radius: ${({ theme }) => theme.radius.oneUnit};
  cursor: pointer;
  display: flex;
  flex: 1;
  gap: ${({ theme }) => theme.space.halfUnit};
  padding: ${({ theme }) => theme.space.halfUnit};
  &:hover {
    border-color: ${({ theme }) => theme.color.s50};
  }
`
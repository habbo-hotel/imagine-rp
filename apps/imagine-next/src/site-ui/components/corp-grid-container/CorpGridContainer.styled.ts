'use client';
import styled from "styled-components";

export const CorpGridContainerElement = styled.div`
  align-items: center;
  background: ${({ theme }) => theme.color.s20};
  border: ${({ theme }) => `2px solid ${theme.color.s40}`};
  border-radius: ${({ theme }) => theme.radius.oneUnit};
  cursor: pointer;
  display: flex;
  flex: 1;
  gap: ${({ theme }) => theme.space.oneUnit};
  padding: ${({ theme }) => theme.space.halfUnit};
  &:hover {
    border-color: ${({ theme }) => theme.color.s50};
  }
`

export const CorpGridContainerBadge = styled.img`
  height: 50px;
  width: 50px;
  background: ${({ theme }) => theme.color.s30};
  border-radius: ${({ theme }) => theme.radius.halfUnit};
  padding: ${({ theme }) => theme.space.halfUnit};
`

export const CorpGridContainerInfo = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  h2, p {
    margin: 0;
  }
`
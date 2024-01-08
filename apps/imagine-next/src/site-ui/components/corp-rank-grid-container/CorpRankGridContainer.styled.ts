'use client';
import styled from "styled-components";

export const CorpRankGridContainerElement = styled.div`
  background: ${({ theme }) => theme.color.s40};
  display: flex;
  flex: 1;
  gap: ${({ theme }) => theme.space.oneUnit};
  padding: ${({ theme }) => theme.space.oneUnit};
`
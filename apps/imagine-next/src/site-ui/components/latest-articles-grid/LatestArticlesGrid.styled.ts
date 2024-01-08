'use client';
import styled from "@emotion/styled";

export const LatestArticlesGridElement = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: ${({ theme }) => theme.space.twoUnits};
`


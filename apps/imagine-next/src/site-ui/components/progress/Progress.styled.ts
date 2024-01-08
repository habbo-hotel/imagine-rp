'use client';
import styled from "@emotion/styled";

export const ProgressContainer = styled.div`
  background: ${({ theme }) => theme.color.s20};
  border: ${({ theme }) => `2px solid ${theme.color.s30}`};
  border-radius: ${({ theme }) => theme.radius.oneUnit};
  padding: ${({ theme }) => theme.space.halfUnit};
  width: 100%;
`

export const ProgressElement = styled.progress`
  background: red;
  &&[value]::-webkit-progress-value {
    background: red;
  }
  padding-left: ${({ theme }) => theme.space.halfUnit};
  padding-right: ${({ theme }) => theme.space.halfUnit};
`
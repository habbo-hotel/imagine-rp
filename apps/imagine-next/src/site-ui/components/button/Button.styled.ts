'use client';
import styled from "@emotion/styled";

export const ButtonElement = styled.button`
  background: ${({ theme }) => theme.color.primary};
  border:${({ theme }) => `2px solid ${theme.color.s40}`};
  border-radius: ${({ theme }) => theme.radius.oneUnit};
  cursor: pointer;
  padding: ${({ theme }) => theme.space.oneUnit};
  opacity: 0.9;
  &:hover {
    opacity: 1;
  }
  :disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }
`
'use client';
import styled from "@emotion/styled";

export const DialogBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.color.s20};
  opacity: 0.5;
  z-index: 10;
`;

export const DialogContainer = styled.div`
  cursor: pointer;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`

export const DialogContent = styled.div`
  background: ${({ theme }) => theme.color.s30};
  border-radius: ${({ theme }) => theme.radius.oneUnit};
  border: ${({ theme }) => `2px solid ${theme.color.s50}`};
  cursor: initial;
  font-size: ${({ theme }) => theme.fontSize.oneUnit};
  gap: ${({ theme }) => theme.space.twoUnits};
  min-width: 800px;
  min-height: 450px;
  padding: ${({ theme }) => theme.space.oneUnit};
  z-index: 100;
`
'use client';
import styled from "@emotion/styled";

export const UserBadgeContainerGridElement = styled.div`
  border-radius: ${({ theme }) => theme.radius.oneUnit};
  display: flex;  
  gap: ${({ theme }) => theme.space.twoUnits};
`

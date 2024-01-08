'use client';
import styled from "@emotion/styled";

export const HighScoresContainerNavigation = styled.div`
  align-items: center;
  background: ${({ theme }) => theme.color.s20};
  border-radius: ${({ theme }) => theme.radius.oneUnit};
  display: flex;
  justify-content: space-between;
  font-size: ${({ theme }) => theme.fontSize.oneUnit};
  padding: ${({ theme }) => theme.space.oneUnit};
  width: 100%;

  .active {
    color: ${({ theme }) => theme.color.brand};
  }
  
  span {
    color: ${({ theme }) => theme.color.s60};
    font-weight: bold;
    text-decoration: none;
    
    &:hover {
      color: ${({ theme }) => theme.color.brand};
    }
  }
`
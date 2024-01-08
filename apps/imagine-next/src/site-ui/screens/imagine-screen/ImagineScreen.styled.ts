'use client';
import styled from "@emotion/styled";

export const ImagineLogoContainer = styled.div`
  background: ${({ theme }) => theme.color.s30};
  border:${({ theme }) => `2px solid ${theme.color.s40}`};
  border-radius: ${({ theme }) => theme.radius.oneUnit};
`
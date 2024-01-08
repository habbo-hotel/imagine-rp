'use client';
import styled from "@emotion/styled";

export const YoutubeVideoElement = styled.iframe`
  background: ${({ theme }) => theme.color.s20};
  border:${({ theme }) => `2px solid ${theme.color.s40}`};
  border-radius: ${({ theme }) => theme.radius.oneUnit};
  width: 100%;
`;
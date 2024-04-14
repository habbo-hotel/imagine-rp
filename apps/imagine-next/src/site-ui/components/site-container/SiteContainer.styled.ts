'use client';
import styled from "@emotion/styled";

export const SiteContainerElement = styled.div`
  overflow: auto;
  height: 100%;
  width: 100%;
  min-height: 100%;
  min-width: 100%;
`

export const PageContainerElement = styled.div`
  min-height: calc(100% - 380px);
  margin: 0 auto;
  width: 100%;
  height: calc(100% - 150px);
  max-width: ${({ theme }) => theme.maxWidth};
  overflow-x: hidden;
  padding: ${({ theme }) => theme.space.twoUnits};
`
import styled from "styled-components";

export const SiteContainerElement = styled.div`
  overflow: auto;
  height: 100%;
  min-height: 100%;
  width: 100%;
`

export const PageContainerElement = styled.div`
  height: calc(100% - 380px);
  margin: 0 auto;
  max-width: ${({ theme }) => theme.maxWidth};
  overflow-x: hidden;
  overflow-y: auto;
  padding: ${({ theme }) => theme.space.twoUnits};
`
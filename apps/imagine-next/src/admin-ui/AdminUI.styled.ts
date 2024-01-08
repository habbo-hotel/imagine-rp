import styled from "@emotion/styled";

export const ADMIN_SIDEBAR_WIDTH = 180;

export const SiteContainerElement = styled.div`
  display: flex;
  flex: 1;
`

export const PageContainerElement = styled.div`
  background: ${({ theme }) => theme.color.s10};
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.twoUnits};
  padding: ${({ theme }) => theme.space.twoUnits};
  margin-left: ${ADMIN_SIDEBAR_WIDTH - 8}px;
`
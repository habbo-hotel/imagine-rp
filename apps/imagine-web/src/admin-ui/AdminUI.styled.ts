import styled from "styled-components";

export const ADMIN_SIDEBAR_WIDTH = '150px';

export const SiteContainerElement = styled.div`
  display: flex;
  flex: 1;
  min-height: 100%;
  min-width: 100%;
`

export const PageContainerElement = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.twoUnits};
  padding: ${({ theme }) => theme.space.twoUnits};
  margin-left: ${ADMIN_SIDEBAR_WIDTH};
  width: calc(100 % - ${ADMIN_SIDEBAR_WIDTH});
`
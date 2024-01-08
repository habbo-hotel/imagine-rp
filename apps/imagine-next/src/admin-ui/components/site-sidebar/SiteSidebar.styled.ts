import styled from "@emotion/styled";
import { ADMIN_SIDEBAR_WIDTH } from "../../AdminUI.styled";

export const SiteSidebarElement = styled.div`
  background: ${({ theme }) => theme.color.s20};
  text-align: center;
  position: fixed;
  top: 0;
  left: 0;
  min-height: 100%;
  width: ${ADMIN_SIDEBAR_WIDTH}px;
  
  ul {
    list-style-type: none;
    margin: 0;
    padding: ${({ theme }) => theme.space.twoUnits};
  }

  li {
    color: ${({ theme }) => theme.color.s60};
    cursor: pointer;
    text-decoration: none;
    font-size: ${({ theme }) => theme.fontSize.threeUnits};
    margin-bottom: ${({ theme }) => theme.space.twoUnits};
    &:hover {
      color: ${({ theme }) => theme.color.s30};
    }
  }

  footer {
    position: absolute;
    bottom: 15px;
    left: 0;
    width: 100%;
  }
`
import styled from "styled-components";

export const DialogBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.color.s20};
  opacity: 0.5;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

export const DialogContainer = styled.div`
  background: ${({ theme }) => theme.color.s30};
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  z-index: 100;
  opacity: 1;
`;
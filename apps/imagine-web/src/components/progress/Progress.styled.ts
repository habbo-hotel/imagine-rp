import styled from "styled-components";

export const ProgressElement = styled.progress`
  background: red !important;
  border-radius: ${({ theme }) => theme.radius.oneUnit};
  width: 100%;
`
import styled from "@emotion/styled";

export const FormElement = styled.form`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.halfUnit};
  width: 100%;
  label {
    font-weight: 500;
    font-size: ${({ theme }) => theme.fontSize.oneUnit};
  }
`
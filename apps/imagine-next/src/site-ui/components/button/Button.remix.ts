'use client';
import styled from "@emotion/styled";
import { Button } from "./Button";

export const ButtonBrand = styled(Button)`
  background: ${({ theme }) => theme.color.brand};
`

export const ButtonDanger = styled(Button)`
  border-color: #7C0F0F;
  color: #7C0F0F;
`

export const ButtonSuccess = styled(Button)`
  background: ${({ theme }) => theme.color.success};

`

export const ButtonNoBorder = styled(Button)`
  border-color: transparent;
  color: ${({ theme }) => theme.color.brand};
`
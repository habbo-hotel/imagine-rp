'use client';
import { darken } from 'polished';
import styled from "@emotion/styled";
import { Button } from "./Button";

export const ButtonBrand = styled(Button)`
  color: ${({ theme }) => theme.color.brandText};
  background: ${({ theme }) => theme.color.brand};
  border-color: ${({ theme }) => darken(20, theme.color.brand)};
`

export const ButtonDanger = styled(Button)`
  border-color: #7C0F0F;
  color: #7C0F0F;
  border-color: ${({ theme }) => darken('#7C0F0F', '20%')};
`

export const ButtonSuccess = styled(Button)`
  background: ${({ theme }) => theme.color.success};
  border-color: ${({ theme }) => darken(20, theme.color.success)};

`

export const ButtonClear = styled(Button)`
  background: none;
  border-color: ${({ theme }) => darken(20, theme.color.brand)};
  color: ${({ theme }) => theme.color.brand};
`
import { HTMLProps } from "react";

export interface ProgressProps extends HTMLProps<HTMLProgressElement> {
  percent: number;
}
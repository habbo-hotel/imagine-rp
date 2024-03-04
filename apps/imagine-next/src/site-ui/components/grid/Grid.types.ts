import { GridSizes } from "@imagine-cms/web";
import { HTMLProps, ReactNode } from "react";

export interface GridProps extends Omit<HTMLProps<HTMLDivElement>, 'size'> {
  children: ReactNode;
  size?: GridSizes
}
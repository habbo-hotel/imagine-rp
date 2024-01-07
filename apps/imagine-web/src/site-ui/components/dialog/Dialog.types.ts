import { ReactNode } from "react";

export interface DialogProps {
  children: ReactNode;
  onToggle(): void;
}
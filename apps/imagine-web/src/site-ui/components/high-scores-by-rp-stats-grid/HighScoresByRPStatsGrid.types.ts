import { RPStatsOrderBy } from "@imagine-cms/client";
import { ReactNode } from "react";

export interface HighScoresByRPStatsGridProps {
  orderBy: RPStatsOrderBy;
  children: ReactNode;
}
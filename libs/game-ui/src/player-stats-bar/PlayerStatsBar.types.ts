import { ClickedPlayer } from "../clicked-player-stats-bar/ClickedPlayerStatsBar.types";

export interface PlayerStatsBarProps {
  player: ClickedPlayer;
  showHunger?: boolean;
  showArmor?: boolean;
}
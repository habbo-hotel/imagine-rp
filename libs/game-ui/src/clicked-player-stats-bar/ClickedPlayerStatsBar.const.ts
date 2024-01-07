import { ClickedPlayer } from "./ClickedPlayerStatsBar.types";

export function parseClickedPlayerStats(clickedPlayerEventData: string): ClickedPlayer {
  const parsedPlayer = clickedPlayerEventData.split(',');
  return {
    userID: Number(parsedPlayer[0]),
    username: parsedPlayer[1],
    look: parsedPlayer[2],
    healthCurrent: Number(parsedPlayer[3]),
    energyCurrent: Number(parsedPlayer[4]),
    armorCurrent: Number(parsedPlayer[5]),
    hungerCurrent: Number(parsedPlayer[6]),
  }
}
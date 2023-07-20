import { GameDataPlayer } from "../interfaces/game-data.interface";
import { Player } from "../interfaces/player.interface";

export const sortPlayers = (players: Player[]): Player[] => {
  return players.sort((a: Player, b: Player) => b.percent - a.percent);
};

export const getPercent = (wins: number, games: number): string => {
  if (!games) {
    return '0.00'
  }
  return ((wins / games) * 100).toFixed(2);
};

export const hasInvalidMpr = (playerMpr: GameDataPlayer[]): boolean => {
  return playerMpr.length === 0 || playerMpr.some(player => !player.mpr);
}
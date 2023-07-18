import { Player } from "./player.interface";

export interface GameData {
    winner?: string;
    players: GameDataPlayer[]
}

export interface GameDataPlayer {
    name: string;
    mpr: string;
}
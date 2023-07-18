import { SupabaseClient } from "@supabase/supabase-js";
import { GameData } from "../interfaces/game-data.interface";

export const useSendGameData = (supabaseInstance: SupabaseClient) => {
  const sendGameData = async (gameData: GameData) => {
    const { data, error } = await supabaseInstance
      .from("Games")
      .insert(gameData)
      .select();
  };

  const updatePlayersData = (gameData: GameData) => {
    const updateWinner = supabaseInstance.rpc("incrementwins", {
      winner: gameData.winner,
    });
    const updateGamesCounter = gameData.players.map((player) => {
      return supabaseInstance
        .rpc("incrementgamescounter", { player: player.name })
        .then(() =>
          supabaseInstance.rpc("updatempravg", {
            player_name: player.name,
            game_mpr: player.mpr,
          })
        );
    });

    return [...updateGamesCounter, updateWinner];
  };

  return { sendGameData, updatePlayersData };
};
import { useState } from "react";
import { GameData } from "../interfaces/game-data.interface";
import { SupabaseClient } from "@supabase/supabase-js";

export const useGameData = (supabaseInstance: SupabaseClient) => {
  const [gameData, setGameData] = useState<GameData[]>([]);

  const getGameData = async () => {
    const { data } = await supabaseInstance.from("Games").select("*");

    if (data) {
      setGameData(data);
    }
  };

  return {
    gameData,
    getGameData,
  };
};

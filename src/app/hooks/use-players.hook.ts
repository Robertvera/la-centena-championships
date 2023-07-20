import { Player } from "../interfaces/player.interface";
import { SupabaseClient } from "@supabase/supabase-js";
import { atom, useAtom } from "jotai";
import { getPercent, sortPlayers } from "../utils/players-utils";

export const playersAtom = atom<Player[] | undefined>(undefined);

export const usePlayers = (supabaseInstance?: SupabaseClient) => {
  const [players, setPlayers] = useAtom(playersAtom);

  const getAllPlayers = async () => {
    if (supabaseInstance) {
      const { data } = await supabaseInstance.from("Player").select("*");

      if (data) {
        data.forEach((player) => {
          player.percent = getPercent(player.wins, player.games);
        });

        setPlayers(sortPlayers(data));
      }
    }
  };

  return {
    players,
    getAllPlayers,
  };
};

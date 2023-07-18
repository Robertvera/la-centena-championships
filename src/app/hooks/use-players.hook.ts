import { useState } from "react";
import { Player } from "../interfaces/player.interface";
import { SupabaseClient } from "@supabase/supabase-js";
import { atom, useAtom } from "jotai";

export const playersAtom = atom<Player[] | undefined>(undefined);

export const usePlayers = (supabaseInstance?: SupabaseClient) => {
  const [players, setPlayers] = useAtom(playersAtom);

  const getAllPlayers = async () => {
    if (supabaseInstance) {
      const { data } = await supabaseInstance.from("Player").select("*");

      if (data) {
        setPlayers(data);
      }
    }
  };

  return {
    players,
    getAllPlayers,
  };
};

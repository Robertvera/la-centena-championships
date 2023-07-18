/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Header from "@/components/header";
import List from "@/components/list";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { usePlayers } from "./hooks/use-players.hook";
import { useEffect } from "react";
import Modal from "@/components/modal";
import { useSendGameData } from "./hooks/use-send-game-data.hook";

export default function Home() {
  const supabase = createClientComponentClient();
  const { getAllPlayers } = usePlayers(supabase);
  const { sendGameData, updatePlayersData } = useSendGameData(supabase);

  useEffect(() => {
    getAllPlayers();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center gap-3">
      <Header />
      <List />
      <Modal sendGameData={sendGameData} updatePlayersData={updatePlayersData}/>
    </main>
  );
}

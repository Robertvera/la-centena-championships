/* eslint-disable @next/next/no-img-element */
import { GameData, GameDataPlayer } from "@/app/interfaces/game-data.interface";
import { ChangeEvent, FC, SetStateAction } from "react";
import emptyTrophy from "../../public/trophy-empty.svg";
import fullTrophy from "../../public/trophy-full.svg";

interface Props {
  name: string;
  setPlayerMpr: React.Dispatch<SetStateAction<GameDataPlayer[]>>;
  playerMpr: GameDataPlayer[];
  setWinner: React.Dispatch<SetStateAction<string>>;
  winner: string;
}

const PlayerMpr: FC<Props> = ({ name, setPlayerMpr, playerMpr, setWinner, winner }) => {
  const playerIsNew = !playerMpr.some((player) => player.name === name);

  const updateMpr = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (playerMpr.length > 0 && !playerIsNew) {
      const updatedPlayerMpr = playerMpr.map((player) =>
        player.name === name ? { ...player, mpr: value } : player
      );

      setPlayerMpr(updatedPlayerMpr);
    } else if (playerMpr.length === 0) {
      setPlayerMpr([{ name, mpr: value }]);
    } else if (playerIsNew) {
      setPlayerMpr([...playerMpr, { name, mpr: value }]);
    }
  };

  const setGameWinner = () => {
    setWinner(name);
  }

  return (
    <div className="border p-3 bg-green-200">
      <div className="relative mt-2 rounded-md shadow-sm">
        <div className="flex justify-between">
          <div className="pointer-events-none inset-y-0 left-0 flex items-center">
            <span className="text-gray-900 sm:text-sm">{name}</span>
          </div>
          <div className="mb-1" onClick={setGameWinner}>
            <img
              src={ winner === name ? fullTrophy.src : emptyTrophy.src}
              alt="empty-trophy"
              width="25px"
            />
          </div>
        </div>
        <input
          type="number"
          name="mpr"
          id="mpr"
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Insert MPR"
          onChange={updateMpr}
        />
      </div>
    </div>
  );
};

export default PlayerMpr;

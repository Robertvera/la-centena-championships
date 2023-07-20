import { usePlayers } from "@/app/hooks/use-players.hook";
import { Player } from "@/app/interfaces/player.interface";
import { FC } from "react";
import Spinner from "./spinner";

const List: FC = () => {
  const { players } = usePlayers();
  if (!players) {
    return <Spinner />; 
  }

  return (
    <div className="w-11/12 text-lg">
      <table className="w-full">
        <tbody>
          <tr className="bg-red-500 text-gray-50">
            <th>Player</th>
            <th>%</th>
            <th>Wins</th>
            <th>Games</th>
            <th>~MPR</th>
          </tr>
          {players?.map((player: Player) => {
            const { id, name, wins, games, mpr, percent } = player;

            return (
              <tr key={id} className="border-y border-slate-400">
                <td className="font-bold">{name}</td>
                <td className="text-center">{`${percent} %`}</td>
                <td className="text-center">{wins}</td>
                <td className="text-center">{games}</td>
                <td className="text-center">{mpr.toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default List;

import { usePlayers } from "@/app/hooks/use-players.hook";
import { Player } from "@/app/interfaces/player.interface";
import { FC } from "react";

const List: FC = () => {
  const { players } = usePlayers();
  if (!players) null;

  const getPercent = (wins: number, games: number): string => {
    return ((wins / games) * 100).toFixed(2);
  };

  return (
    <div className="w-full">
      <table className="w-full">
        <tbody>
          <tr>
            <th>Player</th>
            <th>%</th>
            <th>Wins</th>
            <th>Games</th>
            <th>~MPR</th>
          </tr>
          {players?.map((player: Player) => {
            const { id, name, wins, games, mpr } = player;

            return (
              <tr key={id}>
                <td className="text-center">{name}</td>
                <td className="text-center">{`${getPercent(
                  wins,
                  games
                )} %`}</td>
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

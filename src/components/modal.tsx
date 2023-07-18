import { FC, Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import NewGameButton from "./new-game-button";
import AddPlayers from "./add-players";
import { GameData, GameDataPlayer } from "@/app/interfaces/game-data.interface";
import { usePlayers } from "@/app/hooks/use-players.hook";
import { Player } from "@/app/interfaces/player.interface";
import { PostgrestSingleResponse } from "@supabase/postgrest-js";

interface Props {
  sendGameData: (gameData: GameData) => Promise<void>;
  updatePlayersData: (gameData: GameData) => PromiseLike<PostgrestSingleResponse<any>>[]
}

const Modal: FC<Props> = ({ sendGameData, updatePlayersData }) => {
  const [open, setOpen] = useState(false);
  const [gameData, setGameData] = useState<GameData>();
  const [playerMpr, setPlayerMpr] = useState<GameDataPlayer[]>([]);
  const [winner, setWinner] = useState<string>("");
  const { players } = usePlayers();

  const handleSaveButton = async () => {
    const winnerPlayer = getWinner(winner);
    setGameData({ winner: winnerPlayer?.name, players: playerMpr });
  };

  useEffect(() => {
    const fetchData = async () => {
      if (gameData) {
        try {
          const data = await sendGameData(gameData);

          if (players) {
            await Promise.all(updatePlayersData(gameData));
            setOpen(false);
            window.location.reload();
          }
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchData();
  }, [gameData, sendGameData]);

  const getWinner = (winnerName: string): Player | undefined => {
    const winner = players?.filter((player) => {
      return player.name === winnerName;
    });
    if (winner) {
      return winner[0];
    }
  };

  return (
    <>
      <NewGameButton openModal={setOpen} />
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="w-full relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"></div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          New Game
                        </Dialog.Title>
                        <div className="mt-2">
                          <AddPlayers
                            setGameData={setGameData}
                            playerMpr={playerMpr}
                            setPlayerMpr={setPlayerMpr}
                            setWinner={setWinner}
                            winner={winner}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={handleSaveButton}
                    >
                      Save
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default Modal;

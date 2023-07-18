import React, { FC, Fragment, SetStateAction, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Player } from "@/app/interfaces/player.interface";
import { usePlayers } from "@/app/hooks/use-players.hook";
import PlayerMpr from "./player-mpr";
import { GameData, GameDataPlayer } from "@/app/interfaces/game-data.interface";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface Props {
  setGameData: React.Dispatch<SetStateAction<GameData | undefined>>;
  setPlayerMpr: React.Dispatch<SetStateAction<GameDataPlayer[]>>;
  playerMpr: GameDataPlayer[];
  setWinner: React.Dispatch<SetStateAction<string>>;
  winner: string;
}

const AddPlayers: FC<Props> = ({ setGameData, setPlayerMpr, playerMpr, setWinner, winner }) => {
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
  const { players } = usePlayers();

  const addToSelected = (newSelected: any) => {
    setSelectedPlayers([...selectedPlayers, ...[newSelected]]);
  };

  if (!players) null;

  return (
    <>
      <Listbox value={selectedPlayers} onChange={addToSelected}>
        {({ open }) => (
          <>
            <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">
              Add players
            </Listbox.Label>
            <div className="relative mt-2">
              <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                <span className="flex items-center">
                  <span className="ml-3 block truncate">Select Players</span>
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="static z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {players?.map((player) => (
                    <Listbox.Option
                      key={player.id}
                      className={({ active }) => {
                        return classNames(
                          active ? "bg-indigo-600 text-white" : "text-gray-900",
                          "relative cursor-default select-none py-2 pl-3 pr-9"
                        );
                      }}
                      value={player}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex items-center">
                            <span
                              className={classNames(
                                selected ? "font-semibold" : "font-normal",
                                "ml-3 block truncate"
                              )}
                            >
                              {player.name}
                            </span>
                          </div>

                          {selected ? (
                            <span
                              className={classNames(
                                active ? "text-white" : "text-indigo-600",
                                "absolute inset-y-0 right-0 flex items-center pr-4"
                              )}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
      <div className="flex flex-col gap-1 mt-2">
        {selectedPlayers.map((player) => {
          return <PlayerMpr key={player.id} name={player.name} playerMpr={playerMpr} setPlayerMpr={setPlayerMpr} setWinner={setWinner} winner={winner} />;
        })}
      </div>
    </>
  );
};

export default AddPlayers;

import { FC } from "react";

interface Props {
    openModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewGameButton: FC<Props> = ({ openModal }) => {
  const showModal = () => {
    openModal(true);
  };

  return (
    <button
      onClick={showModal}
      className="bg-red-500 text-white font-bold py-2 px-4 rounded-full"
    >
      New Game
    </button>
  );
};

export default NewGameButton;

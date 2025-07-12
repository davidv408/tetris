import type { FC } from "react";
import Modal from "../Modal/Modal";

interface GameOverModalProps {
  onRestart: () => void;
}

const GameOverModal: FC<GameOverModalProps> = ({ onRestart }) => {
  return (
    <Modal
      title="Game Over"
      controls={<button onClick={onRestart}>Restart</button>}
    ></Modal>
  );
};

export default GameOverModal;

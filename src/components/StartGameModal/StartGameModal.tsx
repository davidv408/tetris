import type { FC } from "react";
import Modal from "../Modal/Modal";

interface StartGameModalProps {
  onStart: () => void;
}

const StartGameModal: FC<StartGameModalProps> = ({ onStart }) => {
  return (
    <Modal
      title="Tetris"
      body={
        <div>
          <p>
            In Tetris, shapes called tetrominoes fall from the top of the
            screen. Your goal is to rotate and move them left or right to fit
            them together and form complete horizontal lines. When a line is
            filled, it disappears, and you earn points. The game ends when the
            stack of pieces reaches the top.
          </p>
          <h3>Controls</h3>
          <ul>
            <li>
              Left/Right/Down Arrow - Move the piece left, right, or down one
              space.
            </li>
            <li>Up Arrow - Rotate the pice.</li>
          </ul>
        </div>
      }
      controls={<button onClick={onStart}>Start</button>}
    />
  );
};

export default StartGameModal;

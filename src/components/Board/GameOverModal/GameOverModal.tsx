import type { FC } from "react";
import styles from "./GameOverModal.module.css";

interface GameOverModalProps {
    onRestart: () => void;
}

const GameOverModal: FC<GameOverModalProps> = ({onRestart}) => {
    return <div className={styles.modal}>
        <h2>Game Over!</h2>
        <button onClick={onRestart}>Restart</button>
    </div>
};

export default GameOverModal;
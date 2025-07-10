import { useState } from "react";
import styles from "./App.module.css";
import Board from "./components/Board/Board";
import GameOverModal from "./components/GameOverModal/GameOverModal";

function App() {
  const [gameIsOver, setGameIsOver] = useState(false);
  const [boardKey, setBoardKey] = useState(0);

  return (
    <div className={styles.container}>
      <Board
        key={boardKey}
        gameIsOver={gameIsOver}
        onGameIsOver={() => setGameIsOver(true)}
      ></Board>
      {gameIsOver && (
        <GameOverModal
          onRestart={() => {
            setGameIsOver(false);
            setBoardKey((boardKey) => boardKey + 1);
          }}
        />
      )}
    </div>
  );
}

export default App;

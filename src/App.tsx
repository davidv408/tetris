import { useState } from "react";
import styles from "./App.module.css";
import Board from "./components/Board/Board";
import GameOverModal from "./components/GameOverModal/GameOverModal";
import StartGameModal from "./components/StartGameModal/StartGameModal";
import { GameStatus } from "./interfaces/GameStatus";

function App() {
  const [gameStatus, setGameStatus] = useState<GameStatus>(
    GameStatus.START_SCREEN,
  );
  const [boardKey, setBoardKey] = useState(0);

  return (
    <div className={styles.container}>
      {gameStatus !== GameStatus.START_SCREEN && (
        <Board
          key={boardKey}
          gameIsOver={gameStatus === GameStatus.GAME_OVER}
          onGameIsOver={() => setGameStatus(GameStatus.GAME_OVER)}
        ></Board>
      )}
      {gameStatus === GameStatus.START_SCREEN && (
        <StartGameModal
          onStart={() => {
            setGameStatus(GameStatus.STARTED);
          }}
        ></StartGameModal>
      )}
      {gameStatus === GameStatus.GAME_OVER && (
        <GameOverModal
          onRestart={() => {
            setGameStatus(GameStatus.GAME_OVER);
            setBoardKey((boardKey) => boardKey + 1);
          }}
        />
      )}
    </div>
  );
}

export default App;

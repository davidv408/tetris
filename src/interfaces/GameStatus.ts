export const GameStatus = {
  START_SCREEN: "START_SCREEN",
  STARTED: "STARTED",
  GAME_OVER: "GAME_OVER",
} as const;

export type GameStatus = keyof typeof GameStatus;

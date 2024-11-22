"use client";

import { useEffect, useState } from "react";
import GameBox from "./components/GameBox";

const INITAL_GAME_STATE = {
  1: null,
  2: null,
  3: null,
  4: null,
  5: null,
  6: null,
  7: null,
  8: null,
  9: null,
};

export default function Home() {
  const [gameState, setGameState] = useState(INITAL_GAME_STATE);
  const [isGameComplete, setIsGameComplete] = useState<boolean>(false);
  const [turn, setTurn] = useState<boolean>(false);
  const onResetClick = () => {
    setGameState(INITAL_GAME_STATE);
    setTurn(false);
    setIsGameComplete(false);
  };
  const checkWinner = (currentGameState: any) => {
    const winningCombinations = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [1, 5, 9],
      [3, 5, 7],
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        currentGameState[a] !== null && // Ensure the cell is not empty
        currentGameState[a] === currentGameState[b] && // Check if a equals b
        currentGameState[a] === currentGameState[c] // Check if a equals c
      ) {
        return currentGameState[a]; // Return the winner (either "X" or "O")
      }
    }

    // If no winner is found, return null
    return null;
  };
  useEffect(() => {
    if (checkWinner(gameState)) {
      setIsGameComplete(true);
    }
  }, [gameState]);
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="grid grid-cols-3">
        {Array.from(Object.keys(gameState)).map((v, i, a) => {
          return (
            <div className="w-parent" key={v}>
              <GameBox
                boxId={v}
                gameState={gameState}
                setGameState={setGameState}
                turn={turn}
                setTurn={setTurn}
                isGameComplete={isGameComplete}
              />
            </div>
          );
        })}
      </div>
      <div className="flex flex-col justify-center p-5 w-56">
        {!isGameComplete && (
          <div className="text-center">{turn ? "Turn : O" : "Turn: X"}</div>
        )}
        {isGameComplete && (
          <div className="text-center">{checkWinner(gameState)} is Winner!</div>
        )}
        <button
          className="border px-2 py-1 mt-2 rounded-md"
          onClick={onResetClick}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

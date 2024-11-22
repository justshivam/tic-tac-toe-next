"use client";

import React from "react";

type GameBoxProps = {
  boxId: string;
  gameState: any;
  setGameState: (arg0: any) => void;
  turn: boolean;
  setTurn: (arg0: boolean) => void;
  isGameComplete: boolean;
};

export default function GameBox({
  boxId,
  gameState,
  turn,
  setTurn,
  setGameState,
  isGameComplete,
}: GameBoxProps) {
  const onBoxClick = () => {
    if (gameState[boxId] || isGameComplete) return;
    const newGameState = { ...gameState };
    newGameState[boxId] = turn ? "O" : "X";
    setGameState(newGameState);
    setTurn(!turn);
  };
  return (
    <div
      className="h-28 w-28 border flex justify-center items-center"
      onClick={onBoxClick}
    >
      <div className="text-center text-4xl">{gameState[boxId]}</div>
    </div>
  );
}

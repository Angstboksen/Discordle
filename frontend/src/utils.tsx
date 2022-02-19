import { useEffect, useRef } from "react";
import { LetterBoxColor, LetterObject, WordleDifficulty } from "./types";

export const createDefaultBoard = (difficulty: WordleDifficulty) => {
  const board: LetterObject[][] = [];
  for (let i = 0; i < difficulty; i++) {
    const row: LetterObject[] = [];
    for (let i = 0; i < 5; i++) {
      row.push({ body: "", color: LetterBoxColor.DEFAULT, priority: 0 });
    }
    board.push(row);
  }
  return board;
};

export const useEventListener = (
  eventName: string,
  handler: (event: Event) => void,
  element = window
) => {
  const savedHandler = useRef(handler);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const eventListener = (event: Event) => savedHandler.current(event);
    element.addEventListener(eventName, eventListener);
    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
};

export const calculateLetterObjectColor = (
  index: number,
  solution: string,
  input: string
) => {
  let color = LetterBoxColor.WRONG;
  let priority = 2;
  const letter = input[index]
  if (letter === solution[index]) {
    color = LetterBoxColor.CORRECT;
    priority = 3
  } else if (solution.includes(letter)) {
    color = LetterBoxColor.INCORRECT_POSITION;
    priority = 1;
  }
  return { body: letter, color, priority };
};

export const KEYWORDLAYOUT = "QWERTYUIOP|ASDFGHJKL|ZXCVBNM";

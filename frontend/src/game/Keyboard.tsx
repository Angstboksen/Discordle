/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import LetterBox from "./LetterBox";
import { LetterBoxColor, LetterBoxSize, LetterObject } from "../types";
import { KEYWORDLAYOUT } from "../utils";

interface KeyBoardProps {
  usedLetterObjects: Map<string, LetterObject>;
}

const Keyboard: React.FC<KeyBoardProps> = ({ usedLetterObjects }) => {
  const [alphabet] = useState<string[]>(KEYWORDLAYOUT.split("|"));
  const [letterObjects, setLetterObjects] = useState<LetterObject[][]>([]);

  const createKeyBoardLetterObjects = () => {
    const letterObjects: LetterObject[][] = [];
    for (const row of alphabet) {
      const rowLetters: LetterObject[] = [];
      const letters = row.split("");
      for (const letter of letters) {
        const letterObject = usedLetterObjects.get(letter);
        rowLetters.push(
          letterObject !== undefined
            ? letterObject
            : { body: letter, color: LetterBoxColor.DEFAULT, priority: 0 }
        );
      }
      letterObjects.push(rowLetters);
    }
    return letterObjects;
  };

  useEffect(() => {
    setLetterObjects(createKeyBoardLetterObjects());
  }, [usedLetterObjects]);

  return (
    <div className="keyboard">
      {letterObjects.map((row: LetterObject[], key: number) => {
        return (
          <div key={key} className="keyboard-row">
            {row.map((letterObject: LetterObject, key: number) => (
              <LetterBox
                key={key}
                letter={letterObject}
                size={LetterBoxSize.KEYBOARD}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default Keyboard;

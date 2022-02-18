import { LetterBoxColor, LetterObject, WordleDifficulty } from "./types";

export const createDefaultBoard = (difficulty: WordleDifficulty) => {
    const board: LetterObject[][] = []
    for (let i = 0; i < difficulty; i++){
        const row: LetterObject[] = []
        for (let i = 0; i < 5; i++){
            row.push({body: "", color: LetterBoxColor.DEFAULT})
        }
        board.push(row)
    }
    return board
}
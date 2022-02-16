import { WordleDifficulty } from "./types";
import Wordle from "./Wordle";

export default class WordleManager {
  games: Map<string, Wordle>;

  constructor() {
    this.games = new Map();
  }

  public startNewGame(
    playerID: string,
    difficulty = WordleDifficulty.MEDIUM
  ): void {
    if (!this.games.has(playerID)) {
      this.games.set(playerID, new Wordle(playerID, difficulty));
    }
  }

  public getGame(playerID: string): Wordle {
    if(!this.games.has(playerID)) {
        this.startNewGame(playerID)
    }
    return this.games.get(playerID)!
  }

  public endGame(playerID: string) {
    this.games.delete(playerID);
  }
}

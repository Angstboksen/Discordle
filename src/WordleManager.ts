import { User } from "discord.js";
import { WordleDifficulty } from "./types";
import Wordle from "./Wordle";

export default class WordleManager {
  games: Map<string, Wordle>;

  constructor() {
    this.games = new Map();
  }

  public startNewGame(
    player: User,
    difficulty = WordleDifficulty.MEDIUM
  ): void {
    if (!this.games.has(player.id)) {
      this.games.set(player.id, new Wordle(player, difficulty));
    }
  }

  public getGame(player: User): Wordle {
    if(!this.games.has(player.id)) {
        this.startNewGame(player)
    }
    return this.games.get(player.id)!
  }

  public endGame(player: User) {
    this.games.delete(player.id);
  }
}

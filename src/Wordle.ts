import { MessageEmbed, User} from "discord.js";
import { WordleDifficulty } from "./types";
import { words } from "./words";

export default class Wordle {
  private player: User
  private board: string[][];
  private difficulty: WordleDifficulty;
  private solution: string;
  isWon: boolean = false
  round: number = 0;
  previousMessageId: string = "";

  constructor(player: User, difficulty: WordleDifficulty) {
    this.player = player;
    this.difficulty = difficulty;
    this.board = this.generateBoard();
    this.solution = this.fetchSolution();
    this.round = 0;

    console.log("Generated new wordle for player " + this.player.username + " with difficulty " + this.difficulty + " and solution " + this.solution);
  }

  private fetchSolution() {
    return words[Math.floor(Math.random() * words.length)].toUpperCase();
  }

  private generateBoard() {
    let board: string[][] = [];
    for (let i = 0; i < this.difficulty; i++) {
      board.push([" ☐ ", " ☐ ", " ☐ ", " ☐ ", " ☐ "]);
    }
    return board;
  }

  private getFormattedWord(word: string[]) {
    let result = ""
    for (let i = 0; i < this.solution.length; i++) {
        let letter = word[i]
        if (letter == " ☐ "){
            return word.join(" ")
        } 
        
        if (letter == this.solution[i]) {
            result += ` **${letter}** `;
        } else if (this.solution.includes(letter)) {
            result += ` *${letter}* `;
        } else {
            result +=  ` ~~${letter}~~ `; 
        }
    }
    return result
  }


  public getBoardState() {
    let message: string = "";
    for (let i = 0; i < this.board.length; i++) {
        message += `\`${i+1})\` ${this.getFormattedWord(this.board[i])}\n`;
    }
    if(this.isWon){
        message += `\n:partying_face: YOU WON! :tada:\n The word was \`${this.solution}\` :brain:`
    }
    return message;
  }

  public updateBoard(guess: string){
      this.board[this.round] = guess.split("")
      this.round++
      if(guess == this.solution) {
          this.isWon = true
      }
  }

  public visualize() {
    let embed: MessageEmbed = new MessageEmbed();
    embed.setColor("DARK_NAVY");
    embed.setTitle("Wordle");
    let boardState = this.getBoardState();

    let roundAndDifficulty = this.isWon == false ? `\n Round: ${this.round}/${this.difficulty}` : "You won in only " + this.round + " rounds!";

    embed.setDescription(`**${this.player.username}**\n ${boardState} ${roundAndDifficulty}`);
    
    return embed
  }

  public setEmbedId(id: string) {
    this.previousMessageId = id;
  }
}

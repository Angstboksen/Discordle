import { Client, CommandInteraction, MessageEmbed } from "discord.js";
import { Discord, SimpleCommand, SimpleCommandMessage, SimpleCommandOption, Slash } from "discordx";
import WordFetcher from "./WordFetcher";
import WordleManager from "./WordleManager";


@Discord()
class Discordle {

    manager: WordleManager = new WordleManager()
    fetcher: WordFetcher = new WordFetcher()

    @SimpleCommand("wordle")
    wordle(command: SimpleCommandMessage) {
        let {author, channel} = command.message
        let playerID = author.id
        let currentGame = this.manager.getGame(playerID)
        channel.send({embeds: [currentGame.visualize()]})
    }

    @SimpleCommand("guess")
    async guess(
        @SimpleCommandOption("word", { type: "STRING" }) word: string,
        command: SimpleCommandMessage) {
        let message = command.message
        if (!this.manager.getGame(message.author.id)){
            return message.reply({embeds: [new MessageEmbed().setDescription(":x: You need to start a game first. `!wordle`")]})
        }
        let validated = await this.fetcher.validateGuess(word)
        if (!validated) {
            return message.reply({embeds: [new MessageEmbed().setDescription(`:x: \`${word}\` is an illegal word`)]})
        }
        let currentGame = this.manager.getGame(message.author.id)
        currentGame.updateBoard(word.toUpperCase())
        if(currentGame.isWon) {
            this.manager.endGame(message.author.id)
        }
        message.channel.send({embeds: [currentGame.visualize()]})
    }
}
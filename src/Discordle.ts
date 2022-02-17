import { Channel, Client, CommandInteraction, MessageEmbed } from "discord.js";
import { Discord, SimpleCommand, SimpleCommandMessage, SimpleCommandOption, Slash } from "discordx";
import WordFetcher from "./WordFetcher";
import WordleManager from "./WordleManager";


@Discord()
class Discordle {

    manager: WordleManager = new WordleManager()
    fetcher: WordFetcher = new WordFetcher()

    @SimpleCommand("wordle")
    async wordle(command: SimpleCommandMessage) {
        let {author, channel} = command.message
        let playerID = author.id;
        let currentGame = this.manager.getGame(playerID)
        let embed = await channel.send({embeds: [currentGame.visualize()]})
        currentGame.setEmbedId(embed.id)
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
        console.log(currentGame)
        currentGame.updateBoard(word.toUpperCase())
        if(currentGame.isWon) {
            this.manager.endGame(message.author.id)
        }

        if(currentGame.previousMessageId != null) {
            message.channel.messages.fetch(currentGame.previousMessageId).then(msg => {
                msg.delete()
            })
        }
        
        let embed = await message.channel.send({embeds: [currentGame.visualize()]})
        currentGame.setEmbedId(embed.id)

        message.channel.messages.fetch(message.id)
        .then(msg =>  msg.delete());
        
    }
}
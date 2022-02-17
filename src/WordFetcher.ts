import axios from "axios"
import { words } from "./words"

export default class WordFetcher {

    public async validateGuess(word: string) {
        if (word.length != 5) {
            return false
        }
        let res = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`).catch((error: Error) => {
            console.log(`An error occured: ${error}`)
            return {data: []}
        })
        return res.data.length > 0
    }
}
import axios from "axios"

export default class WordFetcher {
    
    public getRandomSolution() {
        return "PIZZA"
    }

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
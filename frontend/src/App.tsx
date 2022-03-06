import React from "react";
import { GameType, WordleDifficulty } from "./types";
import Header from "./header/Header";
import Wordle from "./game/Wordle";
import "./main.scss";

let player = {
  username: "Campaign",
  id: "192586347972788224",
  rank: {
    name: "Legend",
    level: 20,
    color: "#DAA520"
  }
}

let guild = {
  name: "guild_name",
  id: "test2"
}

function App() {
  return (
    <div className="app">
      <Header player={player} gameType={GameType.INDIVIDUAL}/>
      <Wordle player={player} discordGuild={guild} difficulty={WordleDifficulty.MEDIUM}/>
    </div>
  );
}

export default App;

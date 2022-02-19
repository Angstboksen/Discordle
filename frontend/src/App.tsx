import React from "react";
import { GameType, WordleDifficulty } from "./types";
import Header from "./header/Header";
import Wordle from "./game/Wordle";
import "./main.scss";

let player = {
  username: "Campaign",
  id: "test"
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

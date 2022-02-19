import React from "react";
import { GameType, WordleDifficulty } from "./types";
import Wordle from "./Wordle";
import "./main.scss";
import Header from "./Header";

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

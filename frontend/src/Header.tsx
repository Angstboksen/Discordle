import React from "react";
import { GameType, Guild, Player } from "./types";

interface HeaderProps {
  player: Player;
  gameType: GameType;
}

const Header: React.FC<HeaderProps> = ({ player, gameType }) => {
  return (
    <div className="header">
      <h1 className="header-title">
        <div>Discordle</div>
        <span className="header-gametype">
          <span style={{color: `${gameType === GameType.INDIVIDUAL ? "#008080" : "#CD5C5C"}`}}>{gameType === GameType.INDIVIDUAL
            ? GameType.INDIVIDUAL
            : GameType.OPEN}  game</span>
        </span>
      </h1>
      <span className="header-subtitle">
        Initialized by:{" "}
        <span
          style={{ color: `${player.rank ? player.rank.color : "#C0C0C0"}` }}
        >
          {player.username}
        </span>
      </span>
    </div>
  );
};

export default Header;

import React from "react";
import ReactTooltip from "react-tooltip";
import { GameType, Player } from "../types";

interface HeaderProps {
  player: Player;
  gameType: GameType;
}

const Header: React.FC<HeaderProps> = ({ player, gameType }) => {
  const isIndividual = gameType === GameType.INDIVIDUAL;

  return (
    <div className="header">
      <h1 className="header-title">
        <div>Discordle</div>
        <span className="header-gametype">
          <span
            style={{ color: `${isIndividual ? "#008080" : "#CD5C5C"}` }}
            data-tip={
              isIndividual
                ? "This game is only for you"
                : "Other people are also able to play this game. You get more experience for being one of the first ones to solve it."
            }
          >
            {isIndividual ? GameType.INDIVIDUAL : GameType.OPEN} game
          </span>
        </span>
      </h1>
      <span className="header-subtitle">
        Initialized by:{" "}
        <span
          style={{ color: `${player.rank ? player.rank.color : "#C0C0C0"}` }}
          data-tip={`You are gurrently level ${player.rank.level}, ${player.rank.name}`}
        >
          {player.username}
        </span>
      </span>
    </div>
  );
};

export default Header;

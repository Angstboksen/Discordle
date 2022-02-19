import React from "react";
import { Guild, Player } from "./types";

interface HeaderProps {
  player: Player;
  discordGuild: Guild;
}

const Header: React.FC<HeaderProps> = ({ player, discordGuild }) => {
  return (
    <div className="header">
      <span className="header-title">Discordle</span>
    </div>
  );
};

export default Header;

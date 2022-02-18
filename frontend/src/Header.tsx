import React from 'react'
import { Guild, Player } from './types'

interface HeaderProps {
    player: Player,
    discordGuild: Guild
}

const Header: React.FC<HeaderProps> = ({player, discordGuild}) => {
  return (
    <div className='header'>Discordle</div>
  )
}

export default Header
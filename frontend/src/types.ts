export enum WordleDifficulty {
  EASY = 7,
  MEDIUM = 6,
  HARD = 5,
  CRACKED = 4,
}

export enum LetterBoxColor {
  WRONG = "#696969",
  INCORRECT_POSITION = "#FFD700",
  CORRECT = "#228B22",
  DEFAULT = "#FFFAF0"
}

export type Player = {
  username: string;
  id: string;
  rank?: DiscordleRank;
};

export type LetterObject = {
  body: string;
  color: LetterBoxColor;
};

export type DiscordleRank = {
  name: string;
  level: number;
};

export type Guild = {
  name: string;
  id: string;
  stored?: boolean;
};

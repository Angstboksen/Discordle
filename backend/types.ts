export enum MongoTables {
  WORDS = "words",
  GAMES = "games",
  USERS = "users",
  RANKS = "ranks"
}

export type ResponseMessage = {
    endpoint: string;
    status: number;
    message: string;
    size: number;
    data: any;
};

export type LetterObject = {
    body: string;
    color: LetterBoxColor;
    priority: number;
};

export type User = {
  _id: string,
  username: string,
  discord: string,
  rank: number,
  hasUnfinishedGame: boolean,
}

export type Game = {
  user: string,
  type: GameType,
  solution: string,
  board: string[],
  isFinished: boolean,
  date: Date;
  leaderboard?: string[]
  _id?: string;
}

export enum LetterBoxColor {
    WRONG = "#696969",
    INCORRECT_POSITION = "#FFD700",
    CORRECT = "#228B22",
    DEFAULT = "#FFFFE0"
}

export enum GameType {
  INDIVIDUAL = "Individual",
  OPEN = "Open"
}

const responseMessages = new Map();
responseMessages.set(200, "200 OK");
responseMessages.set(201, "201 Created");
responseMessages.set(204, "204 No Content");
responseMessages.set(400, "400 Bad Request");
responseMessages.set(401, "401 Unauthorized");
responseMessages.set(403, "403 Forbidden");
responseMessages.set(404, "404 Not Found");
responseMessages.set(500, "500 Internal Server Error");

export const message = (
  endpoint: string,
  status: number,
  data: any
): ResponseMessage => {
  return {
    endpoint,
    status,
    message: responseMessages.get(status),
    size: data ? data.length : 0,
    data,
  };
};
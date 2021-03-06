import { Router, Request, Response } from "express";
import {
  Game,
  GameType,
  message,
  MongoTables,
} from "../../../types";
import {
  fetchRandomMongo,
  finishGame,
  getUserGame,
  insertNewGame,
  updateGame,
  validateUser,
} from "../database/database";
import { checkLoss, checkVictory, compareWithSolution, validGuess } from "../../logic/gamemanager";
import log from "../utils/Logger";

const router = Router();

router.route("/").get(async (request: Request, response: Response) => {
  const path = "/games";
  log(path, request.ip);
  const obj = {
    name: "games",
    desciption:
      "Handles every request about games being played now, or archived ones.",
  };
  response.status(200).json(message(path, 200, obj));
});

router
  .route("/newIndividualGame")
  .post(async (request: Request, response: Response) => {
    const path = "/games/newIndividualGame";
    log(path, request.ip);
    const user = await validateUser(request.headers.authorization);
    if (user !== undefined) {
      if (user.hasUnfinishedGame) {
        return response.status(400).json(
          message(path, 400, "User already has an active game")
        );
      }
      const game = await insertNewGame(user.discord, GameType.INDIVIDUAL);
      const obj = {
        gameID: game.insertedId,
        board: [],
        type: GameType.INDIVIDUAL,
      };
      return response.status(201).json(message(path, 201, obj));
    }

    return response.status(403).json(message(path, 403, "User not defined"));
  });

router
  .route("/updateGame")
  .post(async (request: Request, response: Response) => {
    const path = "/games/updateGame";
    log(path, request.ip);
    const user = await validateUser(request.headers.authorization);
    const guess = request.body.guess;
    const guessOK = await validGuess(guess);
    if (user !== undefined) {
      if (!user.hasUnfinishedGame) {
        return response.status(400).json(
          message(path, 400, "User already has an active game")
        );
      }
      if (!guessOK) {
        return response.status(400).json(message(path, 400, "Invalid guess"));
      }
      const game = await getUserGame(user.discord);
      const success = await updateGame(game._id.toString(), guess);
      const isWon = guess.toLowerCase() === game.solution
      const isLoss = !isWon && game.board.length === 5
      if (success) {
        const obj = {
          gameID: game.insertedId,
          board: compareWithSolution(game.solution, guess),
          gameStatus: isWon ? "won" : isLoss ? "loss" : "active",
          type: GameType.INDIVIDUAL,
        };
        return response.status(200).json(message(path, 200, obj));
      }
      return response.status(400).json(message(path, 400, "Unsuccessful updating game"));
    }
    return response.status(403).json(message(path, 403, "User not defined"));
  });

router
  .route("/finishGame")
  .post(async (request: Request, response: Response) => {
    const path = "/games/finishGame";
    log(path, request.ip);
    const user = await validateUser(request.headers.authorization);
    if (user !== undefined) {
      const game = (await getUserGame(user.discord)) as any;
      if (game !== undefined) {
        const victory = checkVictory(game);
        await finishGame(user.discord, game._id.toString(), victory);
        return response.status(200).json(message(path, 200, game._id));
      }
    }
    return response.status(403).json(message(path, 403, "User not defined"));
  });

router
  .route("/randomWord")
  .get(async (request: Request, response: Response) => {
    const path = "/games/randomWord";
    log(path, request.ip);
    const obj = await fetchRandomMongo(MongoTables.WORDS);
    response.status(200).json(message(path, 200, obj));
  });

export default router;


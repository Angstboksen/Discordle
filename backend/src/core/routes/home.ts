import { Router, Request, Response } from "express";
import { message, MongoTables } from "../../../types";
import { fetchRandomMongo } from "../database/database";
import log from "../utils/Logger";

const router = Router();

router.route("/").get(async (request: Request, response: Response) => {
    const path = "/";
    log(path, request.ip)
    const obj = {
        name: "Discordle API",
        type: "REST",
        date: new Date().toLocaleString("no-NO", {
          timeZone: "Europe/Oslo",
          hour12: false,
          formatMatcher: "basic",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        }),
        author: "Angstboksen",
        github_repository: "https://github.com/Angstboksen/Discordle",
        discord_bot: "https://github.com/Angstboksen/Discordle",
        description: "API used for authorization and managing the architecture of the Discord bot and it's companion website"
      }
    response.json(message(path, 200, obj));
 
});

export default router;
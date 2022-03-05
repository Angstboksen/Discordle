import express, { NextFunction, Request, Response } from "express";
import { urlencoded, json } from "body-parser";
import cors from "cors";
import routes from "./routes";
import { message } from "./types";

const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors());
app.use((_: any, res: any, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept"
  );
  next();
});

app.set("json spaces", 4);
app.use("/", routes);
app.get("/", (_, res) => {
  res.send("Home endpoint");
});
app.use(
  (error: Error, _: Request, __: Response, next: NextFunction) => {
    console.log("An error has occurred:", error);
    next(error);
  }
);
app.get("*", function (_: Request, res: Response) {
  res.status(404).send(message("*", 404, null));
});

const port = 8000;
const host = "0.0.0.0";
app.listen(process.env.PORT ? +process.env.PORT : port, host, () => {
  console.log(`[Discordle]: Server is listening at http://${host}:${port}`);
});
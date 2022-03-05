import { MongoClient, ObjectID } from "mongodb";
import { config } from "dotenv";
import { Game, GameType, LetterObject, MongoTables } from "../../../types";
import { createNewGame } from "../logic";
config();

const database = process.env.DATABASE;

const client = new MongoClient(process.env.MONGOURL!);
client.close();
client.connect();

export const validateUser = async (user: string | undefined) => {
  const db = client.db(database);
  const data = await db
    .collection(MongoTables.USERS)
    .find({ discord: user })
    .toArray();
  return data[0];
};

export const getUserGame = async (user: string) => {
  const db = client.db(database);
  const games = db.collection(MongoTables.GAMES);
  const data = await games.find({ user: user, isFinished: false }).toArray();
  return data[0];
};

export const insertNewGame = async (user: string, type: GameType) => {
  const db = client.db(database);
  const games = db.collection(MongoTables.GAMES);
  const game = (await createNewGame(user, type)) as any;
  const row = games.insertOne(game);
  db.collection(MongoTables.USERS).updateOne(
    { discord: user },
    { $set: { hasUnfinishedGame: true } }
  );
  return row;
};

export const updateGame = async (game: string, guess: string) => {
  try {
    const db = client.db(database);

    db.collection(MongoTables.GAMES).updateOne(
      { _id: new ObjectID(game) },
      { $push: { board: guess } }
    );
    return true;
  } catch (error) {
    console.log(error)
    return false;
  }
};

export const finishGame = async (
  user: string,
  game: string,
  victory: boolean
) => {
  try {
    const db = client.db(database);
    db.collection(MongoTables.GAMES).updateOne(
      { _id: new ObjectID(game) },
      { $set: { isFinished: true, victory: victory } }
    );
    db.collection(MongoTables.USERS).updateOne(
      { discord: user },
      { $set: { hasUnfinishedGame: false } }
    );
    return true;
  } catch (error) {
    return false;
  }
};

export const fetchRandomMongo = async (collectionName: string) => {
  const db = client.db(database);
  const data = await db
    .collection(collectionName)
    .aggregate([{ $sample: { size: 1 } }])
    .toArray();
  return data[0];
};

export const fetchCollection = async (collectionName: string) => {
  const db = client.db(database);
  const data = await db.collection(collectionName).find().toArray();
  return data;
};

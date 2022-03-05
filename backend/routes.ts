import { Router } from "express";
import games from "./src/core/routes/games";
import home from "./src/core/routes/home";

const router = Router();

router.use("/", home)
router.use("/games", games)

export default router;
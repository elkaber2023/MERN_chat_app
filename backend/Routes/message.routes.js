import express from "express";
import { getMessage, sendMessage } from "../Controllers/message.controller.js";
import protectRoute from "../MiddleWare/protectRoute.js";

const router = express.Router();

router.get("/:id",protectRoute, getMessage);
router.post("/send/:id",protectRoute, sendMessage);

export default router;

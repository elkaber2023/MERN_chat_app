import express from"express"
import protectRoute from "../MiddleWare/protectRoute.js";
import { getUsersForSidebar } from "../Controllers/user.controller.js";

const router = express.Router();

router.get("/",protectRoute,getUsersForSidebar)

export default router;
import { Router } from "express";
import { getOnlineUsers } from "../controller/userData";
const router = Router();

router.get("/getOnlineUsers", getOnlineUsers);

export default router;

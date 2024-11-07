import { Router } from "express";
import { getMessages } from "../controller/message";

const router = Router();

router.get("/getMessages", getMessages);
export default router;

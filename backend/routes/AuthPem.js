import express from "express";
import { MeP, LoginP, LogoutP } from "../controllers/AuthPem.js";
const router = express.Router();

router.get("/meP", MeP);
router.post("/loginP", LoginP);
router.delete("/logoutP", LogoutP);

export default router;

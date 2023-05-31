import express from "express";
import { createTindakan, deleteTindakan, getTindakan, getTindakanById, updateTindakan } from "../controllers/tindakan.js";
import { verifyPemohon } from "../middleware/Authpem.js";
const router = express.Router();

router.get("/tindakan", verifyPemohon, getTindakan);
router.get("/tindakan/:id", verifyPemohon, getTindakanById);
router.post("/tindakan", verifyPemohon, createTindakan);
router.patch("/tindakan/:id", verifyPemohon, updateTindakan);
router.delete("/tindakan/:id", verifyPemohon, deleteTindakan);

export default router;

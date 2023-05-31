import express from "express";
import { createPemohon, deletePemohon, getPemohon, getPemohonById, updatePemohon } from "../controllers/pemohon.js";
import { verifyPemohon } from "../middleware/Authpem.js";
const router = express.Router();

router.get("/pemohon", verifyPemohon, getPemohon);
router.post("/pemohonadd", createPemohon);
router.get("/pemohon/:id", verifyPemohon, getPemohonById);
router.post("/pemohon", verifyPemohon, createPemohon);
router.patch("/pemohon/:id", verifyPemohon, updatePemohon);
router.delete("/pemohon/:id", verifyPemohon, deletePemohon);

export default router;

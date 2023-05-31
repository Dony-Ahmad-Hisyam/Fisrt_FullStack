import express from "express";
import { createPemohonAdmin, deletePemohonAdmin, getPemohonAdmin, getPemohonAdminById, updatePemohonAdmin } from "../controllers/pemohonAdmin.js";
import { verifyAdmin } from "../middleware/AuthAdmin.js";
const router = express.Router();

router.get("/pemohonAdmin", verifyAdmin, getPemohonAdmin);
router.get("/pemohonAdmin/:id", verifyAdmin, getPemohonAdminById);
router.post("/pemohonAdmin", verifyAdmin, createPemohonAdmin);
router.patch("/pemohonAdmin/:id", verifyAdmin, updatePemohonAdmin);
router.delete("/pemohonAdmin/:id", verifyAdmin, deletePemohonAdmin);

export default router;

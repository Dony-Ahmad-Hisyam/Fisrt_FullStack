import express from "express";
import { createPermohonan, deletePermohonan, getPermohonanAdmin, getPermohonanById, updatePermohonan } from "../controllers/permohonanAdmin.js";
import { verifyAdmin } from "../middleware/AuthAdmin.js";
const router = express.Router();

router.get("/permohonanAdmin", verifyAdmin, getPermohonanAdmin);
router.get("/permohonanAdmin/:id", verifyAdmin, getPermohonanById);
router.post("/permohonanAdmin", verifyAdmin, createPermohonan);
router.patch("/permohonanAdmin/:id", verifyAdmin, updatePermohonan);
router.delete("/permohonanAdmin/:id", verifyAdmin, deletePermohonan);

export default router;

import express from "express";
import { createPermohonan, deletePermohonan, getPermohonan, getPermohonanById, updatePermohonan } from "../controllers/permohonan.js";
import { verifyPemohon } from "../middleware/Authpem.js";
const router = express.Router();

router.get("/permohonan", verifyPemohon, getPermohonan);
router.get("/permohonan/:id", verifyPemohon, getPermohonanById);
router.post("/permohonan", verifyPemohon, createPermohonan);
router.patch("/permohonan/:id", verifyPemohon, updatePermohonan);
router.delete("/permohonan/:id", verifyPemohon, deletePermohonan);

export default router;

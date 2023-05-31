import express from "express";
import { createPetugas, deletePetugas, getPetugas, getPetugasById, updatePetugas } from "../controllers/petugas.js";
import { verifyAdmin } from "../middleware/AuthAdmin.js";
const router = express.Router();

router.get("/petugasAdmin", verifyAdmin, getPetugas);
router.get("/petugasAdmin/:id", verifyAdmin, getPetugasById);
router.post("/petugasAdmin", verifyAdmin, createPetugas);
router.patch("/petugasAdmin/:id", verifyAdmin, updatePetugas);
router.delete("/petugasAdmin/:id", verifyAdmin, deletePetugas);

export default router;

import express from "express";
import { createPetugas, deletePetugas, getPetugas, getPetugasById, updatePetugas } from "../controllers/petugas.js";
import { verifyPemohon } from "../middleware/Authpem.js";
const router = express.Router();

router.get("/petugas", verifyPemohon, getPetugas);
router.get("/petugas/:id", verifyPemohon, getPetugasById);
router.post("/petugas", verifyPemohon, createPetugas);
router.patch("/petugas/:id", verifyPemohon, updatePetugas);
router.delete("/petugas/:id", verifyPemohon, deletePetugas);

export default router;

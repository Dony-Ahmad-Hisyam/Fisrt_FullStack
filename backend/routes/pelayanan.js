import express from "express";
import { createPelayanan, deletePelayanan, getPelayanan, getPelayananById, updatePelayanan } from "../controllers/pelayanan.js";
import { verifyPemohon } from "../middleware/Authpem.js";

const router = express.Router();

router.get("/pelayanan", verifyPemohon, getPelayanan);
router.get("/pelayanan/:id", verifyPemohon, getPelayananById);
router.post("/pelayanan", verifyPemohon, createPelayanan);
router.patch("/pelayanan/:id", verifyPemohon, updatePelayanan);
router.delete("/pelayanan/:id", verifyPemohon, deletePelayanan);
export default router;

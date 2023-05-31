import express from "express";
import { createPelayanan, deletePelayanan, getPelayanan, getPelayananById, updatePelayanan } from "../controllers/pelayanan.js";
import { verifyAdmin } from "../middleware/AuthAdmin.js";

const router = express.Router();

router.get("/pelayananAdmin", verifyAdmin, getPelayanan);
router.get("/pelayananAdmin/:id", verifyAdmin, getPelayananById);
router.post("/pelayananAdmin", verifyAdmin, createPelayanan);
router.patch("/pelayananAdmin/:id", verifyAdmin, updatePelayanan);
router.delete("/pelayananAdmin/:id", verifyAdmin, deletePelayanan);
export default router;

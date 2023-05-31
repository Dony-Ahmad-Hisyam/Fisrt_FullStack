import express from "express";
import { createTindakanAdmin, deleteTindakanAdmin, getTindakanAdmin, getTindakanAdminById, updateTindakanAdmin } from "../controllers/tindakanAdmin.js";
import { verifyAdmin } from "../middleware/AuthAdmin.js";
const router = express.Router();

router.get("/tindakanAdmin", verifyAdmin, getTindakanAdmin);
router.get("/tindakanAdmin/:id", verifyAdmin, getTindakanAdminById);
router.post("/tindakanAdmin", verifyAdmin, createTindakanAdmin);
router.patch("/tindakanAdmin/:id", verifyAdmin, updateTindakanAdmin);
router.delete("/tindakanAdmin/:id", verifyAdmin, deleteTindakanAdmin);

export default router;

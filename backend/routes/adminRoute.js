import express from "express";
import { getAdmin, getAdminById, createAdmin, deleteAdmin, updateAdmin } from "../controllers/adminController.js";
import { verifyAdmin } from "../middleware/AuthAdmin.js";
const router = express.Router();

router.get("/admin", verifyAdmin, getAdmin);
router.get("/admin/:id", verifyAdmin, getAdminById);
router.post("/admin", verifyAdmin, createAdmin);
router.patch("/admin/:id", verifyAdmin, updateAdmin);
router.delete("/admin/:id", verifyAdmin, deleteAdmin);

export default router;

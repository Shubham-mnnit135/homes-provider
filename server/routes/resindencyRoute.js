import express from "express";
import { createResidency, getAllResidencies, getResidency } from "../controllers/resindencyController.js";
import { verifyToken } from "../helper/helper.js";

const router = express.Router();

router.post("/create", verifyToken,createResidency);
router.get("/allresidencies", getAllResidencies);
router.get("/:id", getResidency);

export { router as resindencyRoute };
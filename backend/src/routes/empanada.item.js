import { Router } from "express";
import { createOne, updateOne, deleteOne } from "../controllers/empanadasController.js";

const router = Router();
router.post("/", createOne);    
router.put("/:id", updateOne);
router.delete("/:id", deleteOne);

export default router;

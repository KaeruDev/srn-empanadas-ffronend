import { Router } from "express";
import { list } from "../controllers/empanadasController.js";

const router = Router();
router.get("/", list);

export default router;

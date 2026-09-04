import { Router } from "express";

import {
  create,
  getAll,
  getOne,
  getSummary,
  update,
  remove,
  getFull,
} from "../controllers/consultation.controller";

const router = Router();

router.post("/", create);

router.get("/", getAll);

router.get("/:id/summary", getSummary);

router.get("/:id/full", getFull);

router.get("/:id", getOne);

router.put("/:id", update);

router.delete("/:id", remove);

export default router;
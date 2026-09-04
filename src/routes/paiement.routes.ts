import { Router } from "express";

import {
  create,
  getAll,
  getByConsultation,
  getOne,
  update,
  remove,
} from "../controllers/paiement.controller";

const router = Router();

router.post("/", create);

router.get("/", getAll);

router.get(
  "/consultation/:consultationId",
  getByConsultation
);

router.get("/:id", getOne);

router.put("/:id", update);

router.delete("/:id", remove);

export default router;
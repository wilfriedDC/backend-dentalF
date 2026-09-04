import { Router } from "express";

import {
  create,
  getByConsultation,
  getOne,
  update,
  remove,
} from "../controllers/odontogramme.controller";

const router = Router();

router.post("/", create);

router.get(
  "/consultation/:consultationId",
  getByConsultation
);

router.get("/:id", getOne);

router.put("/:id", update);

router.delete("/:id", remove);

export default router;
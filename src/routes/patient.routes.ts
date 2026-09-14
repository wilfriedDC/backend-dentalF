import { Router } from "express";

import {
  create,
  getAll,
  getOne,
  update,
  remove,
  getOdontogramme,
  upsertOdontogrammeTooth,
} from "../controllers/patient.controller";

const router = Router();

router.post("/", create);

router.get("/", getAll);

// Odontogramme du patient (état agrégé + mise à jour par dent).
// Déclarées ici, avant/après /:id peu importe : Express les distingue déjà
// de "/:id" seul grâce au nombre de segments dans l'URL.
router.get("/:id/odontogramme", getOdontogramme);
router.put("/:id/odontogramme/:numeroDent", upsertOdontogrammeTooth);

router.get("/:id", getOne);

router.put("/:id", update);

router.delete("/:id", remove);

export default router;
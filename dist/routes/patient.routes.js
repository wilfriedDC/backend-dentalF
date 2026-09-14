"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const patient_controller_1 = require("../controllers/patient.controller");
const router = (0, express_1.Router)();
router.post("/", patient_controller_1.create);
router.get("/", patient_controller_1.getAll);
// Odontogramme du patient (état agrégé + mise à jour par dent).
// Déclarées ici, avant/après /:id peu importe : Express les distingue déjà
// de "/:id" seul grâce au nombre de segments dans l'URL.
router.get("/:id/odontogramme", patient_controller_1.getOdontogramme);
router.put("/:id/odontogramme/:numeroDent", patient_controller_1.upsertOdontogrammeTooth);
router.get("/:id", patient_controller_1.getOne);
router.put("/:id", patient_controller_1.update);
router.delete("/:id", patient_controller_1.remove);
exports.default = router;

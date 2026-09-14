"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const consultation_controller_1 = require("../controllers/consultation.controller");
const router = (0, express_1.Router)();
router.post("/", consultation_controller_1.create);
router.get("/", consultation_controller_1.getAll);
router.get("/:id/summary", consultation_controller_1.getSummary);
router.get("/:id/full", consultation_controller_1.getFull);
// Ajout d'un paiement à une consultation existante (impayé / partiel -> payer)
router.post("/:id/paiements", consultation_controller_1.addPaiement);
router.get("/:id", consultation_controller_1.getOne);
router.put("/:id", consultation_controller_1.update);
router.delete("/:id", consultation_controller_1.remove);
exports.default = router;

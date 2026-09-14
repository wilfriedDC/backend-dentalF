"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const settings_controller_1 = require("../controllers/settings.controller");
const router = (0, express_1.Router)();
// Cabinet
router.get("/cabinet", settings_controller_1.getCabinet);
router.put("/cabinet", settings_controller_1.updateCabinet);
// Praticiens
router.get("/praticiens", settings_controller_1.getPraticiens);
router.post("/praticiens", settings_controller_1.createPraticien);
router.put("/praticiens/:id", settings_controller_1.updatePraticien);
exports.default = router;

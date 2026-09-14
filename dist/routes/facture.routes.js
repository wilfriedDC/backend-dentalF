"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const facture_controller_1 = require("../controllers/facture.controller");
const router = (0, express_1.Router)();
router.post("/", facture_controller_1.create);
router.get("/", facture_controller_1.getAll);
router.get("/:id", facture_controller_1.getOne);
exports.default = router;

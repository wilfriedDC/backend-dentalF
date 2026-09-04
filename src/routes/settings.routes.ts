import { Router } from "express";

import {
  getCabinet,
  updateCabinet,
  getPraticiens,
  createPraticien,
  updatePraticien,
} from "../controllers/settings.controller";

const router = Router();


// Cabinet
router.get("/cabinet", getCabinet);

router.put("/cabinet", updateCabinet);


// Praticiens
router.get("/praticiens", getPraticiens);

router.post("/praticiens", createPraticien);

router.put("/praticiens/:id", updatePraticien);


export default router;
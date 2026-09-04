import { Request, Response } from "express";

import * as settingsService
  from "../services/settings.service";


// ==========================
// CABINET
// ==========================

export const getCabinet = async (
  req: Request,
  res: Response
) => {
  try {

    const cabinet =
      await settingsService.getCabinet();

    res.json(cabinet);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Erreur récupération cabinet",
    });
  }
};


export const updateCabinet = async (
  req: Request,
  res: Response
) => {
  try {

    const cabinet =
      await settingsService.updateCabinet(
        req.body
      );

    res.json(cabinet);

  } catch (error) {

    console.error(error);

    res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : "Erreur modification cabinet",
    });
  }
};


// ==========================
// PRATICIEN
// ==========================

export const getPraticiens = async (
  req: Request,
  res: Response
) => {
  try {

    const praticiens =
      await settingsService.getPraticiens();

    res.json(praticiens);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Erreur récupération praticiens",
    });
  }
};


export const createPraticien = async (
  req: Request,
  res: Response
) => {
  try {

    const cabinet =
      await settingsService.getCabinet();

    if (!cabinet) {
      res.status(400).json({
        message:
          "Veuillez d'abord enregistrer le cabinet",
      });

      return;
    }

    const praticien =
      await settingsService.createPraticien(
        cabinet.id,
        req.body
      );

    res.status(201).json(praticien);

  } catch (error) {

    console.error(error);

    res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : "Erreur création praticien",
    });
  }
};


export const updatePraticien = async (
  req: Request,
  res: Response
) => {
  try {

    const praticien =
      await settingsService.updatePraticien(
        Number(req.params.id),
        req.body
      );

    res.json(praticien);

  } catch (error) {

    console.error(error);

    res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : "Erreur modification praticien",
    });
  }
};
import { Request, Response } from "express";

import * as factureService
  from "../services/facture.service";


export const create = async (
  req: Request,
  res: Response
) => {
  try {
    const consultationId =
      Number(req.body.consultationId);

    const remise =
      Number(req.body.remise ?? 0);

    const facture =
      await factureService.createFacture(
        consultationId,
        remise
      );

    res.status(201).json(facture);

  } catch (error) {

    console.error(error);

    res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : "Erreur création facture",
    });
  }
};


export const getAll = async (
  req: Request,
  res: Response
) => {
  try {

    const factures =
      await factureService.getFactures();

    res.json(factures);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Erreur récupération factures",
    });
  }
};


export const getOne = async (
  req: Request,
  res: Response
) => {
  try {

    const facture =
      await factureService.getFactureById(
        Number(req.params.id)
      );

    if (!facture) {
      res.status(404).json({
        message: "Facture introuvable",
      });

      return;
    }

    res.json(facture);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Erreur récupération facture",
    });
  }
};
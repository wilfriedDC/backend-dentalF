import { Request, Response } from "express";

import * as paiementService
  from "../services/paiement.service";

import {
  createPaiementSchema,
} from "../validations/paiement.validation";


// CREATE
export const create = async (
  req: Request,
  res: Response
) => {
  try {

    const data =
      createPaiementSchema.parse(req.body);

    const paiement =
      await paiementService.createPaiement(data);

    res.status(201).json(paiement);

  } catch (error) {

    if (error instanceof Error) {
      res.status(400).json({
        message: error.message,
      });

      return;
    }

    res.status(500).json({
      message: "Erreur création paiement",
    });
  }
};


// GET ALL
export const getAll = async (
  req: Request,
  res: Response
) => {
  try {

    const paiements =
      await paiementService.getPaiements();

    res.json(paiements);

  } catch (error) {

    res.status(500).json({
      message: "Erreur récupération paiements",
    });
  }
};


// GET BY CONSULTATION
export const getByConsultation = async (
  req: Request,
  res: Response
) => {
  try {

    const paiements =
      await paiementService
        .getPaiementsByConsultation(
          Number(req.params.consultationId)
        );

    res.json(paiements);

  } catch (error) {

    res.status(500).json({
      message: "Erreur récupération paiements",
    });
  }
};


// GET ONE
export const getOne = async (
  req: Request,
  res: Response
) => {
  try {

    const paiement =
      await paiementService.getPaiementById(
        Number(req.params.id)
      );

    if (!paiement) {

      res.status(404).json({
        message: "Paiement introuvable",
      });

      return;
    }

    res.json(paiement);

  } catch (error) {

    res.status(500).json({
      message: "Erreur récupération paiement",
    });
  }
};


// UPDATE
export const update = async (
  req: Request,
  res: Response
) => {
  try {

    const paiement =
      await paiementService.updatePaiement(
        Number(req.params.id),
        req.body
      );

    res.json(paiement);

  } catch (error) {

    res.status(500).json({
      message: "Erreur modification paiement",
    });
  }
};


// DELETE
export const remove = async (
  req: Request,
  res: Response
) => {
  try {

    await paiementService.deletePaiement(
      Number(req.params.id)
    );

    res.json({
      message: "Paiement supprimé",
    });

  } catch (error) {

    res.status(500).json({
      message: "Erreur suppression paiement",
    });
  }
};
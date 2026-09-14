import { Request, Response } from "express";



import * as consultationService
  from "../services/consultation.service";

import {
  createConsultationSchema,
} from "../validations/consultation.validation";


export const create = async (
  req: Request,
  res: Response
) => {
  try {

    const data = createConsultationSchema.parse(req.body);

    const consultation =
      await consultationService.createConsultation(data);

    res.status(201).json(consultation);

  } catch (error) {

    if (error instanceof Error) {

      res.status(400).json({
        message: error.message,
      });

      return;
    }

    res.status(500).json({
      message: "Erreur création consultation",
    });
  }
};


export const getAll = async (
  req: Request,
  res: Response
) => {

  try {

    const consultations =
      await consultationService.getConsultations();

    res.json(consultations);

  } catch (error) {

    res.status(500).json({
      message: "Erreur récupération consultations",
    });
  }
};


export const getOne = async (
  req: Request,
  res: Response
) => {

  try {

    const consultation =
      await consultationService.getConsultationById(
        Number(req.params.id)
      );

    if (!consultation) {

      res.status(404).json({
        message: "Consultation introuvable",
      });

      return;
    }

    res.json(consultation);

  } catch (error) {

    res.status(500).json({
      message: "Erreur récupération consultation",
    });
  }
};


export const update = async (
  req: Request,
  res: Response
) => {

  try {

    const consultation =
      await consultationService.updateConsultation(
        Number(req.params.id),
        req.body
      );

    res.json(consultation);

  } catch (error) {

    res.status(500).json({
      message: "Erreur modification consultation",
    });
  }
};


export const remove = async (
  req: Request,
  res: Response
) => {

  try {

    await consultationService.deleteConsultation(
      Number(req.params.id)
    );

    res.json({
      message: "Consultation supprimée",
    });

  } catch (error) {

    res.status(500).json({
      message: "Erreur suppression consultation",
    });
  }
};

export const getSummary = async (
  req: Request,
  res: Response
) => {
  try {
    const summary =
      await consultationService.getConsultationSummary(
        Number(req.params.id)
      );

    if (!summary) {
      res.status(404).json({
        message: "Consultation introuvable",
      });

      return;
    }

    res.json(summary);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Erreur récupération résumé consultation",
    });
  }
};

export const getFull = async (
  req: Request,
  res: Response
) => {
  try {
    const consultation =
      await consultationService.getFullConsultation(
        Number(req.params.id)
      );

    if (!consultation) {
      res.status(404).json({
        message: "Consultation introuvable",
      });

      return;
    }

    res.json(consultation);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Erreur récupération consultation",
    });
  }
};

// À ajouter dans consultation.controller.ts, à côté de update

export const addPaiement = async (
  req: Request,
  res: Response
) => {
  try {

    const montant = Number(req.body.montant);

    if (!montant || montant <= 0) {
      res.status(400).json({
        message: "Montant invalide.",
      });
      return;
    }

    const consultation =
      await consultationService.addPaiement(
        Number(req.params.id),
        {
          montant,
          modePaiement: req.body.modePaiement ?? null,
        }
      );

    if (!consultation) {
      res.status(404).json({
        message: "Consultation introuvable",
      });
      return;
    }

    res.status(201).json(consultation);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Erreur enregistrement paiement",
    });
  }
};
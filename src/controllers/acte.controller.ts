import { Request, Response } from "express";

import * as acteService from "../services/acte.service";

import {
  createActeSchema,
} from "../validations/acte.validation";


export const create = async (
  req: Request,
  res: Response
) => {
  try {

    const data = createActeSchema.parse(req.body);

    const acte = await acteService.createActe(data);

    res.status(201).json(acte);

  } catch (error) {

    if (error instanceof Error) {
      res.status(400).json({
        message: error.message,
      });

      return;
    }

    res.status(500).json({
      message: "Erreur création acte",
    });
  }
};


export const getAll = async (
  req: Request,
  res: Response
) => {
  try {

    const actes = await acteService.getActes();

    res.json(actes);

  } catch (error) {

    res.status(500).json({
      message: "Erreur récupération actes",
    });
  }
};


export const getByConsultation = async (
  req: Request,
  res: Response
) => {
  try {

    const actes =
      await acteService.getActesByConsultation(
        Number(req.params.consultationId)
      );

    res.json(actes);

  } catch (error) {

    res.status(500).json({
      message: "Erreur récupération actes",
    });
  }
};


export const getOne = async (
  req: Request,
  res: Response
) => {
  try {

    const acte =
      await acteService.getActeById(
        Number(req.params.id)
      );

    if (!acte) {
      res.status(404).json({
        message: "Acte introuvable",
      });

      return;
    }

    res.json(acte);

  } catch (error) {

    res.status(500).json({
      message: "Erreur récupération acte",
    });
  }
};


export const update = async (
  req: Request,
  res: Response
) => {
  try {

    const acte =
      await acteService.updateActe(
        Number(req.params.id),
        req.body
      );

    res.json(acte);

  } catch (error) {

    res.status(500).json({
      message: "Erreur modification acte",
    });
  }
};


export const remove = async (
  req: Request,
  res: Response
) => {
  try {

    await acteService.deleteActe(
      Number(req.params.id)
    );

    res.json({
      message: "Acte supprimé",
    });

  } catch (error) {

    res.status(500).json({
      message: "Erreur suppression acte",
    });
  }
};
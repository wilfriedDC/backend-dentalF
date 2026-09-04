import { Request, Response } from "express";

import * as odontogrammeService
  from "../services/odontogramme.service";

import {
  createOdontogrammeSchema,
} from "../validations/odontogramme.validation";


// CREATE
export const create = async (
  req: Request,
  res: Response
) => {
  try {

    const data =
      createOdontogrammeSchema.parse(req.body);

    const odontogramme =
      await odontogrammeService
        .createOdontogramme(data);

    res.status(201).json(odontogramme);

  } catch (error) {

    if (error instanceof Error) {
      res.status(400).json({
        message: error.message,
      });

      return;
    }

    res.status(500).json({
      message: "Erreur création odontogramme",
    });
  }
};


// GET BY CONSULTATION
export const getByConsultation = async (
  req: Request,
  res: Response
) => {
  try {

    const odontogrammes =
      await odontogrammeService
        .getByConsultation(
          Number(req.params.consultationId)
        );

    res.json(odontogrammes);

  } catch (error) {

    res.status(500).json({
      message: "Erreur récupération odontogramme",
    });
  }
};


// GET ONE
export const getOne = async (
  req: Request,
  res: Response
) => {
  try {

    const odontogramme =
      await odontogrammeService.getById(
        Number(req.params.id)
      );

    if (!odontogramme) {

      res.status(404).json({
        message: "Odontogramme introuvable",
      });

      return;
    }

    res.json(odontogramme);

  } catch (error) {

    res.status(500).json({
      message: "Erreur récupération odontogramme",
    });
  }
};


// UPDATE
export const update = async (
  req: Request,
  res: Response
) => {
  try {

    const odontogramme =
      await odontogrammeService
        .updateOdontogramme(
          Number(req.params.id),
          req.body
        );

    res.json(odontogramme);

  } catch (error) {

    res.status(500).json({
      message: "Erreur modification odontogramme",
    });
  }
};


// DELETE
export const remove = async (
  req: Request,
  res: Response
) => {
  try {

    await odontogrammeService.deleteOdontogramme(
      Number(req.params.id)
    );

    res.json({
      message: "Odontogramme supprimé",
    });

  } catch (error) {

    res.status(500).json({
      message: "Erreur suppression odontogramme",
    });
  }
};
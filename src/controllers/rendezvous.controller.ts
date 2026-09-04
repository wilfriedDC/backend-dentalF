import { Request, Response } from "express";

import * as rendezVousService
  from "../services/rendezvous.service";

import {
  createRendezVousSchema,
} from "../validations/rendezvous.validation";


export const create = async (
  req: Request,
  res: Response
) => {
  try {
    const data =
      createRendezVousSchema.parse(req.body);

    const rendezVous =
      await rendezVousService.createRendezVous(data);

    res.status(201).json(rendezVous);

  } catch (error) {

    if (error instanceof Error) {
      res.status(400).json({
        message: error.message,
      });

      return;
    }

    res.status(500).json({
      message: "Erreur création rendez-vous",
    });
  }
};


export const getAll = async (
  req: Request,
  res: Response
) => {
  try {
    const rendezVous =
      await rendezVousService.getRendezVous();

    res.json(rendezVous);

  } catch (error) {

    res.status(500).json({
      message: "Erreur récupération rendez-vous",
    });
  }
};


export const getOne = async (
  req: Request,
  res: Response
) => {
  try {
    const rendezVous =
      await rendezVousService.getRendezVousById(
        Number(req.params.id)
      );

    if (!rendezVous) {
      res.status(404).json({
        message: "Rendez-vous introuvable",
      });

      return;
    }

    res.json(rendezVous);

  } catch (error) {

    res.status(500).json({
      message: "Erreur récupération rendez-vous",
    });
  }
};


export const update = async (
  req: Request,
  res: Response
) => {
  try {
    const rendezVous =
      await rendezVousService.updateRendezVous(
        Number(req.params.id),
        req.body
      );

    res.json(rendezVous);

  } catch (error) {

    res.status(500).json({
      message: "Erreur modification rendez-vous",
    });
  }
};


export const remove = async (
  req: Request,
  res: Response
) => {
  try {
    await rendezVousService.deleteRendezVous(
      Number(req.params.id)
    );

    res.json({
      message: "Rendez-vous supprimé",
    });

  } catch (error) {

    res.status(500).json({
      message: "Erreur suppression rendez-vous",
    });
  }
};
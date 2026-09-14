import { Request, Response } from "express";
import * as patientService from "../services/patient.service";
import { createPatientSchema } from "../validations/patient.validation";

import * as odontogrammeService from "../services/odontogramme.service";
import { upsertToothForPatientSchema } from "../validations/odontogramme.validation";


// CREATE
export const create = async (
  req: Request,
  res: Response
) => {
  try {
    const data = createPatientSchema.parse(req.body);

    const patient = await patientService.createPatient(data);

    res.status(201).json(patient);

  } catch (error) {

    if (error instanceof Error) {
      res.status(400).json({
        message: error.message,
      });

      return;
    }

    res.status(500).json({
      message: "Erreur création patient",
    });
  }
};


// GET ALL
export const getAll = async (
  req: Request,
  res: Response
) => {
  try {
    const search =
      typeof req.query.search === "string"
        ? req.query.search
        : undefined;

    const patients =
      await patientService.getPatients(search);

    res.json(patients);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Erreur récupération patients",
    });
  }
};

// GET ONE
export const getOne = async (
  req: Request,
  res: Response
) => {
  try {
    const patient = await patientService.getPatientById(
      Number(req.params.id)
    );

    if (!patient) {
      res.status(404).json({
        message: "Patient introuvable",
      });

      return;
    }

    res.json(patient);

  } catch (error) {

    res.status(500).json({
      message: "Erreur récupération patient",
    });
  }
};


// UPDATE
export const update = async (
  req: Request,
  res: Response
) => {
  try {
    const patient = await patientService.updatePatient(
      Number(req.params.id),
      req.body
    );

    res.json(patient);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Erreur modification patient",
    });
  }
};


// DELETE
export const remove = async (
  req: Request,
  res: Response
) => {
  try {
    await patientService.deletePatient(
      Number(req.params.id)
    );

    res.json({
      message: "Patient supprimé",
    });

  } catch (error) {

    res.status(500).json({
      message: "Erreur suppression patient",
    });
  }
};


// GET /patients/:id/odontogramme
// Renvoie l'état actuel du schéma dentaire du patient (une ligne par dent
// annotée, correspondant à la consultation la plus récente pour cette dent).
export const getOdontogramme = async (
  req: Request,
  res: Response
) => {
  try {
    const entries = await odontogrammeService.getByPatient(
      Number(req.params.id)
    );

    res.json(entries);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Erreur récupération odontogramme",
    });
  }
};


// PUT /patients/:id/odontogramme/:numeroDent
// Corps attendu : { consultationId: number, statut: string, commentaire?: string }
export const upsertOdontogrammeTooth = async (
  req: Request,
  res: Response
) => {
  try {
    const data = upsertToothForPatientSchema.parse(req.body);

    const entry = await odontogrammeService.upsertToothForConsultation({
      consultationId: data.consultationId,
      numeroDent: String(req.params.numeroDent),
      statut: data.statut,
      commentaire: data.commentaire,
    });

    res.json(entry);

  } catch (error) {

    if (error instanceof Error) {
      res.status(400).json({
        message: error.message,
      });

      return;
    }

    res.status(500).json({
      message: "Erreur enregistrement de la dent",
    });
  }
};
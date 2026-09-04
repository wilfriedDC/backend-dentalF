import { Request, Response } from "express";

import * as dashboardService
  from "../services/dashboard.service";

export const getDashboard = async (
  req: Request,
  res: Response
) => {
  try {
    const dashboard =
      await dashboardService.getDashboard();

    res.json(dashboard);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Erreur récupération dashboard",
    });
  }
};
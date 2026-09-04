import express from "express";
import cors from "cors";

import patientRoutes from "./routes/patient.routes";
import consultationRoutes from "./routes/consultation.routes";
import acteRoutes from "./routes/acte.routes";
import paiementRoutes from "./routes/paiement.routes";
import rendezVousRoutes from "./routes/rendezvous.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import odontogrammeRoutes from "./routes/odontogramme.routes";
import factureRoutes from "./routes/facture.routes";
import settingsRoutes from "./routes/settings.routes";


const app = express();

app.use(cors());
app.use(express.json());

app.use("/patients", patientRoutes);

app.use("/consultations", consultationRoutes);

app.use("/actes", acteRoutes);

app.use("/paiements", paiementRoutes);

app.use("/rendez-vous", rendezVousRoutes);

app.use("/dashboard", dashboardRoutes);

app.use("/odontogrammes", odontogrammeRoutes);

app.use("/factures", factureRoutes);

app.use("/settings", settingsRoutes);

export default app;
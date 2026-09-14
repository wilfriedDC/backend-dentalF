"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.upsertOdontogrammeTooth = exports.getOdontogramme = exports.remove = exports.update = exports.getOne = exports.getAll = exports.create = void 0;
const patientService = __importStar(require("../services/patient.service"));
const patient_validation_1 = require("../validations/patient.validation");
const odontogrammeService = __importStar(require("../services/odontogramme.service"));
const odontogramme_validation_1 = require("../validations/odontogramme.validation");
// CREATE
const create = async (req, res) => {
    try {
        const data = patient_validation_1.createPatientSchema.parse(req.body);
        const patient = await patientService.createPatient(data);
        res.status(201).json(patient);
    }
    catch (error) {
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
exports.create = create;
// GET ALL
const getAll = async (req, res) => {
    try {
        const search = typeof req.query.search === "string"
            ? req.query.search
            : undefined;
        const patients = await patientService.getPatients(search);
        res.json(patients);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Erreur récupération patients",
        });
    }
};
exports.getAll = getAll;
// GET ONE
const getOne = async (req, res) => {
    try {
        const patient = await patientService.getPatientById(Number(req.params.id));
        if (!patient) {
            res.status(404).json({
                message: "Patient introuvable",
            });
            return;
        }
        res.json(patient);
    }
    catch (error) {
        res.status(500).json({
            message: "Erreur récupération patient",
        });
    }
};
exports.getOne = getOne;
// UPDATE
const update = async (req, res) => {
    try {
        const patient = await patientService.updatePatient(Number(req.params.id), req.body);
        res.json(patient);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Erreur modification patient",
        });
    }
};
exports.update = update;
// DELETE
const remove = async (req, res) => {
    try {
        await patientService.deletePatient(Number(req.params.id));
        res.json({
            message: "Patient supprimé",
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Erreur suppression patient",
        });
    }
};
exports.remove = remove;
// GET /patients/:id/odontogramme
// Renvoie l'état actuel du schéma dentaire du patient (une ligne par dent
// annotée, correspondant à la consultation la plus récente pour cette dent).
const getOdontogramme = async (req, res) => {
    try {
        const entries = await odontogrammeService.getByPatient(Number(req.params.id));
        res.json(entries);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Erreur récupération odontogramme",
        });
    }
};
exports.getOdontogramme = getOdontogramme;
// PUT /patients/:id/odontogramme/:numeroDent
// Corps attendu : { consultationId: number, statut: string, commentaire?: string }
const upsertOdontogrammeTooth = async (req, res) => {
    try {
        const data = odontogramme_validation_1.upsertToothForPatientSchema.parse(req.body);
        const entry = await odontogrammeService.upsertToothForConsultation({
            consultationId: data.consultationId,
            numeroDent: String(req.params.numeroDent),
            statut: data.statut,
            commentaire: data.commentaire,
        });
        res.json(entry);
    }
    catch (error) {
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
exports.upsertOdontogrammeTooth = upsertOdontogrammeTooth;

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
exports.addPaiement = exports.getFull = exports.getSummary = exports.remove = exports.update = exports.getOne = exports.getAll = exports.create = void 0;
const consultationService = __importStar(require("../services/consultation.service"));
const consultation_validation_1 = require("../validations/consultation.validation");
const create = async (req, res) => {
    try {
        const data = consultation_validation_1.createConsultationSchema.parse(req.body);
        const consultation = await consultationService.createConsultation(data);
        res.status(201).json(consultation);
    }
    catch (error) {
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
exports.create = create;
const getAll = async (req, res) => {
    try {
        const consultations = await consultationService.getConsultations();
        res.json(consultations);
    }
    catch (error) {
        res.status(500).json({
            message: "Erreur récupération consultations",
        });
    }
};
exports.getAll = getAll;
const getOne = async (req, res) => {
    try {
        const consultation = await consultationService.getConsultationById(Number(req.params.id));
        if (!consultation) {
            res.status(404).json({
                message: "Consultation introuvable",
            });
            return;
        }
        res.json(consultation);
    }
    catch (error) {
        res.status(500).json({
            message: "Erreur récupération consultation",
        });
    }
};
exports.getOne = getOne;
const update = async (req, res) => {
    try {
        const consultation = await consultationService.updateConsultation(Number(req.params.id), req.body);
        res.json(consultation);
    }
    catch (error) {
        res.status(500).json({
            message: "Erreur modification consultation",
        });
    }
};
exports.update = update;
const remove = async (req, res) => {
    try {
        await consultationService.deleteConsultation(Number(req.params.id));
        res.json({
            message: "Consultation supprimée",
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Erreur suppression consultation",
        });
    }
};
exports.remove = remove;
const getSummary = async (req, res) => {
    try {
        const summary = await consultationService.getConsultationSummary(Number(req.params.id));
        if (!summary) {
            res.status(404).json({
                message: "Consultation introuvable",
            });
            return;
        }
        res.json(summary);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Erreur récupération résumé consultation",
        });
    }
};
exports.getSummary = getSummary;
const getFull = async (req, res) => {
    try {
        const consultation = await consultationService.getFullConsultation(Number(req.params.id));
        if (!consultation) {
            res.status(404).json({
                message: "Consultation introuvable",
            });
            return;
        }
        res.json(consultation);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Erreur récupération consultation",
        });
    }
};
exports.getFull = getFull;
// À ajouter dans consultation.controller.ts, à côté de update
const addPaiement = async (req, res) => {
    try {
        const montant = Number(req.body.montant);
        if (!montant || montant <= 0) {
            res.status(400).json({
                message: "Montant invalide.",
            });
            return;
        }
        const consultation = await consultationService.addPaiement(Number(req.params.id), {
            montant,
            modePaiement: req.body.modePaiement ?? null,
        });
        if (!consultation) {
            res.status(404).json({
                message: "Consultation introuvable",
            });
            return;
        }
        res.status(201).json(consultation);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Erreur enregistrement paiement",
        });
    }
};
exports.addPaiement = addPaiement;

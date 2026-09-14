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
exports.remove = exports.update = exports.getOne = exports.getByConsultation = exports.getAll = exports.create = void 0;
const paiementService = __importStar(require("../services/paiement.service"));
const paiement_validation_1 = require("../validations/paiement.validation");
// CREATE
const create = async (req, res) => {
    try {
        const data = paiement_validation_1.createPaiementSchema.parse(req.body);
        const paiement = await paiementService.createPaiement(data);
        res.status(201).json(paiement);
    }
    catch (error) {
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
exports.create = create;
// GET ALL
const getAll = async (req, res) => {
    try {
        const paiements = await paiementService.getPaiements();
        res.json(paiements);
    }
    catch (error) {
        res.status(500).json({
            message: "Erreur récupération paiements",
        });
    }
};
exports.getAll = getAll;
// GET BY CONSULTATION
const getByConsultation = async (req, res) => {
    try {
        const paiements = await paiementService
            .getPaiementsByConsultation(Number(req.params.consultationId));
        res.json(paiements);
    }
    catch (error) {
        res.status(500).json({
            message: "Erreur récupération paiements",
        });
    }
};
exports.getByConsultation = getByConsultation;
// GET ONE
const getOne = async (req, res) => {
    try {
        const paiement = await paiementService.getPaiementById(Number(req.params.id));
        if (!paiement) {
            res.status(404).json({
                message: "Paiement introuvable",
            });
            return;
        }
        res.json(paiement);
    }
    catch (error) {
        res.status(500).json({
            message: "Erreur récupération paiement",
        });
    }
};
exports.getOne = getOne;
// UPDATE
const update = async (req, res) => {
    try {
        const paiement = await paiementService.updatePaiement(Number(req.params.id), req.body);
        res.json(paiement);
    }
    catch (error) {
        res.status(500).json({
            message: "Erreur modification paiement",
        });
    }
};
exports.update = update;
// DELETE
const remove = async (req, res) => {
    try {
        await paiementService.deletePaiement(Number(req.params.id));
        res.json({
            message: "Paiement supprimé",
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Erreur suppression paiement",
        });
    }
};
exports.remove = remove;

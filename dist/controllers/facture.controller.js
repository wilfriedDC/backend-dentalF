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
exports.getOne = exports.getAll = exports.create = void 0;
const factureService = __importStar(require("../services/facture.service"));
const create = async (req, res) => {
    try {
        const consultationId = Number(req.body.consultationId);
        const remise = Number(req.body.remise ?? 0);
        const facture = await factureService.createFacture(consultationId, remise);
        res.status(201).json(facture);
    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            message: error instanceof Error
                ? error.message
                : "Erreur création facture",
        });
    }
};
exports.create = create;
const getAll = async (req, res) => {
    try {
        const factures = await factureService.getFactures();
        res.json(factures);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Erreur récupération factures",
        });
    }
};
exports.getAll = getAll;
const getOne = async (req, res) => {
    try {
        const facture = await factureService.getFactureById(Number(req.params.id));
        if (!facture) {
            res.status(404).json({
                message: "Facture introuvable",
            });
            return;
        }
        res.json(facture);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Erreur récupération facture",
        });
    }
};
exports.getOne = getOne;

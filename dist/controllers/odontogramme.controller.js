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
exports.remove = exports.update = exports.getOne = exports.getByConsultation = exports.create = void 0;
const odontogrammeService = __importStar(require("../services/odontogramme.service"));
const odontogramme_validation_1 = require("../validations/odontogramme.validation");
// CREATE
const create = async (req, res) => {
    try {
        const data = odontogramme_validation_1.createOdontogrammeSchema.parse(req.body);
        const odontogramme = await odontogrammeService
            .createOdontogramme(data);
        res.status(201).json(odontogramme);
    }
    catch (error) {
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
exports.create = create;
// GET BY CONSULTATION
const getByConsultation = async (req, res) => {
    try {
        const odontogrammes = await odontogrammeService
            .getByConsultation(Number(req.params.consultationId));
        res.json(odontogrammes);
    }
    catch (error) {
        res.status(500).json({
            message: "Erreur récupération odontogramme",
        });
    }
};
exports.getByConsultation = getByConsultation;
// GET ONE
const getOne = async (req, res) => {
    try {
        const odontogramme = await odontogrammeService.getById(Number(req.params.id));
        if (!odontogramme) {
            res.status(404).json({
                message: "Odontogramme introuvable",
            });
            return;
        }
        res.json(odontogramme);
    }
    catch (error) {
        res.status(500).json({
            message: "Erreur récupération odontogramme",
        });
    }
};
exports.getOne = getOne;
// UPDATE
const update = async (req, res) => {
    try {
        const odontogramme = await odontogrammeService
            .updateOdontogramme(Number(req.params.id), req.body);
        res.json(odontogramme);
    }
    catch (error) {
        res.status(500).json({
            message: "Erreur modification odontogramme",
        });
    }
};
exports.update = update;
// DELETE
const remove = async (req, res) => {
    try {
        await odontogrammeService.deleteOdontogramme(Number(req.params.id));
        res.json({
            message: "Odontogramme supprimé",
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Erreur suppression odontogramme",
        });
    }
};
exports.remove = remove;

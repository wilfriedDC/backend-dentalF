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
const acteService = __importStar(require("../services/acte.service"));
const acte_validation_1 = require("../validations/acte.validation");
const create = async (req, res) => {
    try {
        const data = acte_validation_1.createActeSchema.parse(req.body);
        const acte = await acteService.createActe(data);
        res.status(201).json(acte);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({
                message: error.message,
            });
            return;
        }
        res.status(500).json({
            message: "Erreur création acte",
        });
    }
};
exports.create = create;
const getAll = async (req, res) => {
    try {
        const actes = await acteService.getActes();
        res.json(actes);
    }
    catch (error) {
        res.status(500).json({
            message: "Erreur récupération actes",
        });
    }
};
exports.getAll = getAll;
const getByConsultation = async (req, res) => {
    try {
        const actes = await acteService.getActesByConsultation(Number(req.params.consultationId));
        res.json(actes);
    }
    catch (error) {
        res.status(500).json({
            message: "Erreur récupération actes",
        });
    }
};
exports.getByConsultation = getByConsultation;
const getOne = async (req, res) => {
    try {
        const acte = await acteService.getActeById(Number(req.params.id));
        if (!acte) {
            res.status(404).json({
                message: "Acte introuvable",
            });
            return;
        }
        res.json(acte);
    }
    catch (error) {
        res.status(500).json({
            message: "Erreur récupération acte",
        });
    }
};
exports.getOne = getOne;
const update = async (req, res) => {
    try {
        const acte = await acteService.updateActe(Number(req.params.id), req.body);
        res.json(acte);
    }
    catch (error) {
        res.status(500).json({
            message: "Erreur modification acte",
        });
    }
};
exports.update = update;
const remove = async (req, res) => {
    try {
        await acteService.deleteActe(Number(req.params.id));
        res.json({
            message: "Acte supprimé",
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Erreur suppression acte",
        });
    }
};
exports.remove = remove;

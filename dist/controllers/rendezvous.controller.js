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
exports.remove = exports.update = exports.getOne = exports.getAll = exports.create = void 0;
const rendezVousService = __importStar(require("../services/rendezvous.service"));
const rendezvous_validation_1 = require("../validations/rendezvous.validation");
const create = async (req, res) => {
    try {
        const data = rendezvous_validation_1.createRendezVousSchema.parse(req.body);
        const rendezVous = await rendezVousService.createRendezVous(data);
        res.status(201).json(rendezVous);
    }
    catch (error) {
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
exports.create = create;
const getAll = async (req, res) => {
    try {
        const rendezVous = await rendezVousService.getRendezVous();
        res.json(rendezVous);
    }
    catch (error) {
        res.status(500).json({
            message: "Erreur récupération rendez-vous",
        });
    }
};
exports.getAll = getAll;
const getOne = async (req, res) => {
    try {
        const rendezVous = await rendezVousService.getRendezVousById(Number(req.params.id));
        if (!rendezVous) {
            res.status(404).json({
                message: "Rendez-vous introuvable",
            });
            return;
        }
        res.json(rendezVous);
    }
    catch (error) {
        res.status(500).json({
            message: "Erreur récupération rendez-vous",
        });
    }
};
exports.getOne = getOne;
const update = async (req, res) => {
    try {
        const rendezVous = await rendezVousService.updateRendezVous(Number(req.params.id), req.body);
        res.json(rendezVous);
    }
    catch (error) {
        res.status(500).json({
            message: "Erreur modification rendez-vous",
        });
    }
};
exports.update = update;
const remove = async (req, res) => {
    try {
        await rendezVousService.deleteRendezVous(Number(req.params.id));
        res.json({
            message: "Rendez-vous supprimé",
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Erreur suppression rendez-vous",
        });
    }
};
exports.remove = remove;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = startServer;
const app_1 = __importDefault(require("./app"));
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const frontendPath = process.env.FRONTEND_DIST_PATH || path_1.default.join(__dirname, "../../frontend-dist");
// ... tes routes API existantes (déjà définies dans "./app" via app.use("/api", ...) etc.)
// doivent être enregistrées AVANT le static + catch-all ci-dessous, sinon
// le catch-all intercepterait aussi les appels API.
app_1.default.use(express_1.default.static(frontendPath));
// Catch-all pour le routing React (React Router etc.)
// Express 5 exige un paramètre nommé, "*" seul n'est plus valide.
app_1.default.get("/*splat", (req, res) => {
    res.sendFile(path_1.default.join(frontendPath, "index.html"));
});
function startServer(port) {
    return new Promise((resolve) => {
        app_1.default.listen(port, () => {
            console.log(`Server running on port ${port}`);
            resolve();
        });
    });
}
// En dev classique (npm run dev / tsx src/server.ts exécuté directement),
// on démarre tout de suite. Electron, lui, importera juste startServer()
// sans jamais exécuter ce bloc (voir explication plus bas).
if (require.main === module) {
    startServer(3000);
}

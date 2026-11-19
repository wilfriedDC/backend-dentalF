"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = startServer;
const app_1 = __importDefault(require("./app"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const express_1 = __importDefault(require("express"));
// En production, Electron fournit FRONTEND_DIST_PATH.
// En développement, on retombe sur frontend/dist.
const frontendPath = process.env.FRONTEND_DIST_PATH || path_1.default.join(__dirname, "../../frontend/dist");
console.log("frontendPath:", frontendPath, "| index.html existe ?", fs_1.default.existsSync(path_1.default.join(frontendPath, "index.html")));
app_1.default.use(express_1.default.static(frontendPath));
// Express 5 : "/{*splat}" couvre aussi "/" (contrairement à "/*splat").
app_1.default.get("/{*splat}", (_req, res) => {
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
if (require.main === module) {
    startServer(3000);
}

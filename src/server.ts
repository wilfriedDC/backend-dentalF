import app from "./app";
import path from "path";
import express from "express";

const frontendPath = process.env.FRONTEND_DIST_PATH || path.join(__dirname, "../../frontend-dist");

// ... tes routes API existantes (déjà définies dans "./app" via app.use("/api", ...) etc.)
// doivent être enregistrées AVANT le static + catch-all ci-dessous, sinon
// le catch-all intercepterait aussi les appels API.

app.use(express.static(frontendPath));

// Catch-all pour le routing React (React Router etc.)
// Express 5 exige un paramètre nommé, "*" seul n'est plus valide.
app.get("/*splat", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

export function startServer(port: number) {
  return new Promise<void>((resolve) => {
    app.listen(port, () => {
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
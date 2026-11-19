import app from "./app";
import path from "path";
import fs from "fs";
import express from "express";

// En production, Electron fournit FRONTEND_DIST_PATH.
// En développement, on retombe sur frontend/dist.
const frontendPath =
  process.env.FRONTEND_DIST_PATH || path.join(__dirname, "../../frontend/dist");

console.log(
  "frontendPath:",
  frontendPath,
  "| index.html existe ?",
  fs.existsSync(path.join(frontendPath, "index.html"))
);

app.use(express.static(frontendPath));

// Express 5 : "/{*splat}" couvre aussi "/" (contrairement à "/*splat").
app.get("/{*splat}", (_req, res) => {
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

if (require.main === module) {
  startServer(3000);
}
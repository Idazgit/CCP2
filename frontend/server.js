import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Pour compatibilité avec __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Dossier où se trouvent tes fichiers frontend
const publicDir = path.join(__dirname, "public");

const server = http.createServer((req, res) => {
  const urlPath = req.url === "/" ? "/html/home.html" : req.url;
  const filePath = path.join(publicDir, urlPath);
  const ext = path.extname(filePath);

  let contentType = "text/html";
  if (ext === ".css") contentType = "text/css";
  if (ext === ".js") contentType = "text/javascript";

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 - Not Found");
      return;
    }

    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  });
});

server.listen(3000, () => {
  console.log("🌐 Frontend disponible sur http://localhost:3000");
});

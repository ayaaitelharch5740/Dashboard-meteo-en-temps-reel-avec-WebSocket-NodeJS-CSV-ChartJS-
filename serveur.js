const http = require("http");
const fs = require("fs");
const path = require("path");
const { Server: WSServer } = require("ws");
const csvToJson = require("csvtojson");

const PORT = process.env.PORT || 5002;
const CSV_FILE = "climat.csv";
const INTERVALLE_MS = 3000;

// Serveur HTTP qui sert dashboard.html
const serveurHttp = http.createServer((req, res) => {
  const fichier = path.join(__dirname, "dashboard.html");
  fs.readFile(fichier, (err, contenu) => {
    if (err) {
      res.writeHead(404);
      res.end("Fichier introuvable");
      return;
    }
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(contenu);
  });
});

// Serveur WebSocket sur le même port
const wss = new WSServer({ server: serveurHttp });

wss.on("connection", async (socket) => {
  console.log(`[${new Date().toLocaleTimeString()}] Client connecté`);

  try {
    const donnees = await csvToJson().fromFile(CSV_FILE);
    let index = 0;

    const minuterie = setInterval(() => {
      if (index < donnees.length) {
        socket.send(JSON.stringify(donnees[index]));
        index++;
      } else {
        clearInterval(minuterie);
        console.log("Toutes les données envoyées.");
      }
    }, INTERVALLE_MS);

    socket.on("close", () => {
      clearInterval(minuterie);
      console.log(`[${new Date().toLocaleTimeString()}] Client déconnecté`);
    });

    socket.on("error", (err) => {
      console.error("Erreur socket :", err.message);
      clearInterval(minuterie);
    });

  } catch (erreur) {
    console.error("Erreur lecture CSV :", erreur.message);
    socket.close();
  }
});

serveurHttp.listen(PORT, () => {
  console.log(`Serveur démarré → http://localhost:${PORT}/dashboard.html`);
});
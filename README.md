# Dashboard Climatique — Lab WebSocket + Chart.js

Un tableau de bord météo en temps réel construit avec Node.js, WebSocket et Chart.js.  
Les données sont lues depuis un fichier CSV et envoyées au navigateur toutes les 3 secondes.

---

## Aperçu

- Le serveur lit `climat.csv` et envoie chaque ligne en JSON via WebSocket
- Le client reçoit les données et met à jour un tableau HTML et deux graphiques en direct
- Tout tourne sur un seul port (HTTP + WebSocket)

---

## Stack technique

| Technologie | Rôle |
|---|---|
| Node.js | Environnement d'exécution serveur |
| `ws` | Serveur WebSocket |
| `csvtojson` | Lecture et conversion du fichier CSV |
| `nodemon` | Rechargement automatique en développement |
| Chart.js 2.8 | Graphiques côté client |
| HTTP natif Node.js | Servir le fichier HTML |

---

## Structure du projet

```
dashboard-climat/
├── serveur.js        # Serveur HTTP + WebSocket
├── dashboard.html    # Interface client
├── climat.csv        # Données météo (12 mois)
├── package.json
└── README.md
```

---

## Installation

### 1. Créer le dossier de travail

```bash
mkdir dashboard-climat
cd dashboard-climat
```

### 2. Initialiser npm

```bash
npm init -y
```

### 3. Installer les dépendances

```bash
npm install ws csvtojson
npm install --save-dev nodemon
```

---

## Lancement

```bash
npx nodemon serveur.js
```

Ouvrir dans le navigateur :

```
http://localhost:5002/dashboard.html
```

---

## Fonctionnement pas à pas

```
climat.csv  →  csvtojson  →  setInterval(3s)  →  WebSocket  →  tableau + graphiques
```

1. Le serveur HTTP démarre sur le port `5002` et sert `dashboard.html`
2. Le navigateur ouvre la page et établit une connexion WebSocket
3. Le serveur lit `climat.csv` et envoie un objet JSON toutes les 3 secondes
4. Le client ajoute une ligne au tableau et met à jour les deux graphiques Chart.js

---

## Variables d'environnement

| Variable | Défaut | Description |
|---|---|---|
| `PORT` | `5002` | Port d'écoute du serveur |

```bash
PORT=8080 node serveur.js
```

---


## Points de contrôle

- [ ] `package.json` créé après `npm init`
- [ ] Dossier `node_modules` présent après `npm install`
- [ ] `climat.csv` dans le même dossier que `serveur.js`
- [ ] En-têtes CSV corrects : `mois,tmax,tmin,pluie`
- [ ] Terminal affiche `Serveur démarré → http://localhost:5002/dashboard.html`
- [ ] Le navigateur affiche le point vert "Connecté"
- [ ] Une nouvelle ligne s'ajoute toutes les 3 secondes
- [ ] Les deux graphiques se mettent à jour en temps réel

---

## Extensions possibles

- Charger dynamiquement un autre fichier CSV via un menu déroulant
- Ajouter un compteur de progression (ex. `6 / 12 mois reçus`)
- Déployer sur un serveur distant avec HTTPS + WSS
- Ajouter une colonne "ensoleillement" au CSV et un troisième graphique


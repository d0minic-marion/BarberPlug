# 💈 Barbershop Web — Mandat 2

Site web **barbershop** avec back-end **Node.js/Express** et base de données **SQLite** (via **Knex**). 
Le projet gère deux rôles — **Client** et **Coiffeur** — avec **authentification JWT**, gestion de **rendez‑vous**, **disponibilités**, **avis**, **favoris**, **profils**, et une interface statique (HTML/CSS/JS) servie par Express.

> 📦 Dossier principal : `Web/`

---

## ✨ Fonctionnalités principales

### Côté Client
- Création de compte / connexion (mot de passe chiffré avec **bcrypt**).
- **Recherche** et consultation de salons et coiffeurs.
- **Prise de rendez‑vous** et historique des rendez‑vous.
- **Avis** (évaluation/commentaires) sur les coiffeurs/salons.
- **Favoris** (suivi des salons/coiffeurs).
- **Profil** : consultation et modification d’informations.
- **Dashboard** : vue d’ensemble (rendez‑vous, favoris, etc.).

### Côté Coiffeur
- Création de compte / connexion (JWT).
- **Gestion des disponibilités**.
- **Gestion des services** (types de coupes, prix, durées).
- **Historique** et **tableau de bord**.
- **Portfolio** (photos).
- **Profil** et **salon** (informations, horaires).

### Commun
- **JWT** pour sécuriser les routes (`Authorization: Bearer <token>`).
- **SQLite** gérée avec **Knex** (`dbConfig.js`).
- Front-end statique : pages HTML par section (Accueil, Login/Register, Avis, Favoris, RendezVous, Profil, Dashboard, etc.).

---

## 🧱 Stack & Dépendances

- **Node.js / Express** (serveur HTTP, routes).
- **SQLite3** + **Knex** (accès base de données).
- **bcrypt** (hachage des mots de passe).
- **jsonwebtoken** (authentification JWT).
- **body-parser** (parsing JSON).
- Front-end : **HTML5 / CSS / JavaScript**.

---

## ⚙️ Installation & Lancement

1. **Cloner** le dépôt et se placer dans le dossier `Web/` :
   ```bash
   git clone <URL_DU_DEPOT>
   cd mandat2-main/Web
   ```

2. **Installer** les dépendances :
   ```bash
   npm install
   ```

3. **Créer la base SQLite** (fichier `mandat2.sqlite3`) à partir du script SQL :

   - Ouvrir `-- SQLite.sql` dans un client SQLite et exécuter le script.

4. **Configurer les scripts npm** (facultatif mais recommandé) dans `Web/package.json` :
   ```json
   "scripts": {
     "dev": "nodemon MainServer.js",
     "start": "node MainServer.js"
   }
   ```

5. **Lancer** le serveur :
   ```bash
   # en mode dev (avec reload)
   npm run dev
   # ou en production
   npm start
   ```

6. Ouvrir : **http://localhost:3000**

---

## 🔐 Authentification (JWT)

- Les routes protégées exigent un header :
  ```http
  Authorization: Bearer <votre_token_jwt>
  ```
- Clés (définies dans `routes/commun.js`) :
  - `TOKEN_SECRET_KEY_Client = "KEY_WEB-4D2"`
  - `TOKEN_SECRET_KEY_Coiffeur = "KEY_WEB-4D3"`
- Pour la production, stockez ces clés dans des variables d’environnement.

---

## 🗃️ Base de données

- Fichier : `mandat2.sqlite3`
- Création des tables via `-- SQLite.sql` (salonCoiffure, Coiffeurs, Clients, Services, Disponibilites, RendezVous, Favoris, Avis, Portfolio, etc.).
- Accès via **Knex** (`dbConfig.js`).

---

## 🔌 Endpoints (aperçu)

- **Auth / Client**
  - `POST /registerClient` — inscription client
  - `POST /loginClient` — connexion client (JWT)
- **Auth / Coiffeur**
  - `POST /registerCoiffeur` — inscription coiffeur
  - `POST /loginCoiffeur` — connexion coiffeur (JWT)
- **Disponibilités / Services / Rendez‑vous / Avis / Favoris**
  - CRUD sur les ressources correspondantes (clients & coiffeurs)
- **Pages statiques**
  - `GET /` → `Public/Acceuil/Acceuil.html`
  - `GET /Authentification` → page Login/Register
  - `GET /Avis`, `/Favoris`, `/RendezVous`, `/Profile`, `/Dashboard`, etc.

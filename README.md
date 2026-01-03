# 📚 Portail de Documentation - Projet de Test Redmine

> Plateforme pédagogique centralisée pour l'enseignement des tests logiciels et de l'automatisation

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Status: Active](https://img.shields.io/badge/Status-Active-success.svg)]()
[![GitHub Pages](https://img.shields.io/badge/Deployed-GitHub%20Pages-blue.svg)]()

## 🎯 Vue d'ensemble

Ce portail web est conçu comme **ressource pédagogique** pour l'enseignement des techniques de test logiciel, de l'automatisation et de la gestion de projet Agile. Il centralise l'ensemble de la documentation, guides et outils nécessaires aux étudiants pour mener à bien un projet de test sur l'application Redmine.

**Public cible :** Étudiants en informatique (Groupes SQL)  
**Contexte :** Projet de test de l'application Redmine dans les cours Élaboration des tests / Assurance qualité  
**Technologies couvertes :** Gherkin/BDD, PICT (pairwise testing), Classes d'Équivalence, Valeurs Frontières, Jira/Xray/Zephyr

---

## 🚀 Fonctionnalités

### 🔐 Système d'authentification
- Connexion par rôle (étudiant/admin)
- Protection par session (`sessionStorage`)
- Guards JavaScript (auth-guard.js, admin-guard.js)
- Redirection automatique si non authentifié

### 📖 Guides pédagogiques complets

| Guide | Description | Podcast |
|-------|-------------|---------|
| **Plan de test (ISO 29119-3)** | Structure conforme à la norme internationale | - |
| **Gherkin / BDD** | Écriture de scénarios en langage naturel | 🎙️ FR/EN |
| **PICT / Pairwise** | Génération optimale de données de test | 🎙️ FR/EN |
| **Classes d'Équivalence** | Techniques PCE et AVF pour tests boîte noire | 🎙️ FR/EN |
| **Markdown** | Syntaxe, astuces, visualisation dans navigateurs | - |
| **Exemple de User Story** | Modèles et templates avec critères d'acceptation | 🎙️ FR/EN |

### 🛠️ Ressources techniques

- **Planification & Timeline** : Phases du projet, jalons, deadlines (dates configurables via JSON)
- **User Stories & Epics** : Backlog complet avec Épics et user stories (variantes par équipe : 2, 3, 4, 5 équipes)
- **Exemple de User Story** : Modèles et templates avec critères d'acceptation et podcast
- **Environnement de test** : Infrastructure, accès, jeux de données
- **Quiz interactifs** : Évaluation des connaissances avec correction automatique et mode local
- **FAQ dynamique** : Système de questions-réponses avec recherche et catégories

### 🎯 Fonctionnalités dynamiques

- **Annonces** : Carrousel rotatif et panneau latéral avec annonces prioritaires (gestion via JSON/GitHub API)
- **Timeline configurable** : Dates de sprints modifiables via JSON (admin)
- **Quiz** : Système de quiz interactif avec correction automatique et statistiques
- **FAQ** : Système de questions-réponses avec recherche dynamique et gestion admin
- **Podcast Audio** : Support audio bilingue (FR/EN) pour plusieurs guides pédagogiques
- **GitHub API** : Sauvegarde automatique des configurations (annonces, quiz, timeline, FAQ)

### 👨‍💼 Interface d'administration

- **Gestion des Annonces** : Ajout, modification, activation/désactivation avec GitHub API
- **Gestion des Quiz** : Création et gestion de quiz (questions, réponses, explications)
- **Gestion de la FAQ** : Création et organisation de questions-réponses par catégories
- **Gestion du Calendrier** : Configuration des dates de sprints pour la timeline
- **Matrice des User Stories** : Vue de toutes les user stories organisées par équipe
- **Configuration** : Paramètres globaux du portail

### 🎨 Interface utilisateur

- ✅ Design moderne et responsive (mobile-friendly)
- ✅ Navigation intuitive avec système de cartes (CSS Grid)
- ✅ Badge utilisateur avec rôle (admin/étudiant)
- ✅ Menu dropdown pour l'administration (visible uniquement aux admins)
- ✅ Système de notifications avec compteur
- ✅ Déconnexion sécurisée
- ✅ Fit-to-screen automatique pour certaines pages
- ✅ Mode impression optimisé

---

## 📁 Structure du projet

```
redmine-project/
│
├── index.html                    # Page de connexion (authentification)
├── menu.html                     # Portail principal (hub de navigation)
│
├── guides/
│   ├── guide_plan.html          # Guide du Plan de test
│   ├── guide_plan_auto.html     # Guide du Plan d'automatisation
│   ├── guide_rapport_tests.html # Guide du Rapport de tests
│   ├── guide_gherkin.html       # Guide Gherkin/BDD
│   └── guide_md.html            # Guide Markdown
│
├── resources/
│   ├── cheat_sheet_xpath.html   # Aide-mémoire XPath
│   ├── cheat_sheet_robot.html   # Aide-mémoire Robot Framework (en cours)
│   ├── test_environment.html    # Environnement de test
│   ├── project_timeline.html    # Chronologie du projet
│   ├── features_3_equipes.html  # Epics & User Stories
│   └── exemple_us.html          # Exemple de User Story
│
├── js/
│   └── auth-guard.js            # Script de protection d'accès (DRY)
│
├── images/                       # Icônes et ressources visuelles
├── downloads/                    # Fichiers téléchargeables (Excel, templates)
└── credentials.json             # Identifiants de connexion (hors production)
```

---

## 🔧 Installation & Déploiement

### Prérequis
- Aucun ! Simple hébergement de fichiers statiques HTML/CSS/JS

### Déploiement sur GitHub Pages

1. **Activer GitHub Pages** dans les paramètres du dépôt
   - Settings → Pages → Source : `master` branch

2. **Accéder au portail**
   - URL : `https://<votre-username>.github.io/redmine-project/`

### Utilisation en local

```bash
# Cloner le dépôt
git clone https://github.com/<votre-username>/redmine-project.git

# Ouvrir directement index.html dans un navigateur
# Ou utiliser un serveur local (recommandé)
cd redmine-project
python -m http.server 8000
# Ouvrir http://localhost:8000
```

---

## 🔑 Authentification

Les identifiants de connexion sont définis dans `credentials.json` :

```json
{
  "groupe1": "pass1",
  "groupe2": "pass2"
}
```

> ⚠️ **Note :** Ce système d'authentification est **purement pédagogique** et ne doit pas être utilisé en production. Il n'offre aucune sécurité réelle (les mots de passe sont en clair côté client).

---

## 📚 Ressources pédagogiques

### Technologies enseignées

- **Tests logiciels** : Méthodologies, normes (ISO 29119-3), documentation
- **Automatisation** : Robot Framework, Selenium WebDriver, XPath
- **BDD (Behavior-Driven Development)** : Gherkin, scénarios en langage naturel
- **Agilité** : User Stories, Epics, critères d'acceptation
- **Documentation technique** : Markdown, rapports de tests

### Normes & Standards

- ✅ **ISO/IEC/IEEE 29119-3** : Structure des plans de test
- ✅ **Gherkin** : Syntaxe Given-When-Then
- ✅ **Markdown** : Format de documentation léger

---

## 🎓 Usage pédagogique

Ce portail est utilisé dans le cadre d'un cours universitaire sur les tests logiciels. Il sert de :

1. **Support de cours** : Documentation centralisée et accessible 24/7
2. **Guide de référence** : Aide-mémoires et templates
3. **Outil de projet** : Backlog, planning, environnement
4. **Exercice pratique** : Exemple concret de documentation projet

---

## 🛡️ Sécurité

### Système actuel (pédagogique)
- Protection par `sessionStorage` (JavaScript)
- Vérification côté client uniquement
- **Non adapté à un environnement de production**

### Améliorations possibles
- Authentification backend (Node.js, PHP)
- Base de données sécurisée
- Tokens JWT
- HTTPS obligatoire

---

## 🤝 Contribution

**Usage strictement pédagogique** - Ce projet est destiné à un usage personnel dans un cadre d'enseignement universitaire.

Si vous êtes enseignant et souhaitez réutiliser ce portail :
1. Fork le projet
2. Adaptez le contenu à votre contexte
3. Modifiez `credentials.json` avec vos identifiants
4. Personnalisez les guides selon vos besoins

---

## 📝 License

Ce projet est sous licence **MIT** - voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## 📧 Contact

**Enseignant** : Talel Zid  (zidtalel@gmail.com)  
**Institution** : Collège de Bois de Boulogne  
**Année académique** : 2026

---

## 🙏 Remerciements

- **Font Awesome** pour les icônes
- **Tailwind CSS** pour le système de design (page de connexion)
- **GitHub Pages** pour l'hébergement gratuit

---

<div align="center">

**Dernière mise à jour :** janvier 2026

Made with ❤️ for education

</div>

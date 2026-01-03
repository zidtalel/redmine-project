# Guide — Classes d'Équivalence et Valeurs Frontières

> **Techniques de conception de tests basées sur les valeurs (Boîte Noire) pour une couverture optimale des cas de test**

---

## 🧪 Introduction aux Techniques Basées sur les Valeurs

Comprendre comment choisir des données de test efficaces est essentiel pour garantir la qualité d'un logiciel. Les techniques basées sur les valeurs, telles que le **Partitionnement par Classes d'Équivalence (PCE)** et l'**Analyse des Valeurs Frontières (AVF)**, sont des méthodes de **boîte noire** qui permettent de réduire le nombre de cas de test nécessaires tout en maximisant la couverture.

> 💡 **Objectif Principal**
>
> Ces techniques permettent de **réduire drastiquement** le nombre de cas de test tout en garantissant une couverture exhaustive des comportements du système. Au lieu de tester toutes les valeurs possibles, nous testons des **représentants** de chaque catégorie de valeurs.

---

## 1. Partitionnement par Classes d'Équivalence (PCE)

Le partitionnement par classes d'équivalence (PCE) est une technique qui consiste à **découper le domaine d'entrée** en classes d'équivalence.

### 🤔 Qu'est-ce qu'une Classe d'Équivalence ?

Une classe d'équivalence est un ensemble de valeurs d'entrée qui sont considérées égales (elles ont le **même effet**) pour le système testé.

- Toutes les valeurs au sein d'une classe sollicitent le système de la **même manière**.
- Elles ont donc une probabilité équivalente de révéler des défauts.
- Le but est de **limiter le nombre de valeurs à une seule valeur par classe d'équivalence**.

### 🛠️ Application Pratique

#### Exemple 1 : Domaine Numérique Simple (Valeurs entre 1 et 100)

Considérons un domaine d'entrée où seules les valeurs comprises **entre 1 et 100** (inclus) sont valides.

| Type de Classe | Plage de Valeurs | Description | Choix de Valeur Représentative (PCE) |
|---|---|---|---|
| **Classe Valide (CV)** | De 1 à 100 | Les valeurs acceptées. | **43** |
| **Classe Invalide 1 (CI)** | < 1 | Valeurs invalides à gauche du domaine. | **-5** |
| **Classe Invalide 2 (CI)** | > 100 | Valeurs invalides à droite du domaine. | **155** |

Nous obtenons ainsi **trois valeurs** (-5, 43, 155) pour couvrir l'ensemble du domaine d'entrée.

#### Exemple Redmine : Champ "Temps Passé" (Heures)

Dans Redmine, lors de la saisie du temps passé sur une tâche, le système accepte les valeurs entre **0.25 et 999.99** heures.

| Type de Classe | Plage de Valeurs | Valeur de Test PCE | Résultat Attendu |
|---|---|---|---|
| **CV** | 0.25 à 999.99 | **50.5** | ✅ Accepté |
| **CI 1** | < 0.25 | **0.10** | ❌ Rejeté (trop petit) |
| **CI 2** | > 999.99 | **1500.00** | ❌ Rejeté (trop grand) |

---

## 2. Analyse des Valeurs Frontières (AVF)

L'analyse des valeurs frontalières est une **méthode complémentaire** au PCE. Elle permet d'analyser le comportement du système avec des **valeurs frontalières** (aux limites des classes).

> ⚠️ **Observation Clé**
>
> L'expérience montre que les erreurs de codage sont **fréquemment commises aux frontières** des domaines (erreurs de type `<` au lieu de `<=`, ou confusion dans les limites).

### 🛠️ Application Pratique

Pour chaque frontière, nous testons la valeur **sur** la frontière et les valeurs **juste à côté** (le cas échéant).

#### Exemple 1 (Suite) : Domaine Numérique (De 1 à 100)

- **Frontière inférieure (1) :** On teste **0, 1, 2**.
- **Frontière supérieure (100) :** On teste **99, 100, 101**.

**Les valeurs de test critiques pour l'AVF sont :** **0, 1, 2, 99, 100, 101**.

> ✅ **Bonne Pratique**
>
> Le PCE et l'AVF sont souvent utilisés **ensemble**, car il est également important de prendre en compte les valeurs aux limites lors de la définition des classes d'équivalence. Combinez toujours ces deux techniques pour une couverture optimale.

#### Exemple Redmine : Champ "Pourcentage d'Achèvement" (0-100%)

Le champ "Pourcentage d'achèvement" dans Redmine accepte uniquement des valeurs entières entre 0 et 100.

| Frontière | Valeurs AVF | Résultat Attendu |
|---|---|---|
| **Limite inférieure (0)** | **-1, 0, 1** | ❌ Rejeté \| ✅ Accepté \| ✅ Accepté |
| **Limite supérieure (100)** | **99, 100, 101** | ✅ Accepté \| ✅ Accepté \| ❌ Rejeté |

---

## 3. Cas Spécifiques

### A. Cas d'un Domaine avec Sous-Intervalles

Si le système applique des **méthodes de calcul différentes** pour des sous-intervalles au sein du domaine valide, chaque sous-intervalle doit être traité comme une classe d'équivalence valide distincte (CEV).

#### Exemple : Tarification Progressive

Un système de tarification applique des taux différents selon le nombre d'heures :

- **1 à 20 heures :** Taux normal (100€/h)
- **21 à 60 heures :** Taux réduit (80€/h)
- **61 à 100 heures :** Taux préférentiel (60€/h)

| Classe | Plage | Valeur PCE | Valeurs AVF |
|---|---|---|---|
| **CEinv 1** | < 1 | **-5** | 0, 1 |
| **CEV 1** | 1 - 20 | **12** | 1, 2, 19, 20 |
| **CEV 2** | 21 - 60 | **43** | 20, 21, 22, 59, 60 |
| **CEV 3** | 61 - 100 | **80** | 60, 61, 62, 99, 100 |
| **CEinv 2** | > 100 | **155** | 100, 101 |

### B. Cas d'un Champ de Type Texte

Pour un champ de type texte, il est nécessaire d'analyser l'ensemble des **contraintes définies**. Chaque contrainte donnera lieu à un ensemble de classes d'équivalence valides et invalides.

#### Exemple : Champ Nom/Prénom dans Redmine

Analysons le champ "Nom de l'utilisateur" avec les contraintes suivantes :

**1. Taille du champ :** Minimum 2 caractères, Maximum 35 caractères

- *Classes Valides (CV) :* **[2, 35]**
- *Classes Invalides (CI) :* **0, 1, > 35**
- *Tests AVF :* **1, 2, 3, 34, 35, 36**

**2. Champ Obligatoire :**

- *Classe Valide :* Champ non vide (ex : chaîne de 10 caractères)
- *Classe Invalide :* Champ vide (ex : chaîne de 0 caractère)

**3. Contenu :** N'accepte que les lettres de l'alphabet

- *Classe Valide :* Chaîne avec uniquement des lettres (ex : "JohnDoe")
- *Classe Invalide :* Chaîne avec des caractères alphabétiques **et un caractère spécial** (ex : "John@Doe")

**4. Format :** Le premier caractère doit être majuscule

- *Classe Valide :* Chaîne avec le premier caractère en majuscule (ex : "Dupont")
- *Classe Invalide :* Chaîne avec le premier caractère en minuscule (ex : "dupont")

#### Table de Synthèse des Cas de Test

| Cas | Valeur de Test | Longueur | Obligatoire | Format | Résultat |
|---|---|---|---|---|---|
| 1 | **Dupont** | ✅ 6 | ✅ Non vide | ✅ Maj+lettres | ✅ Valide |
| 2 | **A** | ❌ 1 | ✅ Non vide | ✅ Maj+lettres | ❌ Invalide (trop court) |
| 3 | **Ab** | ✅ 2 (frontière) | ✅ Non vide | ✅ Maj+lettres | ✅ Valide |
| 4 | **(vide)** | ❌ 0 | ❌ Vide | - | ❌ Invalide (champ obligatoire) |
| 5 | **dupont** | ✅ 6 | ✅ Non vide | ❌ Min+lettres | ❌ Invalide (pas de majuscule) |
| 6 | **Dup@ont** | ✅ 7 | ✅ Non vide | ❌ Maj+lettres+@ | ❌ Invalide (caractère spécial) |
| 7 | **Duponttreslong...** | ❌ 36 | ✅ Non vide | ✅ Maj+lettres | ❌ Invalide (trop long) |

### C. Cas d'une Liste de Choix (Liste Déroulante)

Les listes de choix se divisent en deux types :

#### 1. Listes de Choix Figées (Statiques)

- Le contenu ne change pas.
- **Chaque élément de la liste est une classe d'équivalence à part entière**.
- Chaque élément est donc une valeur à tester, car chaque choix peut influencer différemment le comportement du reste de l'interface.

##### Exemple Redmine : Priorité de Demande

| Valeur | Classe | À Tester ? |
|---|---|---|
| **Basse** | CEV 1 | ✅ Oui |
| **Normale** | CEV 2 | ✅ Oui |
| **Haute** | CEV 3 | ✅ Oui |
| **Urgente** | CEV 4 | ✅ Oui |
| **Immédiate** | CEV 5 | ✅ Oui |

#### 2. Listes de Choix Évolutives (Dynamiques)

- Le contenu peut être enrichi par l'utilisateur (ex: liste des fichiers récents, liste des projets).
- Les éléments ne peuvent pas être prévus à l'avance par le programmeur.
- Il est acquis que **toutes les valeurs se valent (une seule classe d'équivalence valide)**.
- Une seule valeur sera prise pour représenter cette classe d'équivalence.

##### Exemple Redmine : Liste des Projets de l'Utilisateur

La liste des projets disponibles varie selon les droits de l'utilisateur. Il n'est pas nécessaire de tester tous les projets, mais seulement de vérifier que le mécanisme de sélection fonctionne avec **au moins un projet**.

---

## 4. Stratégie de Test Complète

### 🎯 Processus Recommandé

1. **Identifier toutes les contraintes** du champ ou de la fonctionnalité
2. **Définir les classes d'équivalence** (valides et invalides) pour chaque contrainte
3. **Sélectionner une valeur représentative** par classe (PCE)
4. **Identifier les frontières** entre les classes
5. **Ajouter les valeurs frontières** (sur la limite, à gauche, à droite) - AVF
6. **Créer les cas de test** en combinant les contraintes

> ⚠️ **Attention**
>
> Pour les champs avec **plusieurs contraintes**, il est important de créer des cas de test qui testent **une seule contrainte à la fois** ainsi que des cas qui testent la **combinaison de contraintes**. Cela permet d'isoler les défauts et de comprendre leur origine.

---

## 5. Avantages et Limites

### ✅ Avantages

- **Réduction du nombre de tests** : Évite la redondance en testant des valeurs équivalentes
- **Couverture systématique** : Garantit que tous les comportements sont testés
- **Détection précoce des défauts** : Les erreurs de frontière sont fréquentes et critiques
- **Méthode structurée** : Approche méthodique et documentable
- **Applicable à tous types de données** : Numérique, texte, listes, dates, etc.

### ⚠️ Limites

- Ne teste pas les **interactions entre champs** (pour cela, voir le Pairwise Testing)
- Nécessite une **bonne compréhension des spécifications**
- Peut être **chronophage** pour les champs avec de nombreuses contraintes
- Ne remplace pas les tests de **performance ou de sécurité**

---

## 6. Résumé des Bonnes Pratiques

✅ Toujours **commencer par PCE** pour identifier les classes

✅ **Compléter avec AVF** pour tester les frontières

✅ Documenter clairement les **contraintes** de chaque champ

✅ Tester les contraintes **individuellement et combinées**

✅ Adapter la technique aux **types de données** (numérique, texte, liste)

✅ Combiner avec d'autres techniques (Pairwise, décision) pour une couverture complète

---

## 📚 Ressources Complémentaires

- **ISO/IEC/IEEE 29119-4** : Techniques de test
- **ISTQB Foundation** : Chapitre sur les techniques de conception
- **Guide PICT** : Pour tester les combinaisons de paramètres

---

## 💡 Conseils Pratiques

- **Documenter** : Créez un tableau récapitulatif pour chaque champ testé
- **Prioriser** : Commencez par les champs critiques et obligatoires
- **Automatiser** : Ces tests sont idéaux pour l'automatisation
- **Réviser** : Mettez à jour vos tests quand les spécifications changent

---

## ❓ Questions Fréquentes

**Q : Combien de valeurs par classe ?**

R : Une seule valeur représentative suffit pour le PCE. Ajoutez les valeurs frontières avec AVF.

**Q : Faut-il toujours combiner PCE et AVF ?**

R : Oui, c'est fortement recommandé car les erreurs se produisent souvent aux frontières.

**Q : Et pour les combinaisons de champs ?**

R : Utilisez le Pairwise Testing (PICT) pour tester efficacement les interactions entre plusieurs champs.

---

## ℹ️ Note Importante

Ces techniques sont fondamentales dans le test logiciel et sont au programme de la certification **ISTQB Foundation Level**. Maîtriser ces concepts est essentiel pour tout testeur professionnel.

---

## 📝 Exercices Pratiques

### Exercice 1 : Champ Âge

Un formulaire d'inscription accepte les âges entre 18 et 120 ans.

1. Définissez les classes d'équivalence (valides et invalides)
2. Sélectionnez une valeur représentative pour chaque classe (PCE)
3. Identifiez les valeurs frontières (AVF)
4. Créez le tableau récapitulatif des cas de test

### Exercice 2 : Champ Email

Un champ email a les contraintes suivantes :
- Minimum 5 caractères, Maximum 100 caractères
- Doit contenir exactement un "@"
- Doit contenir au moins un "." après le "@"
- Ne peut pas commencer ou finir par "@" ou "."

1. Listez toutes les contraintes
2. Définissez les classes d'équivalence pour chaque contrainte
3. Créez au moins 10 cas de test couvrant les classes valides et invalides

### Exercice 3 : Système de Remise

Un système de e-commerce applique les remises suivantes sur le montant total :
- 0-49.99€ : Aucune remise
- 50-99.99€ : 5% de remise
- 100-499.99€ : 10% de remise
- 500€ et plus : 15% de remise

1. Identifiez les classes d'équivalence
2. Définissez les valeurs de test PCE
3. Définissez les valeurs de test AVF pour chaque frontière
4. Créez un tableau complet des cas de test

---

## 📖 Exemple Complet : Formulaire de Création de Demande Redmine

### Spécifications

**Champ Sujet :**
- Obligatoire
- Minimum 3 caractères, Maximum 255 caractères
- Peut contenir lettres, chiffres, espaces, et certains caractères spéciaux (- _ : .)
- Ne peut pas être uniquement des espaces

**Champ Priorité :**
- Obligatoire
- Liste fixe : Basse, Normale, Haute, Urgente, Immédiate

**Champ Temps Estimé (heures) :**
- Optionnel
- Si renseigné : entre 0.25 et 999.99
- Maximum 2 décimales

### Solution : Cas de Test

#### Champ Sujet

| ID | Valeur | Longueur | Obligatoire | Contenu | Résultat |
|---|---|---|---|---|---|
| T1 | "Bug affichage" | 14 | ✅ | ✅ Valide | ✅ Accepté |
| T2 | "Ab" | 2 | ✅ | ✅ Valide | ❌ Trop court |
| T3 | "Bug" | 3 (frontière) | ✅ | ✅ Valide | ✅ Accepté |
| T4 | "" (vide) | 0 | ❌ | - | ❌ Obligatoire |
| T5 | "   " (espaces) | 3 | ✅ | ❌ Espaces | ❌ Invalide |
| T6 | "Bug-123_test:v2.0" | 18 | ✅ | ✅ Valide | ✅ Accepté |
| T7 | "Bug@affichage" | 14 | ✅ | ❌ @ invalide | ❌ Caractère interdit |
| T8 | (255 caractères) | 255 (frontière) | ✅ | ✅ Valide | ✅ Accepté |
| T9 | (256 caractères) | 256 | ✅ | ✅ Valide | ❌ Trop long |

#### Champ Priorité

| ID | Valeur | Classe | Résultat |
|---|---|---|---|
| P1 | Basse | CEV 1 | ✅ Accepté |
| P2 | Normale | CEV 2 | ✅ Accepté |
| P3 | Haute | CEV 3 | ✅ Accepté |
| P4 | Urgente | CEV 4 | ✅ Accepté |
| P5 | Immédiate | CEV 5 | ✅ Accepté |
| P6 | (vide) | CEinv | ❌ Obligatoire |

#### Champ Temps Estimé

| ID | Valeur | Classe | Frontière | Résultat |
|---|---|---|---|---|
| E1 | 50.5 | CV | - | ✅ Accepté |
| E2 | (vide) | CV (optionnel) | - | ✅ Accepté |
| E3 | 0.10 | CI | < min | ❌ Trop petit |
| E4 | 0.24 | CI | Frontière inf | ❌ Trop petit |
| E5 | 0.25 | CV | Frontière inf | ✅ Accepté |
| E6 | 0.26 | CV | Frontière inf | ✅ Accepté |
| E7 | 999.98 | CV | Frontière sup | ✅ Accepté |
| E8 | 999.99 | CV | Frontière sup | ✅ Accepté |
| E9 | 1000.00 | CI | Frontière sup | ❌ Trop grand |
| E10 | 50.123 | CI | Décimales | ❌ Trop de décimales |

---

## 🎓 Pour Aller Plus Loin

### Combinaison avec d'autres techniques

1. **Table de Décision** : Pour tester les combinaisons de conditions booléennes
2. **Pairwise Testing (PICT)** : Pour tester efficacement les interactions entre plusieurs paramètres
3. **Tests d'État** : Pour tester les transitions entre états
4. **Tests Exploratoires** : Pour découvrir des défauts non anticipés

### Automatisation des Tests PCE/AVF

Les tests basés sur les classes d'équivalence et les valeurs frontières sont idéaux pour l'automatisation :

```python
# Exemple Python avec pytest
import pytest

class TestTempsPasseRedmine:
    
    @pytest.mark.parametrize("heures,attendu", [
        (0.10, False),    # CI : < min
        (0.25, True),     # CV : frontière inf
        (50.5, True),     # CV : milieu
        (999.99, True),   # CV : frontière sup
        (1500.0, False),  # CI : > max
    ])
    def test_validation_temps_passe(self, heures, attendu):
        resultat = valider_temps_passe(heures)
        assert resultat == attendu
```

### Métriques de Couverture

Calculez la couverture de vos tests :

- **Couverture des classes d'équivalence** = (Nombre de classes testées / Nombre total de classes) × 100%
- **Couverture des frontières** = (Nombre de frontières testées / Nombre total de frontières) × 100%

**Objectif recommandé** : 100% de couverture des classes valides et des frontières critiques, minimum 80% pour les classes invalides.

---


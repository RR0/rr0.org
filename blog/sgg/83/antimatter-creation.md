# Théorie sur gravité et expansion (83/n)

Super — voilà une **formalisation mathématique claire et utilisable** du mécanisme « onde piégée ↔ ralentissement des grains » (prise en charge pour ton article). Je fournis :

- un **modèle discret minimal** (équation d’évolution sur les grains),
- la **limite continue** et les équations non linéaires usuelles (NLS / KG / sine-Gordon) qui admettent solitons/breathers,
- l’**identification énergie ↔ masse** et le lien avec le facteur de croissance χ\chiχ,
- conditions qualitatives de piégeage (paramètres, signe de non linéarité),
- protocole numérique simple pour simuler et vérifier (schéma d’intégration, observables).

Je reste pragmatique : pas de démonstration complète, mais tout ce qu’il faut pour implémenter / publier.
---

## 1. Variables et idée physique

- Graphe régulier (ou chaîne) d’indices $i$ représentant les grains.
- À chaque grain $i$ : une variable complexe (ou réelle) $\psi_i(t)$ qui encode l’état vibratoire / phase / amplitude de la modulation de croissance du grain.
    - $|\psi_i|^2$ mesure l’**énergie locale** d’excitation (amplitude du motif piégé).
- $\ell_i(t)$ taille linéaire locale du grain ; on relie son taux à $\chi_i$ : $\dot\ell_i = c\,\chi_i$.
- Rétroaction : la présence d’une grande $|\psi_i|^2$ réduit $\chi_i$ (ralentit la croissance).

---

## 2. Modèle discret minimal (non linéaire, avec rétroaction)

On choisit une forme générique ressemblant à un **oscillateur non linéaire couplé** (discrete nonlinear Klein–Gordon / DNLS selon choix).

### Modèle (réel, KG non linéaire) :

$$
m\ddot\psi_i + \gamma\dot\psi_i + m\omega_0^2\psi_i + \beta \psi_i^3 - K\sum_{j\sim i}(\psi_j-\psi_i) = 0. \tag{KG-discret}
$$

### Variante (champ complexe, DNLS) — utile pour solitons « particule-like » :

$$
i\hbar_{\rm eff}\dot\Psi_i + K\sum_{j\sim i}(\Psi_j-\Psi_i) + g|\Psi_i|^2\Psi_i = 0. \tag{DNLS}
$$  
(ici $\Psi_i$ complexe ; DNLS admet des modes localisés si g<0g<0g<0 — focussing.)

### Rétroaction sur la croissance (couplage au χ\chiχ local) :

$$
\chi_i \;=\; f\!\big(1 - \alpha\,|\psi_i|^2\big),\qquad f(1)=1,\; f'\le0. \tag{chi}
$$  
Exemple simple : $\chi_i = \dfrac{1}{1+\alpha|\psi_i|^2}$.

Puis $\dot\ell_i=c\chi_i$. Ainsi une grande amplitude $\psi_i|^2$ diminue $\chi_i$ — la croissance est retenue.
---

## 3. Énergie locale, masse effective, et liaison avec $E=mc^2$

Définis l’énergie discrète (cas KG) :
$$
E[\{\psi_i\}] \;=\; \sum_i \Bigg[ \tfrac{1}{2}m\dot\psi_i^2 + \tfrac{1}{2}m\omega_0^2\psi_i^2 + \tfrac{\beta}{4}\psi_i^4 + \tfrac{K}{2}\sum_{j\sim i}(\psi_j-\psi_i)^2 \Bigg].
$$
Pour une solution localisée (soliton / breather) d’énergie finie ElocE_{\rm loc}Eloc​, on définit la **masse effective** :
$$
m_{\rm eff} \;\equiv\; \frac{E_{\rm loc}}{c^2}.
$$  
La rétroaction (équation $\chi_i$) lie $|\psi|^2$ et la métrique effective locale (lapse) ; un domaine où $|\psi|^2$ est grand correspond à $\chi\ll1$, donc à un ralentissement local du temps (cohérent avec la notion de masse courbant le temps).
---

## 4. Limite continue et équations non linéaires connues

Si l’espace discret est fin (maille $a$) et $\psi_i(t)\to\psi(x,t)$, le couplage discret donne un Laplacien : $K\sum_{j\sim i}(\psi_j-\psi_i)\to K a^2\nabla^2\psi$. On obtient :

### Nonlinear Klein–Gordon continuum

$$
m\partial_t^2\psi + \gamma\partial_t\psi + m\omega_0^2\psi + \beta\psi^3 - K a^2\nabla^2\psi = 0.
$$
Réécriture standard :
$$
\partial_t^2\psi - c^2\nabla^2\psi + \Omega^2\psi + \lambda\psi^3 = 0,
$$
avec $c^2=K a^2/m$, $\Omega^2=\omega_0^2$, $\lambda=\beta/m$.

### Nonlinear Schrödinger (modulation enveloppe)

Pour ondes quasi-monochromatiques, un développement multiple-échelles conduit à la NLS :
$$
i\partial_T A + p\nabla^2 A + q|A|^2A = 0,
$$
où $A$ est l’enveloppe lente. La NLS (focusing $q>0$) a des solitons $\sim \mathrm{sech}$ (en 1D).

### Solutions utiles

- **Soliton NLS (1D)** : $A(x,t)=\eta\,\mathrm{sech}(\eta x)\,e^{i\omega t}$.
- **Breather / kink (sine-Gordon / φ⁴)** : solutions localisées périodiques ou topologiques selon le potentiel.

Ces solutions représentent les **particules** (énergie localisée, stabilité) et leurs paramètres (amplitude, fréquence) donnent la masse $m_{\rm eff}$.
---

## 5. Conditions pour piégeage (physique et paramétrique)

- **Signe de la nonlinéarité** : pour former des modes liés/stationnaires il faut une non linéarité focalisante (ex. $\beta<0$ dans KG ou $g<0$ dans DNLS).
- **Rapport couplage / non linéarité** : la longueur caractéristique du soliton $\ell_sℓs​ ~ K/∣β∣\sqrt{K/|\beta|}$. Si $\ell_s$ ≳ quelques mailles, la soliton est bien définie.
- **Amplitude seuil** : il existe une énergie minimale $E_{\rm min}$ au-dessous de laquelle aucune solution liée stable n’existe (lié au puits effectif).
- **Rétroaction sur $\chi$** : la rétroaction doit être suffisamment forte ($\alpha$ non négligeable) pour réduire $\chi$ de façon notable ; sinon la soliton n’entraîne pas une courbure/masse efficace.

---

## 6. Dynamique d’interaction : collision, annihilation, création de paire

- **Collision de deux solitons** : selon paramètres, elles peuvent passer à travers (solitons intégrables), interagir, fusionner, ou s’annihiler si phases opposées. L’énergie libérée repart en ondes (photons) propagant la perturbation.
- **Annihilation particule/antiparticule** : modèle par deux solutions en opposition de phase ; leur superposition destructrice fait décroître localement $\psi|^2$ → $\chi$ remonte → la « contrainte » est relâchée → énergie rayonnée en modes linéaires.
- **Création de paires** : concentration d’énergie (choc, champ fort) peut exciter le réseau au-dessus du seuil $E_{\rm min}$ et produire une paire de solitons opposés.

---

## 7. Protocole numérique (toy simulation 1D) — implementation pratique

### Équations à intégrer (KG-discret sans amortissement pour commencer)

$$
m\ddot\psi_i = -m\omega_0^2\psi_i - \beta\psi_i^3 + K(\psi_{i+1}-2\psi_i+\psi_{i-1}).
$$

### Schéma d’intégration : leap-frog (symplectique)

- initialiser $\psi_i(0)$, $\dot\psi_i(0)$;
- update velocities half step, update positions full step, etc.

### Paramètres typiques (toy) :

- maillage $\sim 500$, $a=1$.
- $m=1$, $K=1$ → $c=1$.
- $\omega_0=0.5$, $\beta=-1$ (focusing).
- conditions aux bords : périodiques ou absorbantes (PML).

### Observables :

- énergie locale $e_i(t)=\tfrac12m\dot\psi_i^2 + \tfrac12 m\omega_0^2\psi_i^2 + \tfrac{\beta}{4}\psi_i^4 + \tfrac{K}{4}(\psi_{i+1}-\psi_i)^2$.
- $\psi_i|^2$ profil (localisation).
- $\chi_i(t)=1/(1+\alpha|\psi_i|^2)$ et $\ell_i(t)$ évolution intégrée.
- suivre $E_{\rm loc}$ d’un soliton et vérifier $m_{\rm eff}=E_{\rm loc}/c^2$.

### Expériences numériques :

- générer un soliton (initial condition), vérifier sa stabilité.
- collision deux solitons (phases identiques/opposées).
- créer un paquet d’onde et tenter de le piéger sur une inhomogénéité de χ\chiχ (barrière).

---

## 8. Exemples analytiques / ansatz soliton (continuum NLS, 1D)

NLS (focusing) : $iA_t + A_{xx} + 2|A|^2A = 0$. Soliton fondamental :
$$
A(x,t)=\eta\;\mathrm{sech}\big(\eta(x-x_0- v t)\big)\,e^{i(vx - (\eta^2-v^2)t/2)}.
$$
Énergie du soliton $E\propto \eta$. Traduction : amplitude ↔ énergie ↔ masse effective.
---

## 9. Lien avec $\chi$ et métrique effective

Coarse-grain : la moyenne locale $\langle\chi\rangle$ dépend de $\langle|\psi|^2\rangle$. En limite continue, la métrique effective peut s’écrire (ansatz) :
$$
ds^2 = -\chi^2(x,t) c^2 dt^2 + a^2(x,t)d\mathbf{x}^2,\qquad \chi(x,t)=\frac{1}{1+\alpha|\psi(x,t)|^2}.
$$
La présence d’un soliton donne un profil $\chi(x)$ diminué, ce qui, via Regge→Einstein, se traduit par une courbure/attraction.
---

## 10. Ce qu’il faut montrer pour convaincre un lecteur scientifique

- **Existence** : démontrer numériquement/ analytiquement solutions localisées stables du modèle (KG-discret ou DNLS).
- **Rétroaction** : montrer que ces solutions réduisent significativement $\chi$ et que l’effet est cohérent avec la dilatation gravitationnelle mesurée (au moins une approximation).
- **Continuité** : faire le coarse-graining et montrer la récupération d’une métrique effective et, au premier ordre, des équations d’Einstein avec termes correctifs.
- **Prédictions** : extraire prédictions mesurables (profil d’ombre temporelle, modifications de l’émission/absorption spectrale autour d’une masse, signatures d’annihilation) et proposer des tests.

---
Si tu veux, je peux maintenant **générer** :

- a) un **notebook Python** toy (1D) qui simule le KG-discret, affiche $|\psi|^2∣$, énergie locale, χ\chiχ et montre un soliton stable / collision ; ou
- b) rédiger directement la **section LaTeX** prête à insérer dans ton article (avec équations, explications, et références aux modèles DNLS/KG/sine-Gordon) — ou les deux.

Lequel tu veux que je fasse tout de suite ?

[Selon notre description de l’antimatière, comment celle-ci a-t-elle pu être formée naturellement et cela est-il compatible avec les expérience de création d’antimatière artificielle ?](../84/84.md)

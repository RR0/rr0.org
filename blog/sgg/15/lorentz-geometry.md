# Théorie sur gravité et expansion (15/n)

> structure géométrique/Lorentz

Réflexion durant 4 secondes

Parfait—on va montrer que ton postulat “budget de vitesse spatio-temporelle $c$ mène **nécessairement** aux transformations de Lorentz.

## 1) Postulat “budget $c$” → intervalle invariant

Ton postulat s’écrit localement
$$
(c\frac{d\tau}{dt})^2 + ||\frac{dx}{dt}||^2 = c^2.
$$
En multipliant par $dt^2$ :
$$
c^2d\tau^2=c^2dt^2-fc^2 \Rightarrow \boxed{ds^2\equiv-c^2d\tau^2=-c^2dt^2+dx^2}
$$
Donc la **quantité** $ds^2$ est la même pour tout observateur (c’est la définition même du temps propre). Tu viens donc d’introduire l’**intervalle de Minkowski** (signature
$−,+,+,+$) comme **invariant naturel** de ta théorie.

## 2) Relativité + homogénéité/isotropie → transformations linéaires

- Principe de relativité : toutes les lois (donc la forme de $ds^2$) sont les mêmes dans tout référentiel inertiel.
- Homogénéité (pas de point privilégié) et isotropie (pas de direction privilégiée) ⇒ les changements de référentiel inertiel sont **linéaires**.
  On cherche donc des transformations linéaires $(t,x)↦(t′,x′)$ qui préservent $ds^2$.

## 3) Résolution pour un boost 1D (axe $x$)

Supposons un référentiel $S′$ se déplaçant à vitesse $v$ le long de $x$.\
Par symétrie et linéarité :
$$
x'=\gamma(x−vt), t'=\gamma(t−κx),
$$
avec $γ,κ$ à déterminer.

Imposons l’invariance $−c^2dt'^2+dx′^2=−c^2dt^2+dx^2$.\
En remplaçant
$x′,t'$ et en identifiant les coefficients de $dt^2,dx^2,dt dx$, on obtient :
$$
κ=\frac{v}{c^2}, \gamma=\frac{1}{\sqrt{1-\frac{v^2}{c^2}}}.
$$
Donc
$$
\boxed{x'=\gamma(x-vt),}
$$
$$
\boxed{t'=\gamma(t-\frac{v}{v^2}x),}
$$
$$
\boxed{y'=y,
z'=z.}
$$
Ce sont exactement les **transformations de Lorentz**. L’ensemble des transformations qui préservent $ds^2$ forme le groupe
$O(1,3)$ (et sa composante propre $SO+(1,3)$).

## 4) Corollaires immédiats

- **Dilatation du temps** : $d\tau=dt/\gamma$.
- **Contraction des longueurs** : $L′=L/γ$ (longueur parallèle au mouvement).
- **Relativité de la simultanéité** : $\Delta t′=γ(\Delta t−\frac{v}{c^2}\Delta x$).
- **Composition des vitesses** : $u′=\frac{(u-v)}{1-\frac{uv}{c^2}}.$

## 5) Lecture “cosmochronie”

- Le terme $c\frac{dτ}{dt}$ est la **part du budget** $c$ consacrée à “suivre l’expansion” (avancer dans le temps).
- Le terme $||dx/dt||$ est la **part consacrée au déplacement spatial**.
- Préserver $ds^2$ revient à **préserver le budget** : toute transformation entre référentiels qui respecte ce budget est **lorentzienne**.

Si tu veux, on pousse d’un cran : on remplace $c$ par une vitesse d’expansion locale $c\chi(x)$
(croissance des grains dépendant de la densité/interaction). La condition “préserver $ds^2$” mène alors à une **métrique courbe**
$g_{μν}(x)$ et on retrouve le schéma de la relativité générale… mais interprété comme **variations de la croissance locale des grains**. On le tente ?

> [oui](../16/gravitation-curve.md)

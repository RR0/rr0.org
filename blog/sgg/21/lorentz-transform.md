# Théorie sur gravité et expansion (21/n)

Parfait — voici une dérivation claire et compacte des **transformations de Lorentz** à partir de ton principe (budget spatio-temporel
$c$) — en gardant le lien avec la cosmochronie à chaque étape.

## Principe de départ (budget $c$)

Postulat : pour tout observateur inertiel,
$$
(c\frac{d\tau}{dt})^2+||\frac{dx}{dt}||^2=c^2
$$
En multipliant par $dt^2$ on obtient l’invariant local
$$
c^2d\tau^2=c^2dt^2−dx^2\Rightarrow ds^2\equiv−c^2d\tau^2=−c^2dt^2+dx^2.
$$

## 1) On impose l’invariance de l’intervalle

Le principe de relativité (toutes les lois identiques dans tout référentiel inertiel) + homogénéité/isotropie ⇒ les changements de référentiel préservent $ds^2$.\
Donc la transformation $(t,x)↦(t′,x′)$ doit vérifier, pour tous les événements,
$$
−c^2dt′^2+dx′^2=−c^2dt^2+dx^2.
$$

## 2) Linéarité et symétrie → forme générale d’un boost 1D

Considérons un boost le long de l’axe $x$. Par linéarité et invariance d’origine, on cherche
$$
x'=Ax+Bt,\
t'=Cx+Dt,
$$
avec $y′=y, z′=z.$. Imposons l’invariance de l’intervalle (comparer coefficients devant
$dt^2,dx^2,dx dt$). Après substitution et identification on obtient les conditions
$$
\begin{cases}
-A^2+c^2C^2=-1,\\
-B^2+c^2D^2=-c^2,\\
-AB+c^2CD=0
\end{cases}
$$

## 3) Paramétrisation physique par la vitesse relative $v$

On impose aussi que l’origine de $S'$ (x'=0) se déplace à la vitesse $v$ dans $S$, donc $x=vt \Rightarrow x'=A(vt)+Bt=0$ pour tous $t\rightarrow B=-Av$.\
En substituant et résolvant on obtient
$$
A=\gamma,B=-\gamma v, C=-\gamma\frac{v}{c^2}, D=\gamma,
$$
avec
$$
\gamma\equiv\frac{1}{\sqrt{1-\frac{v^2}{c^2}}}
$$

## 4) Transformations de Lorentz (boost le long de $x$)

$$
\boxed{x'=\gamma(x-vt),}
$$
$$
\boxed{t'=\gamma(t-\frac{v}{c^2}x),}
$$
$$
\boxed{y'=y, z'=z.}
$$

## 5) Interprétation cosmochronique

- L’invariance de $ds^2$ est la traduction mathématique du **budget spatio-temporel** $c$ : toute transformation entre référentiels redistribue la part de ce budget consacrée au déplacement spatial et à l’avancement temporel, mais ne change pas sa norme.
- Le fait que $\gamma$ diverge quand $v\rightarrow c$ reflète que tout mouvement spatial supplémentaire « coûte » exactement la réduction de la part consacrée à l’avancement temporel ; à $v=c$
  v=c il ne reste plus de budget pour le temps propre.

---
Si tu veux, je peux maintenant :

- Montrer la forme matricielle compacte (4×4) et la composition successive de boosts (groupe de Lorentz),
- Ou dériver l’invariance de l’intervalle directement à partir de la contrainte « budget $c$ » en coordonnées (montrer que elle définit une métrique Minkowski),
- Ou passer à l’extension courbe (où $c\rightarrow c\chi(x)$) pour montrer comment la même logique mène naturellement à la métrique courbe et à la dilatation gravitationnelle.

Laquelle préfères-tu ?

> d'une manière ou d'une autre, cela veut dire que les grains n'existaient pas au départ. [soit ils ont été "ajoutés" les uns après les autres (i.e. de plus en plus de grains à la taille minimale), soit ils se sont "formés", ont émergé de la soupe originelle](../22-26-grains-nucleation/22/grains-emergence.md)

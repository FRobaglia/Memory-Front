# **Memory** 
_(educational purpose)_
### URL du site
https://memory-hetic.netlify.app/

### Comptes utilisateurs

| Role    | Username                    | Password  |
| ------- | --------------------------- | --------- |
| User    | john.doe@hetic.net          | john      |
| User    | jane.doe@hetic.net          | jane      |
| Manager | felix.robaglia@hetic.net    | felix     |
| Manager | thomas.evano@hetic.net      | thomas    |
| Manager | amanda.tan@hetic.net        | amanda    |
| Manager | christina.stephan@hetic.net | christina |

## **Pitch**
Memory offre un espace de recueillement pour les proches d’une personne décédée, dédiée à sa mémoire grâce à un regroupement de souvenirs. L'application a pour but de rassembler des pièces de souvenir d’une personne pour créer une image avec toutes les facettes de celle-ci.   
Un utilisateur peut créer plusieurs espaces dédiés à des proches, où une communauté composée de sa famille, de son entourage et  de ses amis, viennent commémorer ensemble des souvenirs passés avec celle-ci venant compléter le puzzle de sa vie


## **Team & autres ressources**
**[API](https://memory-school-api.herokuapp.com/documentation)** documentation  
par [Jean Tostivint](https://github.com/JyTosTT)


**[UX UI Design / Front-end templates & animation](https://memorydesign.netlify.app/)**  
En savoir plus : [figma](https://www.figma.com/file/UKfQKLKJYKFaLbrl2udpit/Memory?node-id=563%3A13)  
par [Christina Stephan](https://github.com/christinastep)

Développeurs Front : 
- [Thomas Evano](https://github.com/Thomasevano)
- [Félix Robaglia](https://github.com/FRobaglia)
- [Amanda Tan](https://github.com/tanamanda13)



## **Choix technologiques**

Pour déterminer les technos utilisées, il fallait au préalable déterminer ce qu'on allait produire et pour qui.

### **Cible** 🎯 
Notre audience potentielle est relativement restreinte au regard du thème de notre sujet (la mort, le deuil). divertissement. Ainsi, ce secteur n'a pas d'enjeu à fort trafic. Si la site vitrine (homepage) mériterait éventuellement de rechercher le meilleur référencement, ce n’est pas le cas pour la partie application de notre site. Au contraire, le contenu de nos espaces de mémoire dédiés aux personnes décédées est réservé à des membres validés par le manager de l’espace.

Cependant, le profil de nos futurs utilisateurs se veut lui très large. Nous souhaitons nous adresser à toutes les tranches d'âge. Ce sujet hélàs n'exclut personne. 

### **Production** 🚧
La partie application de notre site web se concentrera davantage sur la recherche d’une expérience d’utilisation agréable, la sensation de modernité des SPA qu’on retrouve dans le mobile.

La présence sur mobile était sans conteste un pré-requis pour nos futurs utilisateurs. L'application répond au besoin de se recueillir, du sentiment nostalgique qui peut survenir à tout moment, sans contexte particulier.

L'application web est développée grâce au framework JavaScript **React** : il facilite la création d’interface utilisateur et permet surtout de créer des interfaces et des composants réutilisables et du contenu dynamique. Dans notre projet, beaucoup de composant  par exemple, un espace, ou encore le composant de listes des membres etc.. **Create-react-app intègre par défaut bundler et task runner** et répond également à toutes les contraintes de transpilation de code. Il offre aussi la possibilité manière simplifiée, de faire de notre application une **PWA** ce qui améliore les performances de celle-ci par la mise en cache de contenus et accentue la sensation d'application mobile recherchée (par exemple, l'installation de l'application web sur son device). 
Nous avons utiliser le préprocessor **SASS**, pour moduler notre style et d'avoir un css plus lisible. Il a été le choix naturel, la prise en main nous était plus familière.

Si **client side-rendering** n’est pas le meilleur choix en terme de performance (et de référencement mais c’est un moindre problème pour nous) cependant le meilleur rapport entre temps, ressources nécessaires au développement de votre site, et impact sur l’expérience de nos utilisateurs, il était le plus judicieux.

### **Librairies** 🔧
- axios : faciliter la rédaction syntaxique et le paramètrage des requêtes pour communiquer avec notre API 
- moment : dans notre cas, il nous a permis de facilement formater les dates de naissance et de décès 
- react-router-dom : le router 
- [react-awesome-slider](https://github.com/rcaferati/react-awesome-slider) : faciliter le développement d'un slider pour la visualisation des photos souvenirs 
- esLint + Prettier : Conventions et normes de code afin de garder un code propre et commun à tous les développeurs du projet

## **Installation**

```console
npm install
```
Créer un ficher .env suivant

```
REACT_APP_API_BASE_URL=https://memory-school-api.herokuapp.com/
```
Lancer le projet
```console
npm run start
```
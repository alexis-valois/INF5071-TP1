# INF5071-TP1

## Informations à propos du jeu
- Le jeu est réalisé à l'aide du moteur Phaser. Il est démarable via un serveur web léger et exécutable via un navigateur internet (testé dans Google Chrome uniquement)
- Il s'agit d'un jeu de plateforme
- Le personnage principale est un tigre nommé Rej

## Structure des répertoires

- blender-ressources : contient les fichiers .blend qui ont servit à produire certaines ressources graphiques pour le jeu
- tiled-ressources : contient le fichier .tmx qui a servit à produire le niveau du jeu (1 seul niveau produit)
- http-server : contient l'ensemble des fichiers qui constituent la portion serveur web léger
- http-server/public : contient l'ensemble des fichiers qui constituent le jeu en tant que tel (scripts Javascript, ressources graphiques exportées depuis blender et Tiled, configurations). Ces fichiers sont retournés directement au naviguateur de l'utilisateur

## Technologies utilisé

Pour pouvoir lancer le jeu, il doit être hébergé sur un serveur web. Les technologies Node.JS ainsi que http-server sont utilisée pour créer un serveur web léger en ligne de commande. L'outils Bower est utilisé pour faire la gestion des dépendances Javascript côté client. 

## Comment lancer le jeu

Il y a quelques étapes à réaliser pour pouvoir lancer le jeu : 
1. Installer Node.JS (développé avec la version 6.7) : [Télécharger Node.JS](https://nodejs.org/en/)
2. À l'aide de l'utilitaire npm qui vient avec Node.JS, installer l'outil bower : ``` npm install -g bower ```
(si des problèmes surviennent à cet étape, relancer la commande en mode "sodo")
3. Installer les dépendances pour le serveur web léger : Se rendre dans le répertoire "http-server" et tapper : ``` npm install ``` 
(si des problèmes surviennent à cet étape, relancer la commande en mode "sodo")
4. Installer les dépendances Javascript côté client : se rendre dans le répertoire "http-server/public" et tapper : ``` bower install ```
5. Remonter dans le répertoire "http-server" et lancer le serveur web en tappant : ``` npm start ```
6. Le jeu sera alors accessible via un naviguateur internet (préférablement Google Chrome) à l'url : [http://localhost:8080](http://localhost:8080)

## Comment jouer
- S'assurer que la fenêtre du navigateur a le focus (sinon la boucle de jeu est "gelé")
- Utiliser les flèches de direction pour faire avancer ou reculer Rej
- utiliser "SPACEBAR" pour effectuer un saut
- Attraper des cafés pour accélérer la vélocité de déplacements latérales de Rej
- Ne pas tomber dans les trous, sinon vous recommencez au début du niveau

# core

# Members
- Auriane LABILLLE
- Jérémie DELÉCRIN
- Arthur GEAY

# Introduction
Ce projet scolaire a pour but de créert un mini framework Javascript implémentant une architecture de type modulaire PIPE/FILTER.
Ce Framework permet de créer des filters (modules JavaScript) dans un répertoire « /filters ».

# Getting started
## Fonctions de bases
Le filter prend en paramètre un champ « input » de type Array contenant :
- Le resultat de l’execution du filter précédent
- Des paramètres additionnels

Le fichier config-filters.json à la racine du projet contient la configuration de l'exécution des filters.

Le framework au démarrage de l’application :
- vérifie que la signature de chaque filter placé dans le dossier /filters est valide (que le module retourne bien une fonction)
- affiche dans la console la liste des filters présents dans le dossier /filters
- lit le fichier config-filters.json et vérifie qu’il est valide :
    - il doit contenir à sa racine un attribut «steps » de type Array contenant des steps
    - chaque step doit avoir un identifiant (clef de l’objet)
    - chaque step doit avoir un attribut « filter » correspondant au fichier filter à exécuter
    - une step peut avoir un attribut « params » de type Array contenant une liste de paramètres qui seront passés à la step lors de son exécution en plus des paramètres reçus de la step précédente
    - une step peut avoir un attribut « next » qui doit correspondre à l’identifiant d’une autre step dans le fichier
- exécute les filters dans l’ordre défini dans le fichier de configuration par le développeur
- affiche dans la console l’ordre d'exécution des filters (exempel : “Exécution du filter filter_1.js”)

## Cas d’usage du framework :
- filters/read.js : ce filter prend en entrée un chemin d’un fichier et retourne son contenu
- filters/capitalize.js : ce filter prend du texte en entrée et la passe en majuscule
- filters/reverse.js : ce filter prend du texte en entrée et le retourne inversé (uniquement les mots, pas les lettres)
- filters/write.js : ce filter prend du texte et un chemin en entrée et écrit le contenu dans un fichier

# API
L’arborescence des fichiers du framework est la suivante :
- /
    - app.js : point d’entrée de l’application (l’application sera lancée via ce fichier)
    - config-filters.json : fichier de configuration
    - /filters : répertoire contenant les filters implémentés par le développeur
        - filter_1.js
        - filter_2.js
        - filter_3.j
        - ...

# Errors
| Code erreur | Description                           |
| :---------- | :----------                           |
| 403         | Fichier de configuration invalide     |
| 403         | Le filter ne retourne pas de fonction |
| 403         | Exécution de la step a échoué         |

# Tools
Ce projet est packagé dans un module nodeJS NPM. Cet outil doit être installé avec la commande : `npm install ppft -g`

| Commande          | Action                                         | Description                                                                                 |
| :---------------- | :--------------------------------------------- | :------------------------------------------------------------------------------------------ |
| `ppft new`        | Nouveau projet                                 | Créé l'arborescence projet avec un fichier de configuration vierge et un template de filter |
| `ppft add_filter` | Ajouter un filter                              | Créé un nouveau filter dans un projet existant                                              |
| `ppft del_filter` | Supprimer un filter                            | Possible seulement si le filter n'est pas utilisé dans le fichier de configuration          |
| `ppft add_step`   | Ajouter une step au fichier de configuration   | Prend les paramètres suivants : id de step, nom de filter, id step suivante (si nécessaire) |
| `ppft del_step`   | Supprimer une step du fichier de configuration | Prend les paramètres suivants : id de step                                                  |

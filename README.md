# core

# Members
- Auriane LABILLLE
- Jérémie DELÉCRIN
- Arthur GEAY

# Introduction
Ce projet scolaire a pour but de créert un mini framework Javascript implémentant une architecture de type modulaire PIPE/FILTER.
Ce Framework permet de créer des filters (modules JavaScript) dans un répertoire « /filters ».

L’arborescence des fichiers du framework est la suivante :
- /
    - app.js : point d’entrée de l’application (l’application sera lancée via ce fichier)
    - config-filters.json : fichier de configuration
    - /filters : répertoire contenant les filters implémentés par le développeur
        - filter_1.js
        - filter_2.js
        - filter_3.j
        - ...

# Getting started
Ce projet est packagé dans un module nodeJS NPM. Cet outil doit être installé avec la commande : `npm install ppft-cli -g`.

Afin de créer un projet avec une configuration vierge, exécuter la commande suivante : `ppft new`.

Afin de lancer le framework, exécuter la commande suivante : `npm start`.

## Basic functions
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

## Use case of the framework
- filters/read.js : ce filter prend en entrée un chemin d’un fichier et retourne son contenu
- filters/capitalize.js : ce filter prend du texte en entrée et la passe en majuscule
- filters/reverse.js : ce filter prend du texte en entrée et le retourne inversé (uniquement les mots, pas les lettres)
- filters/write.js : ce filter prend du texte et un chemin en entrée et écrit le contenu dans un fichier

# API

## Filters configuration
Le fichier config-filters.json à la racine du projet contient la configuration de l'exécution des filters au format suivant : 
```JSON
{
"steps" : {
    "1": {
        "filter": "<filter_1>",
        "params" : ['<extra_param_1>' , '<extra_param_2>' , ...],
        "next": "2"
    },
        "2": {
        "filter": "<filter_2>",
        "params" : ['<extra_param_1>' , '<extra_param_2>' , ...],
        "next": "3"
    },
    ...
```

## Filters
Le filter prend en paramètre un champ « input » de type Array contenant :
- Le resultat de l’execution du filter précédent
- Des paramètres additionnels

## Steps
Une step contient :
- un `ID`
- le nom du `filter` à exécuter
- un ou plusieurs `params`
- possiblement `next`, l'ID de la step du prochain filtre à exécuter

# Errors
| Erreur                                       | Description                                                  |
| :------------------------------------------- | :----------------------------------------------------------- |
| Directory not found.                         | Dossier du filtre introuvable                                |
| No filters modules found.                    | Filtre non trouvé                                            |
| Is not a filter module.                      | Filtre invalide                                              |
| Configuration file not found                 | Fichier de configuration non trouvé                          |
| The steps key is not found                   | Clé de l'étape non trouvée                                   |
| The filter key not found on step             | Clé du filtre non trouvée                                    |
| The params key is not an array for the step  | La clé du params n'est pas un tableau                        |
| Step with id not found.                      | Étape non trouvée                                            |
| Configuration file is not a valid json file. | Le fichier de configuration n'est pas un fichier JSON valide |
| Step failed                                  | Échec de l'exécution de l'étape                              |
| The steps key is empty                       | Clé d'étape non définie ou vide                              |
| The filter could not be added                | Le filtre n'a pas pu être ajouté                             |
| The filter could not be deleted              | Le filtre n'a pas pu être supprimé                           |
| The step could not be added                  | L'étape n'a pas pu être ajoutée                              |
| The step could not be deleted                | L'étape n'a pas pu être supprimée                            |
| The project could not be installed           | Le projet n'a pas pu être installé                           |
| The directory already exist                  | Nom de dossier déjà utilisé                                  |

# Tools
| Commande          | Action                                         | Description                                                                                 |
| :---------------- | :--------------------------------------------- | :------------------------------------------------------------------------------------------ |
| `ppft add_filter` | Ajouter un filter                              | Créé un nouveau filter dans un projet existant                                              |
| `ppft del_filter` | Supprimer un filter                            | Possible seulement si le filter n'est pas utilisé dans le fichier de configuration          |
| `ppft add_step`   | Ajouter une step au fichier de configuration   | Prend les paramètres suivants : id de step, nom de filter, id step suivante (si nécessaire) |
| `ppft del_step`   | Supprimer une step du fichier de configuration | Prend les paramètres suivants : id de step                                                  |

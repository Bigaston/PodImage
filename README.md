# PodImage
Un mini outil qui permet de générer une image à intégrer dynamiquement dans vos mails. Cette image montrera le dernier épisode publié dans le flux.

Le site est accessible sur [podimage.bigaston.me](https://podimage.bigaston.me). Dessous vous retrouvez ces explications, et un générateur pour avoir directement les liens à copier coller.

## Utilisation
Vous pouvez directement récupérer le lien vers votre image en ajoutant `https://podimage.bigaston.me/get/` devant l'adresse de votre flux RSS. Vous serez automatiquement redirigé vers votre image.  
Vous récupèrerez une URL de la forme `podimage.bigaston.me/v1/i/[VOTRE ADRESSE EN BASE64]`.  
Vous pouvez aussi utiliser une autre route prévue `podimage.bigaston.me/v1/r/[VOTRE ADRESSE EN BASE64]` pour rediriger automatiquement vers le dernier épisode de votre flux.  

## Example
Un exemple de ce qui est généré, avec mon Podcast Script
[![Script](https://podimage.bigaston.me/v1/i/aHR0cHM6Ly9zY3JpcHQubGVwb2RjYXN0LmZyL3Jzcw==)](https://podimage.bigaston.me/v1/r/aHR0cHM6Ly9zY3JpcHQubGVwb2RjYXN0LmZyL3Jzcw==)

## Infos
Codé par [@Bigaston](https://twitter.com/Bigaston).
Idée d'encoder les URL en base64 par [@PofMagicfingers](https://twitter.com/PofMagicfingers).

🖥️ Le site web est hébergé sur un serveur financé par [PodShows](https://twitter.com/PodShows).  
💸 Vous pouvez me soutenir gratuitement sur [ma page uTip](https://utip.io/bigaston).

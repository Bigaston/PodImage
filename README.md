# PodImage
Un outil qui génère une image dynamiquement avec votre dernier épisode de podcast

Mini outil qui permet de générer une image à intégrer dynamiquement dans vos mails. Cette image montrera le dernier épisode publié dans le flux.

## Utilisation
Il existe deux routes sur PodImage :
`https://podimage.bigaston.me/img?rss=VOTRE_FLUX_RSS` : La route qui génèrera l'image à proprement parler
`https://podimage.bigaston.me/red?rss=VOTRE_FLUX_RSS` : Cette route redirigera l'utilisateur vers le dernier épisode automatiquement

L'image générée fait 780px par 150px.

## Exemple
```HTML
<a href="https://podimage.bigaston.me/red?rss=VOTRE_FLUX_RSS" target="_blank"><img src="https://podimage.bigaston.me/img?rss=VOTRE_FLUX_RSS" alt="Dernier épisode de VOTRE PODCAST" /></a>
```
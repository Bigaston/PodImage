function generateInfo() {
    url = document.getElementById("feed_url").value
    fetch("./api/feed/" + url)
    .then(res => {
        if (res.ok) {
            return res.json();
        }
    })
    .then(data => {
        document.getElementById("present").textContent= `Nom du podcast: ${data.title}
Lien vers l'image: ${data.img}
Lien pour redirection: ${data.redirect}
HTML: <a href="${data.redirect}" target="_blank"><img src="${data.img}" alt="${data.title}"></img></a>
Markdown: [![${data.title}](${data.img})](${data.redirect})`
    })
}
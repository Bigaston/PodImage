const express = require("express");
const Parser = require("rss-parser");
const puppeteer = require("puppeteer");
const mustache = require("mustache")
const fs = require("fs")
const path = require("path")

require('dotenv').config()

var parser = new Parser();

var app = express()

app.get("/", (req, res) => {
    res.redirect("https://github.com/Bigaston/PodImage")
})

app.get("/img", (req, res) => {
    parser.parseURL(req.query.rss, (err, feed) => {
        if(feed.items[0].itunes.image == undefined) {
            img = feed.itunes.image ? feed.itunes.image : feed.image.url
        } else {
            img = feed.items[0].itunes.image
        }

        var renderObj = {
            image_url: img,
            ep_title: feed.items[0].title,
            pod_title: feed.title
        }

        template = fs.readFileSync(path.join(__dirname, "/template.mustache"), "utf8")
        string = mustache.render(template, renderObj);
        (async () => {
            const browser = await puppeteer.launch({
              defaultViewport: {
                width: 850,
                height: 220
              },
              headless: true,
              args: ['--no-sandbox']
            });
            const page = await browser.newPage();
            await page.setContent(string);
            page.screenshot({omitBackground: true}).then((img) => {
                browser.close().then(() => {
                    res.end(img)
                });
            })
        })();
    })
})

app.get("/red", (req, res) => {
    parser.parseURL(req.query.rss, (err, feed) => {
        res.redirect(feed.items[0].link)
    })
})

app.use((err, req, res, next) => {
    res.status(500).send("Erreur...")
})

//Ouverture du serveur Web sur le port définit dans les variables d'environnement
app.listen(process.env.PORT, () => console.log(`Serveur lancé sur le port ${process.env.PORT}`))
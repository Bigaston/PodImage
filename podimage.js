const express = require("express");
const Parser = require("rss-parser");
const puppeteer = require("puppeteer");
const mustache = require("mustache")
const fs = require("fs")
const path = require("path")

require('dotenv').config()

var parser = new Parser();

var app = express()

app.use("/static", express.static('./web/static'));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/web/index.html"))
})

app.get("/get/*", (req, res) => {
    b64 = new Buffer.from(req.path.replace("/get/", "")).toString('base64')
    res.redirect(`/v1/i/${b64}.png`)
});

app.get("/v1/i/:feed", (req, res) => {
    var feed_url = Buffer.from(req.params.feed, 'base64').toString('utf8');

    parser.parseURL(feed_url, (err, feed) => {
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

        template = fs.readFileSync(path.join(__dirname, "/web/template.mustache"), "utf8")
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
                    res.setHeader("content-type", "image/png");
                    res.end(img)
                });
            })
        })();
    })
})

app.get("/v1/r/:feed", (req, res) => {
    var feed_url = Buffer.from(req.params.feed, 'base64').toString('utf8');

    parser.parseURL(feed_url, (err, feed) => {
        res.redirect(feed.items[0].link)
    })
})

app.get("/api/feed/*", (req, res) => {
    var feed_url = req.path.replace("/api/feed/", "")

    parser.parseURL(feed_url, (err, feed) => {
        b64 = new Buffer.from(req.path.replace("/get/", "")).toString('base64')
        resObj = {
            img: process.env.HOST + "/v1/i/" + b64 + ".png",
            redirect: process.env.HOST + "/v1/r/" + b64,
            title: feed.title
        }

        console.log(resObj)
    
        res.header("Access-Control-Allow-Origin", process.env.HOST);
        res.header("Access-Control-Allow-Methods", "GET");
        res.header("Access-Control-Allow-Headers", req.header('access-control-request-headers'));
        res.status(200).json(resObj);
    })
})

app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).send("Erreur...")
})

//Ouverture du serveur Web sur le port définit dans les variables d'environnement
app.listen(process.env.PORT, () => console.log(`Serveur lancé sur le port ${process.env.PORT}`))
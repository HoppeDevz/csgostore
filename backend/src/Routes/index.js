const routes = require("express").Router();
const axios = require("axios");
const db = require('../Database');
const puppeteer = require("puppeteer");
const { response } = require("express");


// https://steamcommunity.com/id/**SteamId**/inventory/
function GetPreviewLink(SteamId, ItemHash) {
    return new Promise(async (resolve, reject) => {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(`https://steamcommunity.com/profiles/${SteamId}/inventory/`);
        const baselink = `https://community.cloudflare.steamstatic.com/economy/image/${ItemHash}/96fx96f`;
        const baselink2 = `https://steamcommunity-a.akamaihd.net/economy/image/${ItemHash}/96fx96f`;


        setTimeout(async () => {
            const ItemImg = await page.$$(`img[src='${baselink}']`);
            const ItemImg2 = await page.$$(`img[src='${baselink2}']`);

            console.log(baselink2, ItemImg2);
            //console.log(baselink, ItemImg);

            await page.click(`img[src='${baselink2}']`);
            setTimeout(async () => {
                const link = await page.$$('#iteminfo0_item_actions a');
                if (link) {
                    link[0].getProperty('href').then(response => {
                        console.log(response._remoteObject.value);
                        resolve(response._remoteObject.value);
                    })
                }
                console.log(link);
            }, 2000)
            console.log("clicked");
        }, 4000)

    })
}

//(async () => {
//GetPreviewLink("76561199003816734", "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV09G3h5SOhe7LO77QgHIf7pJ0iLGS94_2jAOx_BdvZGr2I9eVegVvNV3Q_gW8lbrsgZC875TPnWwj5HcWwWbOUQ").then(response => {
//console.log("[RESOLVED!!!]", response)
//})
//})();

routes.get("/AdminLogin", (req, res) => {
    const { username, password } = req.headers;
    console.log(username, password);
    db.query(`SELECT * FROM admin_accounts WHERE username = '${username}'`,
        (error, results, fields) => {
            if (results == undefined) {
                return res.status(404).send({
                    login: false, reason: "Invalid username/password"
                });
            }
            if (results[0] !== undefined) {
                if (results[0].password == password) {
                    return res.status(200).send({
                        login: true
                    });
                } else {
                    return res.status(404).send({
                        login: false, reason: "Invalid username/password"
                    });
                }
            } else {
                return res.status(404).send({
                    login: false, reason: "Invalid username/password"
                });
            }
        });
});

routes.get("/GetItemList", (req, res) => {
    db.query("SELECT * FROM items", (error, results, fields) => {
        return res.status(200).send({ items: results });
    });
});

routes.post("/SearchInventory", (req, res) => {
    const { steamid } = req.body;
    axios.default.get(`http://steamcommunity.com/inventory/${steamid}/730/2?l=brazilian&count=5000`).then(response => {
        console.log(response.data.descriptions);
        return res.status(200).send({
            inventory: response.data.descriptions
        })
    });
});

routes.post("/AddItemInDb", (req, res) => {
    const { item_hash, item_name, image_url, preview, price, steamId } = req.body;
    db.query(`SELECT * FROM items WHERE item_hash = '${item_hash}'`,
        (error, results, fields) => {
            if (results[0]) {
                return res.status(401).send({
                    created: false, reason: "Item Already Registered"
                });
            }

            GetPreviewLink(steamId, item_hash).then(response => {
                const previewUrl = response;
                console.log("[RESOLVED!!!]", response)

                db.query(`INSERT INTO items (item_hash, item_name, image_url, preview, price) VALUES (
                '${item_hash}',
                '${item_name}',
                '${image_url}',
                '${previewUrl}',
                 ${price}
                )`);

                return res.status(200).send({
                    created: true
                })
            });
        });
});

routes.get("/GetStoreList", (req, res) => {
    db.query("SELECT * FROM items", (error, results, fields) => {
        return res.status(200).send({
            list: results
        })
    });
});

routes.post("/DelItemByImageUrl", (req, res) => {
    const { image_url } = req.body;
    db.query(`DELETE FROM items WHERE image_url = '${image_url}'`);
    return res.status(200).send({
        deleted: true
    });
});

routes.post("/UpdateViewCounter", (req, res) => {
    const { item_hash } = req.body;
    db.query(`SELECT * FROM items WHERE item_hash = '${item_hash}'`, (error, results, fields) => {
        if (results[0]) {
            const old_val = results[0].view_counter;
            const new_val = Number(old_val) + 1;
            db.query(`UPDATE items SET view_counter = ${new_val} WHERE  item_hash = '${item_hash}'`);
            return res.status(200).send({
                updated: true
            })
        }
    })
})

module.exports = routes;
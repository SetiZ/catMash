const express = require('express');
const router = express.Router();

const fetch = require('node-fetch');
// import { insert, select, update, remove, file } from "easy-db-node";
const easyDb = require("easy-db-node");

async function getCats() {
    const catCollection = await easyDb.select("cats");
    // console.log(catCollection)
    return catCollection;
}

async function getRandomCat() {
    const cats = await easyDb.select("cats");
    const catIds = Object.keys(cats);
    const randomId = catIds[Math.floor(Math.random() * catIds.length)];
    const randomCat = await easyDb.select("cats", randomId);
    return randomCat;
}

router.get('/', function (req, res) {
    getCats().then(cats => {
        res.status(200).json(cats);
    })
});

router.get('/random', function (req, res) {
    getRandomCat().then(cat => {
        res.status(200).json(cat);
    }).catch(err => {
        console.err(err);
        res.sendStatus(404);
    })
});

// UPDATE
// this api end-point update an existing item object
// for that we get `id` and `title` from api end-point of item to update
router.put('/:id', function (req, res) {
    // get item object match by `id`
    let found = data.find(function (item) {
        return item.id === parseInt(req.params.id);
    });

    // check if item found
    if (found) {
        let updated = {
            id: found.id,
            title: req.body.title, // set value of `title` get from req
            order: req.body.order, // set value of `order` get from req
            completed: req.body.completed // set value of `completed` get from req
        };

        // find index of found object from array of data
        let targetIndex = data.indexOf(found);

        // replace object from data list with `updated` object
        data.splice(targetIndex, 1, updated);

        // return with status 204
        // success status response code 204 indicates
        // that the request has succeeded
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
});

module.exports = router;
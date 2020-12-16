const express = require('express');
const router = express.Router();

const fetch = require('node-fetch');
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

async function updateCat(id) {
    const cat = await easyDb.select("cats", id);
    await easyDb.update("cats", id, { ...cat, score: cat.score + 1 });
}

async function getAllScore() {
    const catCollection = await easyDb.select("cats");
    Object.values(catCollection).forEach(element => {
        console.log(element.score)
    });
    const count = Object.values(catCollection).reduce((a, b) => a + b.score, 0)
    console.log(count)
    return count;
}

// GET ALL
router.get('/', function (req, res) {
    getCats().then(cats => {
        res.status(200).json(cats);
    }).catch(err => {
        console.error(err);
        res.sendStatus(404);
    })
});

// RANDOM
router.get('/random', function (req, res) {
    getRandomCat().then(cat => {
        res.status(200).json(cat);
    }).catch(err => {
        console.error(err);
        res.sendStatus(404);
    })
});

// UPDATE
router.put('/:id', function (req, res) {
    updateCat(req.params.id).then(cat => {
        // console.log(cat)
        res.status(204).json(cat);
    }).catch(err => {
        console.error(err);
        res.sendStatus(404);
    })
});


router.get('/count', function(req, res) {
    getAllScore().then(cat => {
        // console.log(cat)
        res.status(200).json(cat)
    }).catch(err => {
        console.error(err);
        res.sendStatus(404);
    })
})
module.exports = router;
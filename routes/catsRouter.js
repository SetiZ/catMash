const express = require('express');
const router = express.Router();

const catsDb = require('./catsDatabase');

// GET ALL
router.get('/', function (req, res) {
  catsDb.getCats().then(cats => {
    res.status(200).json(cats);
  }).catch(err => {
    console.error(err);
    res.sendStatus(404);
  })
});

// GET RANDOM
router.get('/random', function (req, res) {
  catsDb.getRandomCats().then(cat => {
    res.status(200).json(cat);
  }).catch(err => {
    console.error(err);
    res.sendStatus(404);
  })
});

// UPDATE DB
router.put('/:id', function (req, res) {
  catsDb.updateCat(req.params.id).then(cat => {
    // console.log(cat)
    res.status(204).json(cat);
  }).catch(err => {
    console.error(err);
    res.sendStatus(404);
  })
});

// GET COUNT
router.get('/count', function(req, res) {
  catsDb.getAllScore().then(cat => {
    // console.log(cat)
    res.status(200).json(cat)
  }).catch(err => {
    console.error(err);
    res.sendStatus(404);
  })
})

module.exports = router;
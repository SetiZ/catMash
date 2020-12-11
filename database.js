const fetch = require('node-fetch');
const easyDb = require("easy-db-node");

let cats = []

const fetchCats = () => {
  return fetch('https://latelier.co/data/cats.json')
  .then(response => response.json())
  .then(data => {
    cats = data.images
  })
  .catch(err => {
    console.log(error)
  })
}

const saveCats = () => {
  fetchCats().then((data) => {
    cats.forEach( async (cat) => {
      await easyDb.insert("cats", id => ({id: cat.id, url: cat.url, score: 0}));
    })
  })
}

saveCats()
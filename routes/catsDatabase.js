const easyDb = require("easy-db-node");

// get all cats
const getCats = async () => {
  const catCollection = await easyDb.select("cats");
  // console.log(catCollection)
  return catCollection;
}

// get a random cat - depreciated
const getRandomCat = async () => {
  const cats = await easyDb.select("cats");
  const catIds = Object.keys(cats);
  const randomId = catIds[Math.floor(Math.random() * catIds.length)];
  const randomCat = await easyDb.select("cats", randomId);
  return randomCat;
}

// get two random cat
const getRandomCats = async () => {
  const cats = await easyDb.select("cats");
  const catIds = Object.keys(cats);
  const randomIds = catIds.slice(0, 2).map(() => {
    return catIds.splice(Math.floor(Math.random() * catIds.length), 1)[0];
  }, catIds.slice());
  const randomCats = [];
  await Promise.all(randomIds.map(async (randomId) => {
    const randomCat = await easyDb.select("cats", randomId);
    randomCats.push(randomCat)
  }))
  // console.log(randomCats)
  return randomCats;
}

// update cat's score
const updateCat = async (id) => {
  const cat = await easyDb.select("cats", id);
  await easyDb.update("cats", id, { ...cat, score: cat.score + 1 });
}

// get sum of all scores
const getAllScore = async () => {
  const catCollection = await easyDb.select("cats");
  const count = Object.values(catCollection).reduce((a, b) => a + b.score, 0)
  return count;
}

module.exports = {
  getCats,
  getRandomCat,
  getRandomCats,
  updateCat,
  getAllScore,
}
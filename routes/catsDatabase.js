const easyDb = require("easy-db-node");

const getCats = async () => {
  const catCollection = await easyDb.select("cats");
  // console.log(catCollection)
  return catCollection;
}

const getRandomCat = async () => {
  const cats = await easyDb.select("cats");
  const catIds = Object.keys(cats);
  const randomId = catIds[Math.floor(Math.random() * catIds.length)];
  const randomCat = await easyDb.select("cats", randomId);
  return randomCat;
}

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

const updateCat = async (id) => {
  const cat = await easyDb.select("cats", id);
  await easyDb.update("cats", id, { ...cat, score: cat.score + 1 });
}

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
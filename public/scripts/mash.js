const url = `${window.location.origin}/cats`;

// get cats from server
const getCat = () => {
  return fetch(`${url}/random`, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  })
  .then(res => res.json())
  .then((data) => {
    console.log(data)
    return data;
  }).catch((e) => {
    throw new Error(e)
  })
}

// get score from server
const getScores = () => {
  fetch(`${url}/count`, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  }).then(res => res.json())
  .then((data) => {
    const score = document.querySelector(".cat_score")
    score.innerHTML = `${data} votes`
  }).catch((e) => {
    throw new Error(e)
  })
}

// update score to server
const vote = (id) => {
  fetch(`${url}/${id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'}
  }).then((res) => {
    // console.log(res)
    if (res.status === 204) {
      sections.innerHTML = "";
      getTwoRandomCats();
      getScores();
    }
  }).catch((e) => {
    throw new Error(e)
  })
}

const getTwoRandomCats = () => {
  getCat().then(cat => {
    appendCat(cat[0]);
    appendCat(cat[1]);
  })
}

const sections = document.querySelector(".mash_container")
const appendCat = (cat) => {
  let compare = document.createElement('section')
  compare.className = "mash_compare"
  compare.innerHTML = `<img src=${cat.url} loading="lazy" />`
  compare.addEventListener('click', () => {vote(cat.id)}, false)
  sections.appendChild(compare)
}

window.onload = () => {
  getTwoRandomCats();
  getScores();
};
const url = 'http://localhost:3000/cats';

const getCat = () => {
  return fetch(`${url}/random`, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  })
  .then(res => res.json())
  .then((data) => {
    return data;
  }).catch((e) => {
    throw new Error(e)
  })
}

const getTwoCats = () => {
  let cat1, cat2;
  getCat().then(cat => {
    cat1 = cat;
    console.log("cat1", cat1);
    appendCat(cat1);
  }).then(() => {
    getCat().then(cat => {
      cat2 = cat
      console.log("cat2", cat2);
      if (cat1.id === cat2.id) {
        // console.log('same')
        alert('same')
        getCat().then(cat => {
          cat2 = cat
        })
      }
      appendCat(cat2);
    })
  })
  // console.log(cat1);
}

const sections = document.querySelector(".mash_container")
const appendCat = (cat) => {
  let compare = document.createElement('section')
  compare.className = "mash_compare"
  compare.innerHTML = `<img src=${cat.url} loading="lazy" />`
  compare.addEventListener('click', () => {vote(cat.id)}, false)
  sections.appendChild(compare)
}

const vote = (id) => {
  fetch(`${url}/${id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'}
  }).then((res) => {
    console.log(res)
    if (res.status === 204) {
      sections.innerHTML = "";
      getTwoCats();
    }
  }).catch((e) => {
    throw new Error(e)
  })
}

window.onload = getTwoCats();
const url = `${window.location.origin}/cats`;

const clowderContainer = document.querySelector('.clowder');
// show loader while fetch
const loader = '<div class="lds-ripple"><div></div><div></div></div>';
clowderContainer.innerHTML = loader

fetch(url, {
  method: 'GET',
  headers: {'Content-Type': 'application/json'}
}).then(res => res.json()).then((data) => {
  let list = '<ul>';
  Object.values(data).forEach(cat => {
    // console.log(cat)
    list +=
    `<li id="cat_${cat.id}" data-score="${cat.score}">
      <img class="cat_img" src="${cat.url}" loading="lazy" />
      <div class="cat_score">${cat.score}</div>
    </li>`;
  });
  list += '</ul>';
  clowderContainer.innerHTML = list
}).catch((e) => {
  throw new Error(e)
})

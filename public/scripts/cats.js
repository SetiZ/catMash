const url = `${window.location.origin}/cats`;
const myRequest = new Request(url);

const clowderContainer = document.querySelector('.clowder');
const loader = '<div class="lds-ripple"><div></div><div></div></div>';
clowderContainer.innerHTML = loader
fetch(myRequest)
.then(res => res.json())
.then((data) => {
  // console.log(Object.values(data))
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

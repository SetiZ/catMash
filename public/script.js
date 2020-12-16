const url = 'http://localhost:3000/cats';
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
    list += `<li id="cat_${cat.id}" data-score="${cat.score}"><img class="catImg" src="${cat.url}" loading="lazy" /></li>`
  });
  list += '</ul>';
  clowderContainer.innerHTML = list
}).catch((e) => {
  throw new Error(e)
})


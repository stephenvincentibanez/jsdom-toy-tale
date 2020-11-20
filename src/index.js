let addToy = false;
const url = 'http://localhost:3000/toys'
document.addEventListener("DOMContentLoaded", () => {
  getToys() 
  const createNewToy = document.querySelector("form.add-toy-form")
  createNewToy.addEventListener("submit", addNewToy)

  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

function getToys(){
  fetch(url)
  .then(response => response.json())
  .then(allToys => iterateToys(allToys))
}

function iterateToys(allToys){
  for (toy of allToys){
    makeToyCard(toy)
  }
  console.log(allToys)
}

function makeToyCard(toy){
  const collectionDiv = document.getElementById("toy-collection")
  const parentDiv = document.createElement('div')
  parentDiv.setAttribute('class', 'card')
  toyDiv =
  `<h2>${toy.name}</h2>
  <img src=${toy.image} class="toy-avatar" />
  <p> ${toy.likes} </p>
  <button class="like-btn">Like <3</button>`
  
  parentDiv.innerHTML = toyDiv
  parentDiv.setAttribute('data-id', toy.id)
  collectionDiv.appendChild(parentDiv)
  const button = parentDiv.querySelector("button.like-btn")
  button.addEventListener("click", addLike)

  // const toyDiv = document.createElement('div')
  // const h2 = document.createElement('h2')
  // const img = document.createElement('img')
  // const p = document.createElement('p')

  // h2.innerText = toy.name
  // img.setAttribute('src', toy.image)
  // img.setAttribute('class', 'toy-avatar')
  // // img.class=('toy-avatar')
  // p.innerText = toy.likes
  // button.innerText = 'Like <3'
  // button.setAttribute('class', 'like-btn')
  // toyDiv.setAttribute('class', 'card')
  
  // toyDiv.append(h2, img, p, button)
}


function addNewToy(e){
  let configObj = {
    method: "POST",
    headers: {
      "Content-type":"application/json",
      "Accept":"application/json"
    },
    body: JSON.stringify(
      {
        name: e.target.name.value,
        image: e.target.image.value,
        likes: 0
      }
    )
  }

  fetch(url, configObj)
  .then(response => response.json())
  .then(object => makeToyCard(object))
}

function addLike(e){
  const id = e.target.parentNode.dataset.id
  const likeCount = e.target.previousElementSibling
  // debugger
  // console.log(id)
  let configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": + likeCount.innerText+1
  })
}
  fetch(url + `/${id}`, configObj)

  +likeCount.innerText++
}
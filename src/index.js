let addToy = false;

document.addEventListener("DOMContentLoaded", () => {

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

  fetchToys()
  const toyForm = document.getElementById('toy-form')
  toyForm.addEventListener('submit', (event) => createNewToy(event, toyForm))

});

const baseUrl = 'http://localhost:3000/'
const toysUrl = baseUrl + 'toys/'

function createNewToy(event, toyForm) {
  event.preventDefault()

  let postRequest = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accepts': 'application/json'
    },
    body: JSON.stringify({
     name: toyForm.name.value,
     image: toyForm.image.value,
     likes: 0
    })
  }

  fetch(toysUrl, postRequest)
  .then(res => res.json())
  .then(data => renderToy(data))
}

function clearElement(element) {
  while(element.firstChild)
  element.firstChild.remove()
}


function fetchToys() {
  fetch(toysUrl)
  .then(res => res.json())
  .then(toys => rendersToys(toys))
}

function rendersToys(toys) {
  toys.forEach(toy => renderToy(toy))
}

function renderToy(toy, div) {

  if(!div) {
    div = document.createElement('div')
    const toyCollectionDiv = document.getElementById('toy-collection')
    toyCollectionDiv.appendChild(div)
    div.classList += 'card'
  }

  const h2 = document.createElement('h2')
  h2.textContent = toy.name 
  div.appendChild(h2)

  const img = document.createElement('img')
  img.src = toy.image
  img.className = 'toy-avatar'
  div.appendChild(img)

  const p = document.createElement('p')
  p.textContent = `${toy.likes} Likes`
  div.appendChild(p)

  const button = document.createElement('button')
  button.className = 'like-btn'
  button.id = toy.id
  button.textContent = `Like ❤️`
  button.addEventListener('click', () => increaseLikes(toy, div))
  div.appendChild(button)
}

function increaseLikes(toy, div) {
  let patchRequest = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accepts': 'application/json'
    },
    body: JSON.stringify({
     likes: toy.likes +1
    })
  }

  fetch(toysUrl + toy.id, patchRequest)
  .then(res => res.json())
  .then(toyData => {
    clearElement(div)
    renderToy(toyData, div)
  })
}
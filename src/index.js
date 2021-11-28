// // Set up event listeners to respond to user events
//   // Use fetch() to make a "GET" request, then render the returned toys to the DOM

const divCollection = document.getElementById('toy-collection') //  identifying where all of the toys will be displayed in the html element 

document.addEventListener('DOMContentLoaded', getToys());

function getToys() {
    fetch("http://localhost:3000/toys")
      .then(r => r.json())
      .then(toys => { //  getting all of the toys
        toys.forEach(toy =>{ // seperating all of the toys to each toy
            displayToys(toy) //going to the function to display each toy
        })
  })
}

function displayToys(toy){
  const h2 = document.createElement('h2')
  h2.innerText = toy.name //  creating and assigning the h2 element that displays the toy name

  const img = document.createElement('img')
  img.setAttribute('src', toy.image)
  img.setAttribute('class', 'toy-avatar') //  creating and assigning the image of the toy

  const p = document.createElement('p') 
  p.innerText = `${toy.likes} likes` //  creating and assigning the info on the number of times that each toy has been liked

  const btn = document.createElement('button')
  btn.setAttribute('class', 'like=btn')
  btn.setAttribute('id', toy.id)
  btn.innerText = 'like' // creating and assigning the like button to up the number of likes for each toy
  btn.addEventListener('click', (likeBtnPush))
    //likesLogged(likeBtn)
  
  const btnDelete = document.createElement('button')
  btnDelete.setAttribute('class', 'delete=btn')
  btnDelete.setAttribute('id', toy.id)
  btnDelete.innerText = 'delete'
  btnDelete.addEventListener('click', () => {
    divCard.remove(toy.id)
    deleteBtnPush(toy.id)
  })

  let divCard = document.createElement('div')
  divCard.setAttribute('class', 'card')
  divCard.append(h2, img, p, btn, btnDelete) // creating and assigning the div card to hold all 4 of the atributes that I just created for each toy.
  divCollection.append(divCard) //  this is adding the divCards for each toy to the toy collection so that it can be displayed 
}

// Use fetch() to make a "POST" request to create a new toy, then add it to the DOM
const toyForm = document.querySelector('.container') // selecting and identify the location in the html where the form will go
const addToyBtn = document.getElementById('new-toy-btn') // selecting the button for adding a toy
let addToy = false

addToyBtn.addEventListener('click', addToyBtnPush) // listening for when the add button has been pushed and going to the addToyBtnPush function

function addToyBtnPush() {
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block' // this displays the 2 input boxes that are created in the HTML
    toyForm.addEventListener('submit', event => {
      event.preventDefault() // preventing page refresh on submission
      console.log('create toy')
      postToy(event.target) // going to function for posting the toy
  })
  } else {
    toyForm.style.display = 'none'
  }
}

function postToy(toyInfo) {
  fetch("http://localhost:3000/toys", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body:JSON.stringify({
      'name': toyInfo.name.value,
      'image': toyInfo.image.value,
      'likes': 0
    }) // adding the new toys information to the json repo
  })
  .then(res => res.json())
  .then((obj_toy) => {
    let new_toy = displayToys(obj_toy)
    divCollection.append(new_toy) // pulling the new toy from the repo and displaying it.
  })
  .catch(function (error) {
    alert('Something went wrong!')
    console.log(error.message);
    document.body.innerHTML = error.message
  })
}

//  Use fetch() to make a "PATCH" request that updates an existing toy, then render the updated information to the DOM

function likeBtnPush(oneLike) {
  console.log('liked toy')
  const newNumber = parseInt(oneLike.target.previousElementSibling.innerText) + 1 // this function is called when the like button is pushed for each toy

  fetch(`http://localhost:3000/toys/${oneLike.target.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body:JSON.stringify({
      'likes': newNumber
    })
  })
  .then(res => res.json())
  .then(() => {
    oneLike.target.previousElementSibling.innerText = `${newNumber} likes`
  })
  .catch(function (error) {
    alert('Something went wrong!')
    console.log(error.message);
    document.body.innerHTML = error.message
  })
}

//  Use fetch() to make a "DELETE" request that deletes a toy by it's ID
//============================================================


function deleteBtnPush (id) {
  fetch(`http://localhost:3000/toys/`+ id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(res => res.json())
  .then(data => console.log(data));

    
  // .catch(function (error) {
  //   alert('Something went wrong with Delete!')
  //   console.log(error.message);
  //   document.body.innerHTML = error.message
  // })
}
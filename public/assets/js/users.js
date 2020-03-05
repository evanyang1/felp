// pulls the axios cdn and localStorage off of the window object (not needed to do but a good practice)
const { axios, localStorage } = window

// declaring global variables for tracking the values of userid and username throughout all logic (grabbing their initial value from the value in local storage)
let uid = localStorage.getItem('uid')
let uname = localStorage.getItem('uname')
let uemail = localStorage.getItem('uemail')


// function to create a new user
const createUser = () => {
  // Ajax request hitting the POST route defined in our userRoutes.js
  axios.post('/api/users', {
    // grabbing the value of the username text input to pass in the request body
    username: document.getElementById('username').value,
    email: document.getElementById('useremail').value
  })
    // once finished, another ajax request is triggered to retrieve the user's information (necessary because we need the new user's userid)
    .then(() => axios.get(`/api/users/${document.getElementById('username').value} || ${document.getElementById('useremail').value}`))
    // destructuring the userid and username values off of the axios payload
    .then(({ data: [{ userid, username, useremail }] }) => {
      // assigning the retrieved value to our global variables for sharing the info between many functions, as well as passing the value into localStorage
      uid = userid
      uname = username
      useremail = useremail
      localStorage.setItem('uid', userid)
      localStorage.setItem('uname', username)
      localStorage.setItem('uemail', useremail)

      // little display message to signify to the user that they have signed in
      document.getElementById('message').textContent = `Hello ${username}! Welcome!`
      // disable all sign in and create user form items and enable the sign out button
      document.getElementById('username').setAttribute('disabled', true)
      document.getElementById('signIn').setAttribute('disabled', true)
      document.getElementById('createUser').setAttribute('disabled', true)
      document.getElementById('signOut').removeAttribute('disabled')
    })
    // handle your errors
    .catch(e => console.error(e))
}

// function to sign in to a user account
const signIn = (username) => {
  // AJAX reqest hitting the GET route written in our userRoutes.js (returns the user information along with all items found by the user)
  axios.get(`/api/users/${username || document.getElementById('username').value}`)
    // destructuring the list of items found off the payload
    .then(({ data: list }) => {
      // assigning the retrieved value to our global variables for sharing the info between many functions, as well as passing the value into localStorage
      uid = list[0].userid
      uname = list[0].username
      uemail = list[0].useremail
      localStorage.setItem('uid', list[0].userid)
      localStorage.setItem('uname', list[0].username)
      localStorage.setItem('uemail', list[0].useremail)

      // taking the list of items and passing it to the renderList function to be rendered
      renderList(list)

      // little display message to signify to the user that they have signed in
      document.getElementById('message').textContent = `Hello ${list[0].username}! Welcome!`
      // disable all sign in and create user form items and enable the sign out button
      document.getElementById('username').setAttribute('disabled', true)
      document.getElementById('signIn').setAttribute('disabled', true)
      document.getElementById('submit').setAttribute('disabled', true)
      document.getElementById('signOut').removeAttribute('disabled')
    })
    .catch(e => console.error(e))
}

// event listener for when the <li> is clicked with the intention of updating the current item and running the updateItem function, passing it the current element


document.addEventListener('click', event => event.target.classList.contains('items') ? updateItem(event.target) : null)

// event listener for when the red x badge is clicked with the intention of deleting the current item and runs the deleteItem function, passing it the current element
document.addEventListener('click', event => event.target.classList.contains('delete') ? deleteItem(event.target) : null)

// event listener for when the big red 'Sign Out' button is pressed with the intention of signing the user out
document.getElementById('signOut').addEventListener('click', event => {
  // Stop the form from refreshing the page
  event.preventDefault()

  // clear localStorage
  localStorage.clear()

  // little display message to signify to the user that they have not signed in
  document.getElementById('message').textContent = 'This is a simple to-do list app for tracking items you need to complete. Create an account or Sign in to get started!'
  // disable all sign in and create user form items and enable the sign out button
  document.getElementById('username').removeAttribute('disabled')
  document.getElementById('signIn').removeAttribute('disabled')
  document.getElementById('createUser').removeAttribute('disabled')
  document.getElementById('signOut').setAttribute('disabled', true)

  // clear out the list display
  document.getElementById('list').innerHTML = '<li class="list-group-item">No items to display. Not signed in yet.</li>'
})

// event listener for when the big blue 'Sign In' button is pressed with the intention of signing in to an existing user account
document.getElementById('signIn').addEventListener('click', event => {
  // Stop the form from refreshing the page
  event.preventDefault()
  // Runs the signIn function
  signIn()
})

// event listener for when the big green 'Create Account' button is pressed with the intention of creating a new user in the database
document.getElementById('createUser').addEventListener('click', event => {
  // Stop the form from refreshing the page
  event.preventDefault()
  // Runs the createUser function
  createUser()
})

// event listener for when the 'Add Item' button is clicked with the intention of creating a new item
document.getElementById('createItem').addEventListener('click', event => {
  // Stop the form from refreshing the page
  event.preventDefault()
  // Runs the createItem function
  createItem()
})

if (localStorage.getItem('uname')) {
  signIn(localStorage.getItem('uname'))
}

// pulls the axios cdn and localStorage off of the window object (not needed to do but a good practice)
const { axios, localStorage } = window

// declaring global variables for tracking the values of userid and username throughout all logic (grabbing their initial value from the value in local storage)
let uid = localStorage.getItem('uid')
let uname = localStorage.getItem('uname')
let uemail = localStorage.getItem('uemail')
// console.log(uname)


// function to create a new user
const createUser = () => {
  // Ajax request hitting the POST route defined in our userRoutes.js
  axios.post('api/users', {
    // grabbing the value of the username text input to pass in the request body
    username: document.getElementById('username').value,
    email: document.getElementById('useremail').value
  })
    // once finished, another ajax request is triggered to retrieve the user's information (necessary because we need the new user's userid)
    .then(() => axios.get(`/api/users/${document.getElementById('username').value}/${document.getElementById('useremail').value}`))
    // destructuring the userid and username values off of the axios payload
    .then(({ data: { id, username, email } }) => {
      console.log("info off data ------- " + id + username + email)
      // assigning the retrieved value to our global variables for sharing the info between many functions, as well as passing the value into localStorage
      localStorage.setItem('uid', id)
      localStorage.setItem('uname', username)
      localStorage.setItem('uemail', email)
      console.log(localStorage.getItem('uname'))

      // little display message to signify to the user that they have signed in
      document.getElementById('message').textContent = `Hello ${username}! Welcome!`
      // disable all sign in and create user form items and enable the sign out button
      document.getElementById('username').setAttribute('disabled', true)
      document.getElementById('useremail').setAttribute('disabled', true)
      document.getElementById('signIn').setAttribute('disabled', true)
      document.getElementById('createUser').setAttribute('disabled', true)

    })
    // handle your errors
    .catch(e => console.error(e))
}

// function to sign in to a user account
const signIn = (username, useremail) => {
  // AJAX reqest hitting the GET route written in our userRoutes.js (returns the user information along with all items found by the user)
  axios.get(`/api/users/${username || document.getElementById('username').value}/${useremail || document.getElementById('useremail').value}`)


    // destructuring the list of items found off the payload
    .then(({ data }) => {
      console.log(data)
      // assigning the retrieved value to our global variables for sharing the info between many functions, as well as passing the value into localStorage
      // uid = post[0].id
      // uname = post[0].username
      // uemail = post[0].email
      // localStorage.setItem('uid', post[0].id)
      // localStorage.setItem('uname', post[0].username)
      // localStorage.setItem('uemail', post[0].email)

      // taking the list of items and passing it to the renderList function to be rendered
      // renderList(list)

      // // little display message to signify to the user that they have signed in
      localStorage.setItem('uid', data.id)
      localStorage.setItem('uname', data.username)
      localStorage.setItem('uemail', data.email)
      console.log(localStorage.getItem('uname'))
      document.getElementById('message').textContent = `Hello ${data.uname}! Welcome!`
      // disable all sign in and create user form items and enable the sign out button
      document.getElementById('username').setAttribute('disabled', true)
      document.getElementById('signIn').setAttribute('disabled', true)
      document.getElementById('createUser').setAttribute('disabled', true)
    })
    .catch(e => console.error(e))
}

// event listener for when the big blue 'Sign In' button is pressed with the intention of signing in to an existing user account
document.getElementById('signIn').addEventListener('click', event => {
  // Stop the form from refreshing the page
  event.preventDefault()

  localStorage.setItem('restaurant', signIn)
  setTimeout(function () {
    window.location.href = '/restaurant.html';
  }, 1000);
  // window.location.href = '/restaurant.html'
  // Runs the signIn function
  signIn()
})

// event listener for when the big green 'Create Account' button is pressed with the intention of creating a new user in the database
document.getElementById('createUser').addEventListener('click', event => {
  console.log(createUser)
  // Stop the form from refreshing the page
  event.preventDefault()

  localStorage.setItem('restaurant', createUser)
  setTimeout(function () {
    window.location.href = '/restaurant.html';
  }, 1000);
  // Runs the createUser function
  createUser()
})


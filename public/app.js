
const getPosts = () => {
return fetch(`https://api.meaningcloud.com/sentiment-2.1?key=233c4b15af98df58daa1da749c297e2a&of=json&txt=Main%20dishes%20were%20quite%20good%2C%20but%20desserts%20were%20too%20sweet%20for%20me.&model=general&lang=en`)
.then(res => res.json())
.then(posts => console.log(posts))
}

 
getPosts()

const signIn = (username) => {
    // AJAX reqest hitting the GET route written in our userRoutes.js (returns the user information along with all items found by the user)
    axios.get(`/api/users/${username || document.getElementById('username').value}`)
      // destructuring the list of items found off the payload
      .then(({ data: list }) => {
        // assigning the retrieved value to our global variables for sharing the info between many functions, as well as passing the value into localStorage
        uid = list[0].userid
        uname = list[0].username
        localStorage.setItem('uid', list[0].userid)
        localStorage.setItem('uname', list[0].username)
  
        // taking the list of items and passing it to the renderList function to be rendered
        renderList(list)
  
        // little display message to signify to the user that they have signed in
        document.getElementById('message').textContent = `Hello ${list[0].username}! Welcome to Felp!`
        // disable all sign in and create user form items and enable the sign out button
        document.getElementById('username').setAttribute('disabled', true)
        document.getElementById('signIn').setAttribute('disabled', true)
        document.getElementById('createUser').setAttribute('disabled', true)
        document.getElementById('signOut').removeAttribute('disabled')
      })
      .catch(e => console.error(e))
  }
  

const getPosts = () => {
  return fetch(`https://api.meaningcloud.com/sentiment-2.1?key=233c4b15af98df58daa1da749c297e2a&of=json&txt=Main%20dishes%20were%20quite%20good%2C%20but%20desserts%20were%20too%20sweet%20for%20me.&model=general&lang=en`)
  .then(res => res.json())
  .then(posts => console.log(posts))
  }
  
   
  getPosts()
  
  // const signIn = (username) => {
  //     // AJAX reqest hitting the GET route written in our userRoutes.js (returns the user information along with all items found by the user)
  //     axios.get(`/api/users/${username || document.getElementById('username').value}`)
  //       // destructuring the list of items found off the payload
  //       .then(({ data: list }) => {
  //         // assigning the retrieved value to our global variables for sharing the info between many functions, as well as passing the value into localStorage
  //         uid = list[0].userid
  //         uname = list[0].username
  //         localStorage.setItem('uid', list[0].userid)
  //         localStorage.setItem('uname', list[0].username)
    
  //         // taking the list of items and passing it to the renderList function to be rendered
  //         renderList(list)
    
  //         // little display message to signify to the user that they have signed in
  //         document.getElementById('message').textContent = `Hello ${list[0].username}! Welcome to Felp!`
  //         // disable all sign in and create user form items and enable the sign out button
         
  //         document.getElementById('signIn').setAttribute('disabled', true)
  //         document.getElementById('createAccount').setAttribute('disabled', true)
  //         document.getElementById('signOut').removeAttribute('disabled')
  //       })
  //       .catch(e => console.error(e))
  //   }
  
  //   // function to create a new user for our to-do list
  // const createAccount = () => {
  //     // axios POST request to create a new item, grabbing the value of the item <input> and the checked boolean for the checkbox to create the new item
  //     axios.post('/api/username', {
  //       username: document.getElementById('username').value,
  //     })
  //       // once finished, a GET request for all items is run
  //       .then(() => axios.get('/api/username'))
  //       // the items found are passed to renderList to re-render all the items with the new changes
  //       .then(({ data: list }) => renderList(list)) 
  //       // handle our errors
  //       .catch(e => console.error(e))
  //   }
    
  // //   when the CreateUser button is clicked
  //   document.getElementById('createAccount').addEventListener('click', event => {
  //     // Stop the form from refreshing the page
  //     event.preventDefault()
  //     // Runs the createItem function
  //     createAccount()
  //   })
  //   //   when the SignIn button is clicked
  //   document.getElementById('signIn').addEventListener('click', event => {
  //     // Stop the form from refreshing the page
  //     event.preventDefault()
  //     // Runs the createItem function
  //     createItem()
  //   })
  
  
  
  var button = document.getElementById("createAccount");
  button.addEventListener("click", function(){
  document.location.href = './Users.html'; 
  });     
  
  var button = document.getElementById("signIn");
  button.addEventListener("click", function (){
  document.location.href ='./Users.html';
  });

  var button = document.getElementById("signOut");
  button.addEventListener("click",function(){
  document.location.href = './Index.html';
  });
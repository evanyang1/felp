const L_B_ZOMATO = 'https://developers.zomato.com/api/v2.1/search?'
const L_R_ZOMATO = 'https://developers.zomato.com/api/v2.1/reviews?'
const K_ZOMATO = 'apikey=39e17219549ea152e0fb9205ede5e31f'
// 'apikey=ee4a608fabb19dc711f33a112d67a23e'
const S_RATING = 'sort=rating'

let listOfRest = []
let lati = ''
let long = ''

class Restaurant {

  constructor(restaurant, reviews) {
    this.id = restaurant.id
    this.name = restaurant.name
    this.user_rating = restaurant.user_rating
    this.address = restaurant.location.address
    this.phone_numbers = restaurant.phone_numbers
    this.photos = restaurant.photos
    this.cuisines = restaurant.cuisines
    this.reviews = reviews
  }
}

function getRestaurant(){
let link = `${L_B_ZOMATO}&${S_RATING}&${K_ZOMATO}`
fetch(link)
  .then(d => d.json())
  .then(restaurantsData => {
    // console.log(restaurantsData)
   let restaurantList= restaurantsData.restaurants 
   restaurantList.forEach(({restaurant})=>{
     let reviewLink = `${L_R_ZOMATO}&res_id=${restaurant.id}&${K_ZOMATO}`
     fetch(reviewLink)
     .then(d => d.json())
     .then(reviews => {
      let rest = new Restaurant(restaurant, reviews)
      listOfRest.push(rest)
      
      console.log(rest)

       }).catch(e => console.error(e))
   })
  })
  .catch(e => console.error(e))
}
  // buttons direct the users to different pages
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

// // API for semantic analysis 
// const getPosts = () => {
//   return fetch(`https://api.meaningcloud.com/sentiment-2.1?key=233c4b15af98df58daa1da749c297e2a&of=json&txt=Main%20dishes%20were%20quite%20good%2C%20but%20desserts%20were%20too%20sweet%20for%20me.&model=general&lang=en`)
//   .then(res => res.json())
//   .then(posts => console.log(posts))
//   }
  
   
//   getPosts()
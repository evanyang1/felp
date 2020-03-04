const L_B_ZOMATO = 'https://developers.zomato.com/api/v2.1/search?'
const L_R_ZOMATO = 'https://developers.zomato.com/api/v2.1/reviews?'
const K_ZOMATO = 'apikey=ee4a608fabb19dc711f33a112d67a23e'
const S_RATING = 'sort=rating'

let listOfRest = []

class Restaurant {

  constructor(restaurant, reviews) {
    this.id = restaurant.id
    this.name = restaurant.name
    this.user_rating = restaurant.user_rating
    this.address = restaurant.location.address
    this.phone_numbers = restaurant.phone_numbers
    this.photos = restaurant.photos
    this.reviews = reviews
  }
}

function getRestaurant() {
  let link = `${L_B_ZOMATO}&${S_RATING}&${K_ZOMATO}`
  fetch(link)
    .then(d => d.json())
    .then(restaurantsData => {
      // console.log(restaurantsData)
      let restaurantList = restaurantsData.restaurants
      restaurantList.forEach(({ restaurant }) => {
        let reviewLink = `${L_R_ZOMATO}&res_id=${restaurant.id}&${K_ZOMATO}`
        fetch(reviewLink)
          .then(d => d.json())
          .then(reviews => {
            let rest = new Restaurant(restaurant, reviews)
            listOfRest.push(rest)
            // console.log(rest)
            restCard(rest)
          }).catch(e => console.error(e))
      })
    })
    .catch(e => console.error(e))
}
getRestaurant()

function restCard(rest) {
  console.log(rest)
  let restElem = document.createElement('div')
  restElem.className = 'card mb-3'
  restElem.innerHTML = `
  <div class="card mb-3" >
   <div class="row no-gutters">
    <div class="col-md-4">

     <div id="r${rest.id}" class="carousel slide" data-ride="carousel">
       <div class="carousel-inner">
  
         ${rest.photos.map(({ photo }, i) => (
            `<div class="carousel-item ${!i ? 'active' : ''} " >
                <img src="${photo.url}" class="d-block w-100" height="250">
              </div> `
              )).join('')}
   
       </div>
     <a class="carousel-control-prev" href="#r${rest.id}" role="button" data-slide="prev">
       <span class="carousel-control-prev-icon" aria-hidden="true"></span>
       <span class="sr-only">Previous</span>
     </a>
     <a class="carousel-control-next" href="#r${rest.id}" role="button" data-slide="next">
       <span class="carousel-control-next-icon" aria-hidden="true"></span>
       <span class="sr-only">Next</span>
     </a>
     </div>

    </div>
      <div class="col-md-8">
         <div class="card-body">
         <h5 class="card-title">Card title</h5>
         <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content.
          This content is a little bit longer.</p>
         <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
         </div>
      </div>
   </div>
 </div>
`
  document.getElementById('container').append(restElem)
}







const getPosts = () => {
  return fetch(`https://api.meaningcloud.com/sentiment-2.1?key=233c4b15af98df58daa1da749c297e2a&of=json&txt=Main%20dishes%20were%20quite%20good%2C%20but%20desserts%20were%20too%20sweet%20for%20me.&model=general&lang=en`)
    .then(res => res.json())
    .then(posts => console.log(posts))
}


getPosts()


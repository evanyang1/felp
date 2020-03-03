const L_B_ZOMATO = 'https://developers.zomato.com/api/v2.1/search?'
const L_R_ZOMATO ='https://developers.zomato.com/api/v2.1/reviews?'
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
       }).catch(e => console.error(e))
   })
  })
  .catch(e => console.error(e))
}
getRestaurant()


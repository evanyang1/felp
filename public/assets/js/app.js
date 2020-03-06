const reviewsArr = []

const L_B_ZOMATO = 'https://developers.zomato.com/api/v2.1/search?'
const L_R_ZOMATO = 'https://developers.zomato.com/api/v2.1/reviews?'
const K_ZOMATO =
  // 'apikey=39e17219549ea152e0fb9205ede5e31f'
  'apikey=ee4a608fabb19dc711f33a112d67a23e'
const S_RATING = 'sort=rating'

let listOfRest = []
// let lati = ''
// let long = ''

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
// get keyword from search bar
document.getElementById('search_btn').addEventListener('click', () => {
  let keyword = document.getElementById('search').value
  keyword = keyword.replace(/\s+/g, '+')
  getRestaurant(keyword)
  // fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${keyword}&key=AIzaSyCbOrVjet_s1nbRMEgLVNsx0reP9G6Ju6g`)
  //   .then(r => r.json())
  //   .then(({ results }) => {
  //     // console.log(results[0].geometry.location.lat)
  //     // console.log(results[0].geometry.location.lng)
  //     let lati = results[0].geometry.location.lat
  //     let long = results[0].geometry.location.lng
  //     getRestaurant(lati, long)
  //   })
})

// get restaurant data from api
function getRestaurant(keyword) {
  let link = `${L_B_ZOMATO}&q=${keyword}&${S_RATING}&${K_ZOMATO}`
  // lat = ${ lati }& lon=${ long }
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
                <img src="${photo.url}" class="d-block w-100" height="300">
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
         <h5 class="card-title">${rest.name}  <span class="badge badge-pill badge-success">
         ${rest.user_rating.aggregate_rating}</span></h5>
         <p class="card-text">Address:<br> ${rest.address}</p>
         <p class="card-text">Phone:<br> ${rest.phone_numbers}</p>
         <p class="card-text">Cuisines:<br> ${rest.cuisines}</p
         
         <button class="btn btn-primary btn-sm active" role="button" aria-pressed="true"
          id=${rest.id} data-id=${rest.id} data-review=${JSON.stringify(rest.reviews)}>Read Reviews</button>

         <button class="btn btn-primary btn-sm active" role="button" aria-pressed="true"
         id=${rest.phone_numbers} data-id=${rest.id} data-restname=${JSON.stringify(rest.name)} 
         data-restaddress=${JSON.stringify(rest.address)}>Write Reviews</button>
         </Ref>
         <a href="#" class="btn btn-primary btn-sm active" role="button" aria-pressed="true">Read Reviews</a>
         <a href="#" class="btn btn-primary btn-sm active" role="button" aria-pressed="true">Write Reviews</a>
         </div>
      </div>
   </div>
 </div>
`

// show restaurant cards on restaurant html
  document.getElementById('container').append(restElem)

// get data for button Read Reviews and Write Reviews
  reviewsArr.push({ restId: rest.id, restReview: rest.reviews })
  createReviewsArr.push({ restId: rest.id, restName: rest.name, restAddress: rest.address })

// Read Reviews button
  document.getElementById(rest.id).addEventListener('click', e => {
    const divId = JSON.parse(e.target.getAttribute('data-id'))

    reviewsArr.forEach(elm => {
      // console.log(elm)
      if (elm.restId == divId) {
        if (elm.restReview.user_reviews.length != 0) {

          document.getElementById(divId).innerHTML = `
              <ul>${elm.restReview.user_reviews.map(el => (`<li>${el.review.review_text}</li>`)).join('')}</ul>`
        }// if

      }
    })
  })

// Write Reviews button






}// the end of restCard

// document.getElementById('readReviews').addEventListener('click',()=>{
// document.getElementById('container').innerHTML=''
// let reviewElm = document.createElement('div')

// })









// API for semantic analysis 
// const getPosts = () => {
  // return fetch(`https://api.meaningcloud.com/sentiment-2.1?key=233c4b15af98df58daa1da749c297e2a&of=json&txt=Main%20dishes%20were%20quite%20good%2C%20but%20desserts%20were%20too%20sweet%20for%20me.&model=general&lang=en`)
//     .then(res => res.json())
//     .then(posts => console.log(posts))
// }


// getPosts()
  document.getElementById('container').append(restElem)
}


// const getPosts = () => {
//   return fetch(`https://api.meaningcloud.com/sentiment-2.1?key=233c4b15af98df58daa1da749c297e2a&of=json&txt=Main%20dishes%20were%20quite%20good%2C%20but%20desserts%20were%20too%20sweet%20for%20me.&model=general&lang=en`)
//     .then(res => res.json())
//     .then(posts => console.log(posts))
// }
// getPosts()


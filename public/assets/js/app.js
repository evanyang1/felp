
const reviewsArr = []

const L_B_ZOMATO = 'https://developers.zomato.com/api/v2.1/search?'
const L_R_ZOMATO = 'https://developers.zomato.com/api/v2.1/reviews?'
// const K_ZOMATO = 'apikey=39e17219549ea152e0fb9205ede5e31f'
const K_ZOMATO ='apikey=ee4a608fabb19dc711f33a112d67a23e'
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

document.getElementById('search_btn2').addEventListener('click', event => {
  event.preventDefault()
  let keyword = document.getElementById('search_input').value
  keyword = keyword.replace(/\s+/g, '+')
  getRestaurant(keyword)
 
})
function getResthome() {}

function getRestaurant(keyword) {
  document.getElementById('container').innerHTML = ""
  listOfRest = []
  let link = `${L_B_ZOMATO}&q=${keyword}&${K_ZOMATO}`
  // lat = ${ lati }& lon=${ long }
  fetch(link)
    .then(d => d.json())
    .then(restaurantsData => {
      console.log(restaurantsData)
      let restaurantList = restaurantsData.restaurants
      restaurantList.forEach(({ restaurant }) => {
        let reviewLink = `${L_R_ZOMATO}&res_id=${restaurant.id}&${K_ZOMATO}`
        fetch(reviewLink)
          .then(d => d.json())
          .then(reviews => {
            let rest = new Restaurant(restaurant, reviews)
            listOfRest.push(rest)
            restCard(rest)

          }).catch(e => console.error(e))
      })
    })
    .catch(e => console.error(e))
}

function restCard(rest) {
  let reviewLength
  if(rest.reviews.user_reviews.length <1){
    reviewLength = 0 
  }
  else{
    reviewLength = rest.reviews.user_reviews.length
  }
  
  let restElem = document.createElement('div')
  restElem.className = 'card mb-3'
  restElem.id = rest.id
  restElem.innerHTML = `
  <div class="row no-gutters">
    <div class="col-md-4">
    
    <div id="x${rest.id}" class="carousel slide" data-ride="carousel">
      <div class="carousel-inner">
  
        ${rest.photos ? rest.photos.map(({ photo }, i) => (
    `<div class="carousel-item ${!i ? 'active' : ''} " >
    <img src="${photo.url}" class="d-block w-100" height="300">
    </div> `
  )).join('') : '<img src="photos/no-photo-available.png" class="d-block w-100" height="300">'}
  
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
        <h5 class="card-title">${rest.name}  <span class="badge badge-pill badge-success">${rest.user_rating.aggregate_rating}</span></h5>
        <p class="card-text">Address:<br> ${rest.address}</p>
        <p class="card-text">Phone:<br> ${rest.phone_numbers}</p>
        <p class="card-text">Cuisines:<br> ${rest.cuisines}</p>
        <button class="btn btn-primary btn-sm active" role="button" aria-pressed="true" id=${rest.id} data-toggle="modal" data-target="#r${rest.id}" data-id=${rest.id} data-review=${JSON.stringify(rest.reviews)}>Read Reviews (${reviewLength})</button>
        <button  class="btn btn-primary btn-sm active" role="button" aria-pressed="true">Write Reviews</button>
        
      </div>
  </div>
  <div class="modal fade" id="r${rest.id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">${rest.name} Reviews</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div id = "modal_${rest.id}"class="modal-body">
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
`
  
  document.getElementById('container').append(restElem)
  let reviewDiv = document.createElement('ol')
  reviewDiv.setAttribute('id',`reviews_${rest.id}`)
  if (rest.reviews.user_reviews.length < 1) {
    //console.log('No reviews!')
    reviewDiv.textContent = "No Reviews to Display."
    // reviewDiv: <div id = "reviews_${rest.id}"> No Reviews to Display <//div>
  }
  else {
    for(let i =0;i < rest.reviews.user_reviews.length;i++) {
    //console.log(rest.reviews.user_reviews[i].review.rating)
    //console.log(rest.reviews.user_reviews[i].review.review_text)
    // generating the html for the user reviews
    let reviewParagraph =document.createElement('li')
    reviewParagraph.textContent= rest.reviews.user_reviews[i].review.review_text
    reviewDiv.append(reviewParagraph)

    let commentBreak = document.createElement('hr')
    reviewDiv.append(commentBreak)
    }
    
  }

  document.getElementById(`modal_${rest.id}`).append(reviewDiv)
  reviewsArr.push({ restId: rest.id, restReview: rest.reviews })

}

















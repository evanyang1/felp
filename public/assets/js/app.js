const { axios, localStorage } = window

let uid = localStorage.getItem('uid')
let uname = localStorage.getItem('uname')
let uemail = localStorage.getItem('uemail')

const reviewsArr = []

const L_B_ZOMATO = 'https://developers.zomato.com/api/v2.1/search?'
const L_R_ZOMATO = 'https://developers.zomato.com/api/v2.1/reviews?'
const K_ZOMATO = 'apikey=39e17219549ea152e0fb9205ede5e31f'
// const K_ZOMATO = 'apikey=ee4a608fabb19dc711f33a112d67a23e'
// const K_ZOMATO = 'apikey=d7aecbf81dbbebd81715f46c52946fc3'
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





document.getElementById('search_btn').addEventListener('click', event => {
  event.preventDefault()
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

function getRestaurant(keyword) {
  let link = `${L_B_ZOMATO}&q=${keyword}&${K_ZOMATO}`
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
  let reviewLength
  if (rest.reviews.user_reviews.length < 1) {
    reviewLength = 0
  }
  else {
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
     <a class="carousel-control-prev" href="#s${rest.id}" role="button" data-slide="prev">
       <span class="carousel-control-prev-icon" aria-hidden="true"></span>
       <span class="sr-only">Previous</span>
     </a>
     <a class="carousel-control-next" href="#s${rest.id}" role="button" data-slide="next">
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
         <button  class="btn btn-primary btn-sm active" role="button" aria-pressed="true" data-toggle="modal" data-target="#w${rest.id}">Write Reviews</button>
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

<div class="modal fade" id="w${rest.id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
   <div class="modal-dialog" role="document">
     <div class="modal-content">
       <div class="modal-header">
         <h5 class="modal-title" id="exampleModalLabel"> ${rest.name}</h5>
         <button type="button" class="close" data-dismiss="modal" aria-label="Close">
           <span aria-hidden="true">&times;</span>
         </button>
       </div>
       <div id = "writeReview_${rest.id}"class="modal-body">
       </div>
       <div class="modal-footer">
         <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
       </div>
     </div>
   </div>
 </div>

`

  document.getElementById('container').append(restElem)

  // read reviews modal
  let reviewDiv = document.createElement('ol')
  reviewDiv.setAttribute('id', `reviews_${rest.id}`)
  if (rest.reviews.user_reviews.length < 1) {
    // console.log('No reviews!')
    reviewDiv.textContent = "No Reviews to Display."
    // reviewDiv: <div id = "reviews_${rest.id}"> No Reviews to Display <//div>
  }
  else {
    for (let i = 0; i < rest.reviews.user_reviews.length; i++) {
      // console.log(rest.reviews.user_reviews[i].review.rating)
      // console.log(rest.reviews.user_reviews[i].review.review_text)
      // generating the html for the user reviews
      let reviewParagraph = document.createElement('li')
      let apiReviewText = rest.reviews.user_reviews[i].review.review_text

      if (apiReviewText.length <= 1) {
        reviewParagraph.innerHTML = `
      
      <div placeholder="No review text"> <span class="badge badge-pill badge-success">${rest.reviews.user_reviews[i].review.rating}</span> No review text</div>
      <hr>
      `
        reviewDiv.append(reviewParagraph)

      } else {


        reviewParagraph.innerHTML = `
      
      <div placeholder="No review text"> <span class="badge badge-pill badge-success">${rest.reviews.user_reviews[i].review.rating}</span> ${rest.reviews.user_reviews[i].review.review_text}</div>
      <hr>
      `
        // reviewParagraph.textContent = rest.reviews.user_reviews[i].review.review_text
        reviewDiv.append(reviewParagraph)

        // let commentBreak = document.createElement('hr')
        // reviewDiv.append(commentBreak)
      }
    }

  }
  document.getElementById(`modal_${rest.id}`).append(reviewDiv)


  // write review modal
  let writeReviewDiv = document.createElement('form')
  writeReviewDiv.setAttribute('id', `write_${rest.id}`)
  writeReviewDiv.innerHTML = `
  <div class="form-group">
    <label for="exampleInputEmail1">Please leave us a review</label>
    <input type="text" class="form-control" id="userReview_${rest.id}" height="250" placeholder="Share details of your own experience at this place">
  </div>
  
  <div class="form-group form-check">
  <div class="container">
  <div class="row">
    <div class="col-lg-12">
      <div class="star-rating">
        <span class="fa fa-star-o" data-rating="1"></span>
        <span class="fa fa-star-o" data-rating="2"></span>
        <span class="fa fa-star-o" data-rating="3"></span>
        <span class="fa fa-star-o" data-rating="4"></span>
        <span class="fa fa-star-o" data-rating="5"></span>
        <input type="hidden" id="userRating_${rest.id}" name="whatever1" class="rating-value" valu="2.56">
      </div>
    </div>
  </div>
  </div>

  <button type="submit" onclick="createPost()" class="btn btn-primary">Submit</button>
  `


  var userText = document.getElementById(`writeReview_${rest.id}`).append(writeReviewDiv)

  // star rating of write review
  var $star_rating = $('.star-rating .fa')

  var SetRatingStar = function () {
    return $star_rating.each(function () {
      if (parseInt($star_rating.siblings('input.rating-value').val()) >= parseInt($(this).data('rating'))) {
        return $(this).removeClass('fa-star-o').addClass('fa-star')
      } else {
        return $(this).removeClass('fa-star').addClass('fa-star-o')
      }
    })
  }

  $star_rating.on('click', function () {
    $star_rating.siblings('input.rating-value').val($(this).data('rating'))
    let userRating = parseInt($star_rating.siblings('input.rating-value').val())
    let userRrating = document.getElementById(`userRating_${rest.id}`).value
    console.log(userRating)
    return SetRatingStar()
  })

  SetRatingStar()

}



// show the current username
document.getElementById('message').textContent = `Hello ${uname} ! Welcome to Felp!`

document.getElementById('signOut').addEventListener('click', event => {
  // Stop the form from refreshing the page
  event.preventDefault()

  // clear localStorage
  localStorage.clear()

  // little display message to signify to the user that they have not signed in
  document.getElementById('message').textContent = 'This is an app for writing the reviews you need to complete. Create an account or Sign in to get started! Please click the Home button to sign in!'
  // disable all sign in and create user form items and enable the sign out button
  document.getElementById('signOut').setAttribute('disabled', true)

  // clear out the list display
  // document.getElementById('search_btn').innerHTML = '<li class="list-group-item">You can not posts, current Not signed in yet.</li>'
})

// click home go back to singin
document.getElementById('index').addEventListener('click', event => {
  // Stop the form from refreshing the page
  event.preventDefault()

  window.location.href = '/'
  // Runs the signIn function

})

// // function to create a new item for our to-do list
// const createPost = () => {
//   // axios POST request to create a new item, grabbing the value of the item <input> and the checked boolean for the checkbox to create the new item (including the global uid variable, which at the time of execution will have been assigned value by either the createUser or signIn function)
//   axios.post('/api/posts', {
//     rest_name: document.getElementById(exampleModalLabel).value,
//     rest_id: document.getElementById(writeReview_).value,
//     text: document.getElementById(userRating_).value,
//     rating: setRatingStar.value,
//     userId: uid
//   })
//     // once finished, a GET request for the user and all their items is run
//     .then(() => axios.get(`/api/posts/${uname}`))
//   console.log("hello")
//     // the items found are passed to renderList to re-render all the items with the new changes
//     .then(({ data: post }) => renderList(post))
//   console.log(post)
//     // handle our errors
//     .catch(e => console.error(e))

// }

document.getElementById('userReviews').addEventListener('click', event => {
  window.location.href = '/userreviews.html'
})



// read reviews from data base
// axios.get all same rest_id posts, get reviews, use reviews.text (ask nok)

// if (dataReviews.length >= 1) {
//   for (let i = 0; i < dataReviews.length; i++) {
//     console.log(dataReviews)

//     fetch(`https://api.meaningcloud.com/sentiment-2.1?key=233c4b15af98df58daa1da749c297e2a&of=json&txt=${dataReviews[i].text}&model=general&lang=en`)
//       .then(res => res.json())
//       .then(posts => {
//         console.log(posts.score_tag)
//         if (posts.score_tag = 'P+' || 'P' || 'NEU') {
//           let UserReviewParagraph = document.createElement('li')
//           UserReviewParagraph.innerHTML = `
//            <div class="bd-callout bd-callout-info"> 
//            <div><span class="badge badge-pill badge-success">${dataReviews[i].rating}</span> ${dataReviews[i].text}</div>
//            </div>`

//           reviewDiv.append(UserReviewParagraph)
//         }
//       })
//   }
// }









// API for semantic analysis 
// const getPosts = () => {
//   return fetch(`https://api.meaningcloud.com/sentiment-2.1?key=233c4b15af98df58daa1da749c297e2a&of=json&txt=Main%20dishes%20were%20quite%20good%2C%20but%20desserts%20were%20too%20sweet%20for%20me.&model=general&lang=en`)
//     .then(res => res.json())
//     .then(posts => console.log(posts))
// }


// getPosts()

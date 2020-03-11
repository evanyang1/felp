const { axios, localStorage } = window
let uid = localStorage.getItem('uid')
console.log(uid)

const L_Rs_ZOMATO = 'https://developers.zomato.com/api/v2.1/restaurant?'
// const K_ZOMATO = 'apikey=39e17219549ea152e0fb9205ede5e31f'
// const K_ZOMATO = 'apikey=ee4a608fabb19dc711f33a112d67a23e'
const K_ZOMATO = 'apikey=d7aecbf81dbbebd81715f46c52946fc3'
//d7aecbf81dbbebd81715f46c52946fc3

// show all user's reviews
const renderreviews = reviews => {
  document.getElementById('reviewsCard').innerHTML = ''
  axios.get(`/api/posts/${uid}`)
    .then(({ data: reviews }) => {
      console.log(reviews)

      if (reviews.length < 1) {
        console.log('pang')
        document.getElementById('reviewsCard').innerHTML = '<div>No review yet.</div>'
      } else {
        console.log('ping')
        for (let i = 0; i < reviews.length; i++) {
          const reviewElem = document.createElement('div')
          reviewElem.id = reviews[i].id
          let link = `${L_Rs_ZOMATO}res_id=${reviews[i].rest_id}&${K_ZOMATO}`
          fetch(link)
            .then(d => d.json())
            .then(restinfo => {
              console.log(restinfo)

              reviewElem.innerHTML = `
          <div class="row no-gutters">
           <div class="col-md-4">

            <div id="x${restinfo.id}" class="carousel slide" data-ride="carousel">
             <div class="carousel-inner">
              ${restinfo.photos ? restinfo.photos.map(({ photo }, i) => (
                `<div class="carousel-item ${!i ? 'active' : ''} " >
                  <img src="${photo.url}" class="d-block w-100" height="300">
                 </div> `
              )).join('') : '<img src="photos/no-photo-available.png" class="d-block w-100" height="300">'}
   
                 </div>
                  <a class="carousel-control-prev" href="#s${restinfo.id}" role="button" data-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="sr-only">Previous</span>
                  </a>
                  <a class="carousel-control-next" href="#s${restinfo.id}" role="button" data-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="sr-only">Next</span>
                  </a>
               </div>
             </div>

            <div class="col-md-8">
             <div class="card-body">
              <h5 class="card-title">${restinfo.name}  <span class="badge badge-pill badge-success">${restinfo.user_rating.aggregate_rating}</span></h5>
              <p class="card-text">Address:<br> ${restinfo.location.address}</p>
              <p class="card-text">Phone:<br> ${restinfo.phone_numbers}</p>
              <p class="card-text">Cuisines:<br> ${restinfo.cuisines}</p>
              <button  id= "delete" value="${reviews[i].id}" class="btn btn-primary btn-sm active" role="button" aria-pressed="true" > Delete </button>
              <div class="card-header">
              <span class="badge badge-pill badge-success">${reviews[i].rating}</span> ${reviews[i].text}
            </div >
           </div >
          </div >
  `
              document.getElementById('reviewsCard').append(reviewElem)
              document.getElementById('delete').addEventListener('click', event => {
                console.log(event.target.value)
                deleteReview(event.target.value)
              })
            })
            .catch(e => console.error(e))

        }
      }
    })
    .catch(e => console.error(e))
}

renderreviews()


// delete one of user review
const deleteReview = (postId) => {
  console.log(postId)
  axios.delete(`/api/posts/${postId}`)
    // once finished, a GET request for the user and all their items is run
    .then(() => axios.get(`/api/posts/${uid}`))
    // the items found are passed to renderList to re-render all the items with the new changes
    .then(({ data: reviews }) => renderreviews(reviews))
    // handle our errors
    .catch(e => console.error(e))
}


// function creatCard(restinfo) {
//   console.log(restinfo.name)

//   reviewElem.innerHTML = `
//           <div class="row no-gutters">
//            <div class="col-md-4">

//             <div id="x${restinfo.id}" class="carousel slide" data-ride="carousel">
//              <div class="carousel-inner">
//               ${restinfo.photos ? restinfo.photos.map(({ photo }, i) => (
//     `<div class="carousel-item ${!i ? 'active' : ''} " >
//                   <img src="${photo.url}" class="d-block w-100" height="300">
//                  </div> `
//   )).join('') : '<img src="photos/no-photo-available.png" class="d-block w-100" height="300">'}

//                  </div>
//                   <a class="carousel-control-prev" href="#s${restinfo.id}" role="button" data-slide="prev">
//                   <span class="carousel-control-prev-icon" aria-hidden="true"></span>
//                   <span class="sr-only">Previous</span>
//                   </a>
//                   <a class="carousel-control-next" href="#s${restinfo.id}" role="button" data-slide="next">
//                   <span class="carousel-control-next-icon" aria-hidden="true"></span>
//                   <span class="sr-only">Next</span>
//                   </a>
//                </div>
//              </div>

//             <div class="col-md-8">
//              <div class="card-body">
//               <h5 class="card-title">${restinfo.name}  <span class="badge badge-pill badge-success">${restinfo.user_rating.aggregate_rating}</span></h5>
//               <p class="card-text">Address:<br> ${restinfo.location.address}</p>
//               <p class="card-text">Phone:<br> ${restinfo.phone_numbers}</p>
//               <p class="card-text">Cuisines:<br> ${restinfo.cuisines}</p>
//               <button  id= "delete" class="btn btn-primary btn-sm active" role="button" aria-pressed="true" > Delete </button>
//               <div class="card-header">
//               <span class="badge badge-pill badge-success">${reviews[i].rating}</span> ${reviews[i].text}
//             </div >
//            </div >
//           </div >
//   `

// }

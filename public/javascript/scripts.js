// javascript/scripts.js

// Make a request to the color api
// axios.get('http://www.thecolorapi.com/id?hex=24B1E0')
//   .then(function (response) {
//     // handle success
//     alert(response.hex.value);
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   });

 // listen for a form submit event
// prevent the default form behavior
// serialize the form data into an object
// use axios to initialize a post request and send in the form data
// wait for the success response from the server
// remove the information from the form
// display the data as a new comment on the page
// handle any errors
//let currentUrl = new URL(window.location.href);
//let currentPath = currentUrl.pathname.split('/');
//let movieId = currentPath[2];
//let reviewId = currentPath[4];

// listen for a form submit event
window.onload = function() {
if (document.getElementById("newComment") != null) {
    document.getElementById("newComment").addEventListener("submit", e => {
        // prevent the default form behavior
        e.preventDefault();
        console.log("Hi");

        // serialize the form data into an object
        let comment = {};
        const inputs = document.getElementsByClassName('form-control');
        for (var i = 0; i < inputs.length; i++) {
          comment[inputs[i].name] = inputs[i].value;
        }
        console.log(comment);

        //use axios to initialize a post request and send in the form data

          axios.post(`/reviews/comments`, comment)
          .then(function (response) {
            // wait for the success response from the server
            console.log(response);
            // remove the information from the form
            document.getElementById("newComment").reset();
            // display the data as a new comment on the page
            $(document.getElementById('comments')).prepend(
              `
               <div class="card">
                 <div class="card-block">
                   <h4 class="card-title">${response.data.comment.title}</h4>
                   <p class="card-text">${response.data.comment.content}</p>
                   <p>
                      <form method="POST" action="/reviews/comments/${response._id}?_method=DELETE">
                        <button class="btn btn-link" type="submit">Delete</button>
                      </form>
                   </p>
                 </div>
               </div>
              `
          )}).catch(function (error) {
                console.log(error);
                // handle any errors
                alert('There was a problem saving your comment. Please try again.')
              });

    });
}
}

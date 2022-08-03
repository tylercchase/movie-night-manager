const functions = require('@google-cloud/functions-framework');


// const Firestore = require('@google-cloud/firestore');

// const firestore = new Firestore({
//   projectId: process.env.GOOGLE_CLOUD_PROJECT,
// });


// Register an HTTP function with the Functions Framework that will be executed
// when you make an HTTP request to the deployed function's endpoint.
functions.http('getMovies', (req, res) => {
  let thing = {
    movies: [{"Title":"Slumber Party Massacre","Year":"2021","Rated":"TV-MA","Released":"27 Nov 2021","Runtime":"86 min","Genre":"Horror","Director":"Danishka Esterhazy","Writer":"Suzanne Keilly","Actors":"Hannah Gonera, Frances Sholto-Douglas, Mila Rayne","Plot":"A remake of the 1982 slasher film about sorority girls attacked by a maniac killer with a large electric drill.","Language":"English","Country":"South Africa","Awards":"1 nomination","Poster":"https://m.media-amazon.com/images/M/MV5BMzM3NmJhYzAtYTkyNy00MTExLTk4MDQtZDUyMzg5MTYxN2M3XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"5.0/10"},{"Source":"Rotten Tomatoes","Value":"100%"}],"Metascore":"N/A","imdbRating":"5.0","imdbVotes":"2,042","imdbID":"tt14449392","Type":"movie","DVD":"19 Oct 2021","BoxOffice":"N/A","Production":"N/A","Website":"N/A","Response":"True"}
    ]
  }
  res.send(thing);
});


// [START functions_firebase_reactive]


// Converts strings added to /messages/{pushId}/original to uppercase
// exports.makeUpperCase = event => {
//   const resource = event.value.name;
//   const affectedDoc = firestore.doc(resource.split('/documents/')[1]);

//   const curValue = event.value.fields.original.stringValue;
//   const newValue = curValue.toUpperCase();

//   if (curValue !== newValue) {
//     console.log(`Replacing value: ${curValue} --> ${newValue}`);

//     return affectedDoc.set({
//       original: newValue,
//     });
//   } else {
//     // Value is already upper-case
//     // Don't perform a(nother) write to avoid infinite loops
//     console.log('Value is already upper-case.');
//   }
// };
// [END functions_firebase_reactive]
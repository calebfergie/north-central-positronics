function contact_function() {
  var fieldDiv = document.getElementById('passages');
  var passageDiv = $('input');
  console.log("fieldDiv is: " + passageDiv);
}

$(document).on("click", "a", function() {
  console.log("It works!");
});



// $(document.body).delegate('input:text', 'keypress', function(e) {
//   console.log("pressed enter");
//     if (e.which === 13) { // if is enter
//         console.log("pressed enter");
//         e.preventDefault(); // don't submit form
//         // do what you want here
//         contact_function();
//     }
// });

// $(document.body).keypress(function( event ) {
//   if ( event.which == 13 ) {
//      event.preventDefault();
//   }
//   var msg = "Handler for .keypress()";
//   $.print( msg, "html" );
//   $.print( event );
// });

$(document).ready(function() {
  $(document.body).keypress(function(event) {
    if (event.which == 13) {
      event.preventDefault();
      //do stuff on enter
      contact_function();
    }
  });
});

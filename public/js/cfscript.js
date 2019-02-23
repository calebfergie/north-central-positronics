function record(event) {
  var answerDiv = document.getElementById("transfercell");
  var answer = answerDiv.textContent;
  console.log("cfscript has detected a new answer: " + answer);
};

// jQuery event for when enter is presed
$(document).ready(function() {
  $(document.body).keypress(function(event) {
    if (event.which == 13) {
      event.preventDefault();
      console.log("user pressed enter");
      event.preventDefault(); // don't submit form
      // do what you want here
      record(event);
    }
  });
});


// $(document).ready(function() {
// $(document.body).delegate('input:text', 'keypress', function(e) {
//   console.log("user pressed a key");
//   if (e.which === 13) { // if is enter
//     console.log("user pressed enter");
//     e.preventDefault(); // don't submit form
//     // do what you want here
//     record(e);
//   }
// });
// });

// $(document).on(':passageinit', function (ev) {
// console.log("passage here boo 2");
// });

// $(document).on("click", "a", function() {
//   console.log("It works!");
// });

// $(document.body).keypress(function(event) {
//   if (event.which == 13) {
//     event.preventDefault();
//     //do stuff on enter
//     contact_function();
//   }
// });

//   postrender.hello = function() {
//   alert("hello!");

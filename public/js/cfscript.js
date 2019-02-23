var path = '/db';

// function to post user information to express app server
function postToServer(path,params){
  $.ajax({
    type:"POST",
    dataType:"json",
    contentType: "application/json",
    data:JSON.stringify(params),
    url:path,
})
.done(function(response){
      console.log("Response of update: ",response)
})
.fail(function(xhr, textStatus, errorThrown){
      console.log("ERROR: ",xhr.responseText)
      return xhr.responseText;
});
};

// sourced from https://stackoverflow.com/questions/133925/javascript-post-request-like-a-form-submit, in combination with the final submit function from: https://stackoverflow.com/questions/5733808/submit-form-and-stay-on-same-page
// function postToServer(path, params, method) {
//    method = method || "post"; // Set method to post by default if not specified.
//
//    // The rest of this code assumes you are not using a library.
//    // It can be made less wordy if you use one.
//    var form = document.createElement("form");
//    form.setAttribute("method", method);
//    form.setAttribute("action", path);
//
//    for(var key in params) {
//        if(params.hasOwnProperty(key)) {
//            var hiddenField = document.createElement("input");
//            hiddenField.setAttribute("type", "hidden");
//            hiddenField.setAttribute("name", key);
//            hiddenField.setAttribute("value", params[key]);
//
//            form.appendChild(hiddenField);
//        }
//    }
//
//    document.body.appendChild(form);
//    form.submit(function(){
//       $.post($(this).attr('action'), $(this).serialize(), function(response){
//             // do something here on success
//       },'json');
//       return false;
//    });
// };

function record(event) {
  var answerDiv = document.getElementById("transfercell");
  var answer = answerDiv.textContent;
  var data = {answer: answer};
  console.log("cfscript has detected a new answer: " + answer);
  postToServer(path,data);
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

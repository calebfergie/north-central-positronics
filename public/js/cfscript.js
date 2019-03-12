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

function record(event) {
  var passage = document.getElementById("passagetransfer").textContent;
  var answer = document.getElementById("responsetransfer").textContent;
  console.log("cfscript has detected a new answer: " + answer + " on passage: " + passage);
  var data = {passage: passage,answer: answer};
  postToServer(path,data);
};

function addSubtitle() {
  $("#story-subtitle").load("html-snippets/subtitle.html");
};

// jQuery STUFF
$(document).ready(function() {

  //add custom subtitle (data disclaimer) content
  window.onload = function() {
    addSubtitle();
  }

  $(document.body).keypress(function(event) {
    //collect data whenever a user presses enter
    if (event.which == 13) {
      event.preventDefault();
      console.log("user pressed enter");
      event.preventDefault(); // don't submit form
      record(event);
    }
    });
});

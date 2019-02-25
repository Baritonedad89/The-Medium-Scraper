console.log('loaded');
$(function () {
// scrape database for articles and load /articles 




  // $('#scrape-btn').on('click', function () {
  //  document.location.href='/articles';
  // });

})

// scrape website and push data to database on click

$(document).on('click', '#scrape-btn', function(){
  $.ajax({
    method: "GET",
    url: "/articles"
  }). then(function(data) {
    console.log(data);
       document.location.href='/articles';
 
  })
 });





  // update isSaved to true to save article 

$(document).on('click', '#save-btn', function(){
  // data id attr 
    const id = $(this).attr("data-id")
    // isSaved boolean
    const isSaved = $(this).attr("isSaved")
    // row id so that I can remove it on click
    const thisRow = $(`#row-${id}`);
    // remove the article on click
    $(thisRow).remove();    
    
     $.ajax({
       method: "PUT",
       url: `/saved/${id}`
     })
     .then(function(data) {
       console.log(data);
     })
})


$(document).on('click', '#saved-articles-btn', function(){
  $.ajax({
    method: "GET",
    url: "/saved"
  }).then(function(){
    document.location.href='/saved';

  })
})











// // Get references to page elements
// var $exampleText = $("#example-text");
// var $exampleDescription = $("#example-description");
// var $submitBtn = $("#submit");
// var $exampleList = $("#example-list");

// // The API object contains methods for each kind of request we'll make
// var API = {
//   saveExample: function(example) {
//     return $.ajax({
//       headers: {
//         "Content-Type": "application/json"
//       },
//       type: "POST",
//       url: "api/examples",
//       data: JSON.stringify(example)
//     });
//   },
//   getExamples: function() {
//     return $.ajax({
//       url: "api/examples",
//       type: "GET"
//     });
//   },
//   deleteExample: function(id) {
//     return $.ajax({
//       url: "api/examples/" + id,
//       type: "DELETE"
//     });
//   }
// };

// // refreshExamples gets new examples from the db and repopulates the list
// var refreshExamples = function() {
//   API.getExamples().then(function(data) {
//     var $examples = data.map(function(example) {
//       var $a = $("<a>")
//         .text(example.text)
//         .attr("href", "/example/" + example.id);

//       var $li = $("<li>")
//         .attr({
//           class: "list-group-item",
//           "data-id": example.id
//         })
//         .append($a);

//       var $button = $("<button>")
//         .addClass("btn btn-danger float-right delete")
//         .text("ｘ");

//       $li.append($button);

//       return $li;
//     });

//     $exampleList.empty();
//     $exampleList.append($examples);
//   });
// };

// // handleFormSubmit is called whenever we submit a new example
// // Save the new example to the db and refresh the list
// var handleFormSubmit = function(event) {
//   event.preventDefault();

//   var example = {
//     text: $exampleText.val().trim(),
//     description: $exampleDescription.val().trim()
//   };

//   if (!(example.text && example.description)) {
//     alert("You must enter an example text and description!");
//     return;
//   }

//   API.saveExample(example).then(function() {
//     refreshExamples();
//   });

//   $exampleText.val("");
//   $exampleDescription.val("");
// };

// // handleDeleteBtnClick is called when an example's delete button is clicked
// // Remove the example from the db and refresh the list
// var handleDeleteBtnClick = function() {
//   var idToDelete = $(this)
//     .parent()
//     .attr("data-id");

//   API.deleteExample(idToDelete).then(function() {
//     refreshExamples();
//   });
// };

// // Add event listeners to the submit and delete buttons
// $submitBtn.on("click", handleFormSubmit);
// $exampleList.on("click", ".delete", handleDeleteBtnClick);

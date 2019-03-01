
// jquery to run the collapsible divs for comments
$(document).ready(function () {
  $('.collapsible').collapsible();
});

// jquery for comment modal
$(document).ready(function () {
  $('.modal').modal();
});

// get data on root load 
$(document).ready(function () {
  $.getJSON('/', function (data) {
    console.log(data)
  });
});


// scrape website and push data to database on click
$(document).on('click', '#scrape-btn', function () {
  $.ajax({
    method: 'GET',
    url: `api/headlines`
  }).then(function (data) {
    console.log(data);
    document.location.href = '/';

  })
});



// function that updates isSaved to either true or false to save article 
const changeSaved = (element, url, path) => {
  $(document).on('click', element, function () {
    // data id attr 
    const id = $(this).attr('data-id')
    // isSaved boolean
    const isSaved = $(this).attr('isSaved')
    // row id so that I can remove it on click
    const thisRow = $(`#row-${id}`);
    // remove the article on click
    $(thisRow).remove();

    $.ajax({
      method: 'PUT',
      url: `/${url}/${id}`
    })
      .then(function (data) {
        console.log(data);
        document.location.href = path;
      })
  });
}


// above function invocations 
changeSaved('#save-btn', 'api/headlines/saved', '/');
changeSaved('#delete-saved', 'api/headlines/saved/delete-saved', '/saved');

// get all articles where isSaved property is true on 'saved articles' button onclick
$(document).on('click', '#saved-articles-btn', function () {
  $.ajax({
    method: 'GET',
    url: '/saved'
  }).then(function () {
    document.location.href = '/saved';

  })
});


//  clear out the divs on clear button onclick 
$(document).on('click', '#clear-all-btn', function () {
  $('#articles-row').empty()
  $.ajax({
    method: 'DELETE',
    url: '/api/headlines/clear-all'
  }).then(function () {
    document.location.href = '/';
  })
});

// get the values of each comment input 
$(document).on('click', '#comment-submit-btn', function () {
  const id = $(this).attr('data-id');
  const name = $(`#name-${id}`).val().trim();
  const comment = $(`#comment-${id}`).val().trim();
  console.log(`${name} says '${comment}'`);
  console.log('id', id)
  $.ajax({
    method: 'POST',
    url: `api/comment/post/${id}?name=${name}&comment=${comment}`
  }).then(function () {
    document.location.href = '/saved'

  })
});


// delete comment 
$(document).on('click', '#delete-comment-btn', function () {
  const id = $(this).attr('data-id');
  console.log('id', id)

  $(`#comment-${id}`).empty();
  $.ajax({
    method: 'DELETE',
    url: `/api/comment/delete/${id}`
  }).then(function () {
    document.location.href = '/saved';
  })
})

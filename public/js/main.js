$(function() {

  $('#api-test').click(function(e) {
    var apiTestVal = $('#basic-url').val();
    console.log(apiTestVal);
    sendQuery('http://localhost:8080/api/' + apiTestVal);
    e.preventDefault();
  });

  $('.link-try-api').click(function(e) {
    var apiPreviewVal = $(this).html();
    console.log('Setting input field to: "' + apiPreviewVal +'"');
    $('#basic-url').val(apiPreviewVal);
    e.preventDefault();
  });

  var sendQuery = function(query) {

    $.getJSON( query, function(data) {
      data = JSON.stringify(data);
      console.log(data);
      $('#api-response').val(data);
    });

  }

});

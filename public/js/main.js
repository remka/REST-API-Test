$(function() {

  $('#api-test').click(function(e) {
    var apiTestVal = $('#basic-url').val();
    console.log(apiTestVal);
    e.preventDefault();
  });

  $('.link-try-api').click(function(e) {
    var apiPreviewVal = $(this).html();
    console.log('Setting input field to: "' + apiPreviewVal +'"');
    $('#basic-url').val(apiPreviewVal);
    e.preventDefault();
  });

});

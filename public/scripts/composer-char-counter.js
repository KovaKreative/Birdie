const MAX_CHARACTERS = 140;

$(document).ready(function() {

  const counter = $('.counter[name=counter]');
  const newTweetInput =  $('.new-tweet textarea');

  newTweetInput.on('input', function() {
    const charLength = $(this).val().length;
    counter.val(MAX_CHARACTERS - charLength);
    
    if(counter.val() < 0) {
      counter.addClass('red-text');
    } else {
      counter.removeClass('red-text');
    }
  });

});
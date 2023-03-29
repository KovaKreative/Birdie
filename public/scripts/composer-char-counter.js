const MAX_CHARACTERS = 140;

$(document).ready(function() {

  const counter = $('.counter[name=counter]');
  const newTweetInput =  $('.new-tweet textarea');

  const countCharacters = function(inputField) {
    const charLength = $(inputField).val().length;
    counter.val(MAX_CHARACTERS - charLength);
    
    if(counter.val() < 0) {
      counter.addClass('red-text');
    } else {
      counter.removeClass('red-text');
    }
  };

  countCharacters(newTweetInput);

  newTweetInput.on('input', function() {
    countCharacters(this);
  });

});
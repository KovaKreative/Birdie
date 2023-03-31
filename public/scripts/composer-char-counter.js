const MAX_CHARACTERS = 140;

$(document).ready(function() {

  const $wordCounter = $('.counter[name=counter]');
  const $newTweetInput =  $('.new-tweet textarea');

  const countCharacters = function(inputField) {
    const charLength = $(inputField).val().length;
    $wordCounter.val(MAX_CHARACTERS - charLength);
    
    if($wordCounter.val() < 0) {
      $wordCounter.addClass('red-text');
    } else {
      $wordCounter.removeClass('red-text');
    }
  };

  countCharacters($newTweetInput);

  $newTweetInput.on('input', function() {
    countCharacters(this);
  });

});
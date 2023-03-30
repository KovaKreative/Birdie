$(document).ready(function() {
  const newTweet = $('.new-tweet');
  const postError = $('#post-error');
  const goUpButton = $('#go-up');
  const navButton = $('#call-to-action');

  /* 
   * The following three lines hide the slide out elements.
   * Initially, the new tweet element also has a class called 'hidden',
   * which prevents it from momentarily showing up for a split second right when the page loads.
   */
  postError.hide();
  newTweet.hide();
  goUpButton.hide();

  newTweet.removeClass('hidden');
  goUpButton.removeClass('hidden');

  $('#call-to-action').click(() => {
    postError.slideUp();
    newTweet.slideToggle(300, () => {
      newTweet.find('textarea').focus();
    });
  });

  goUpButton.click(() => {
    $('html, body').animate({ scrollTop: 80 }, 500, () => {
      newTweet.slideDown(300, () => {
        newTweet.find('textarea').focus();
      });
    });
  });

  $(window).scroll(function() {
    if ($(this).scrollTop() > 500) {
      $('#navbar').addClass('retract');
      goUpButton.fadeIn(200);
      navButton.fadeOut(200);
    }
    if ($(this).scrollTop() < 500) {
      $('#navbar').removeClass('retract');
      goUpButton.fadeOut(200);
      navButton.fadeIn(200);
    }
  });

});
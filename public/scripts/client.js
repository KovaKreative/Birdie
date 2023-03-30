/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// TO DO: Get rid of this
// const tweetData = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png",
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants."
//     },
//     "created_at": 1679860978433
//   },

//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd"
//     },
//     "content": {
//       "text": "Je pense , donc je suis."
//     },
//     "created_at": 1679947378433
//   }
// ];

/**
 * Takes a tweet object and generates an HTML element formatted as a single tweet
 * to be appended to the webpage
 * @param {*} tweetObject 
 * @returns String of HTML
 */
const createTweetElement = function(tweetObject) {
  const { user, content, created_at } = tweetObject;

  let message = document.createElement('p');
  message.appendChild(document.createTextNode(content.text));

  return `<article class="tweet">
            <header>
              <div><img src="${user.avatars}"><span>${user.name}</span></div>
              <h4>${user.handle}</h4>
            </header>
            <p>${message.innerHTML}</p>
            <footer>
              <div>${timeago.format(created_at)}</div>
                <div>
                  <a href="#"><i class="fa-solid fa-flag"></i></a>
                  <a href="#"><i class="fa-solid fa-retweet"></i></a>
                  <a href="#"><i class="fa-solid fa-heart"></i></a><span class="heart-counter">1</span>
                </div>
              </footer>
            </article>`;
};

/**
 * Takes in an array of tweet objects and prepends them onto the webpage
 * to display all the tweets with most recent ones being higher up.
 * @param {Array} data 
 */
const renderTweets = function(data) {
  let tweets = data;
  // tweets.sort((a, b) => {
  //   const output = 0 + (b.created_at > a.created_at) - (a.created_at > b.created_at);
  //   return output;
  // });
  tweets.forEach(x => {
    $('#tweet-feed').prepend(createTweetElement(x));
  });
};

/**
 * Takes in an array of tweet objects and prepends only the most recent one on top of
 * the main tweet feed.
 * @param {Array} data 
 */
const renderNewTweet = function(data) {
  let tweet = data[data.length - 1];
  $('#tweet-feed').prepend(createTweetElement(tweet));
};

/**
 * Performs an AJAX GET request and fetches an array of tweet objects from the
 * server, which it then passes into the callback.
 * @param {Function} callback 
 */
const loadTweets = function(callback) {
  $.get('/tweets', { method: 'GET ' }).then(function(data) {
    callback(data);
  });
};

$(document).ready(function() {
  const COOLDOWN_TIME = 10000;
  let coolDown = null;
  const newTweet = $('.new-tweet');
  const postError = $('#post-error');

  loadTweets(renderTweets);
  
  newTweet.find('form').submit(function(event) {
    event.preventDefault();
    let error = null;
    const textBox = $('#tweet-text');
    const tweetText = textBox.val();

    const tooSoonToTweet = COOLDOWN_TIME - (Date.now() - coolDown);
    if (tooSoonToTweet > 0) {
      error = `You can only post a new tweet every ${COOLDOWN_TIME / 1000} seconds. Please wait ${Math.ceil(tooSoonToTweet / 1000)} seconds.`;
    }

    if (tweetText.length <= 0) {
      error = "You cannot tweet an empty message, please type something.";
    }

    if (tweetText.length > MAX_CHARACTERS) {
      error = "You exceeded your max character allotment. Please shorten your message.";
    }

    postError.slideUp(100, () => {
      postError.html(`<i class="fa-solid fa-triangle-exclamation"></i> ${error} <i class="fa-solid fa-triangle-exclamation"></i>`);
    });

    if (error) {
      postError.slideDown(200);
      return;
    }

    coolDown = Date.now();

    const body = $(this).serialize();
    $.ajax('/tweets/', { method: 'POST', data: body })
      .then(() => {
        textBox.val('').trigger('input');
        loadTweets(renderNewTweet);
      });
  });
});
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const tweetData = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants."
    },
    "created_at": 1679860978433
  },
  {
    "user": {
      "name": "Ajax",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@sonOfDod"
    },
    "content": {
      "text": "If they made tugboats bigger, they could be the boats other boats tug."
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis."
    },
    "created_at": 1679947378433
  }
];

const generateTimeStamp = function(dateBefore, dateAfter) {
  const seconds = (dateAfter - dateBefore) / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;
  const months = days / 356;
  const years = months / 12;

  if (years >= 1) {
    const output = Math.round(years);
    return output + (output > 1 ? " Years" : " Year") + " Ago";
  }

  if (months >= 1) {
    const output = Math.round(months);
    return output + (output > 1 ? " Months" : " Month") + " Ago";
  }

  if (days >= 1) {
    const output = Math.round(days);
    return output + (output > 1 ? " Days" : " Day") + " Ago";
  }

  if (hours >= 1) {
    const output = Math.round(hours);
    return output + (output > 1 ? " Hours" : " Hour") + " Ago";
  }

  if (minutes >= 1) {
    const output = Math.round(minutes);
    return output + (output > 1 ? " Minutes" : " Minute") + " Ago";
  }

  return "Just Now";

};

const createTweetElement = function(tweetObject) {
  const { user, content, created_at } = tweetObject;
  return `<article class="tweet">
            <header>
              <div><img src="${user.avatars}"><span>${user.name}</span></div>
              <h4>${user.handle}</h4>
            </header>
            <p>${content.text}</p>
            <footer>
              <div>${generateTimeStamp(created_at, Date.now())}</div>
                <div>
                  <a href="#"><i class="fa-solid fa-flag"></i></a>
                  <a href="#"><i class="fa-solid fa-retweet"></i></a>
                  <a href="#"><i class="fa-solid fa-heart"></i></a><span class="heart-counter">1</span>
                </div>
              </footer>
            </article>`;
};

const renderTweets = function(data) {
  let tweets = data;
  tweets.sort((a, b) => {
    const output = 0 + (b.created_at > a.created_at) - (a.created_at > b.created_at);
    return output;
  });
  tweets.forEach(x => {
    $('#tweet-feed').append(createTweetElement(x));
  });
};

$('#new-tweet-form').submit(function(event) {
  event.preventDefault();
  const body = $(this).serialize();
  $.ajax('/tweets/', { method: 'POST', data: body });
});

$(document).ready(function() {


  renderTweets(tweetData);
});
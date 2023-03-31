/**
 * Animate the arrow in the call of action to bob up and down
 */
const bobArrows = function() {
  $('#call-to-action i')
    .animate({ 'padding-top': '0px', 'padding-bottom': '20px' }, 500)
    .animate({ 'padding-top': '20px', 'padding-bottom': '0px' }, 500, bobArrows);
};

$(document).ready(function() {

  bobArrows();

});
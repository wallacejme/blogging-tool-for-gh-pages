$(document).ready(function () {
  
  'use strict';

  var c, 
      currentScrollTop = 0,
      navbar = $('nav');

  $(window).scroll(function () {
    var a = $(window).scrollTop();
    var b = navbar.height();
    
    currentScrollTop = a;
    
    if (c < currentScrollTop && a > b + b) {
      navbar.addClass("scrollUp");
    } else if (c > currentScrollTop && !(a <= b)) {
      navbar.removeClass("scrollUp");
    }
    
    c = currentScrollTop;
  });

  $('button#navbarMenuIcon').click(function(element, a1, a2, a3) {    
    $('nav').toggleClass('expanded');

    const menuIcon = $(this).children('i').first();
    if(menuIcon.text() == 'menu'){
      menuIcon.text('close');
      menuIcon.removeClass('shrinking-menu');
      menuIcon.addClass('expanding-menu');
    }
    else {
      menuIcon.removeClass('expanding-menu');
      menuIcon.addClass('shrinking-menu');
      menuIcon.text('menu');
    }
  });

  $( 'a, button' ).click(function () {
    $(this).blur();
  })
  
});
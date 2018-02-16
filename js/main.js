$(document).ready(function () {
  
  'use strict';

  /*
   * Detects page scrolling & show/hide navbar accordingly.
   */
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

  /*
   * Expand/collapse navbar through interation with menu icon.
   */
  $('button#navbarMenuIcon').click(function() {    
    $('nav').toggleClass('expanded');

    const menuIcon = $(this).children('i').first();
    if(menuIcon.text() == 'menu'){
      menuIcon.text('close');
      menuIcon.addClass('rotate--clockwise--90deg');
    }
    else {
      menuIcon.removeClass('rotate--clockwise--90deg');
      menuIcon.text('menu');
    }
  });

  /*
   * Collapse navbar if other page elements are clicked.
   */
  $(':not(html, body, #pageHeader, #pageHeader *)').click(function() {
    console.log($(this));
    $('nav').removeClass('expanded');
    const menuIcon = $('button#navbarMenuIcon').children('i').first();
    menuIcon.removeClass('rotate--clockwise--90deg');
    menuIcon.text('menu');
  });

  /*
   * Automatically remove focus after clicking on buttons & links.
   */
  $( 'a, button' ).click(function () {
    $(this).blur();
  });

});
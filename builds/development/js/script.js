$(document).ready(function(){
   var navOffset = $('nav').offset().top;

   $(window).scroll(function(){
    var scrollPos = $(window).scrollTop();
        if (scrollPos >= navOffset) {
            $('nav').addClass('fixed');
        } else {
            $('nav').removeClass('fixed');
        }
   });


    $(function() {
      $('.navbar a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html,body').animate({
              scrollTop: target.offset().top-50
            }, 1000);
            return false;
          }
        }
      });
    });



});
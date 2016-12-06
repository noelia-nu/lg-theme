(function ($) {
  'use strict';
	var	scrolling = false;
	var contentSections = $( '.cd-section' ),
		verticalNavigation = $( '.cd-vertical-nav' ),
		navigationItems = verticalNavigation.find( 'a' ),
		navTrigger = $( '.cd-nav-trigger' ),
    currentSection = 'section1',
    currentScrollPos = 0,
    $bd = $( 'body' ),
    $cpHeader = $( '#cp-header' ),
		scrollArrow = $( '.cd-scroll-down' ),
    $mobileMenu = $( '#cbp-spmenu-s1' ),
    animationName = 'animated fadeInUp',
    animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

  function addAnimation(section) {
    var time = 0, t = 0;
    $('#'+section+' .content-wrapper').children().each(function(i, el) {
      $(this).delay(time).addClass(animationName);
      time = 600 + ( i * 200 );
    }).find('.Started__item').each(function(i, el) {
      $(this).delay(t).addClass(animationName).fadeIn();
      t = 600 + ( i * 200 );
    });
  }

  function removeAnimation(section) {
    $('#'+section+' .content-wrapper').children().each(function() {
      $(this).removeClass(animationName);
    });

    $('#'+section+' .content-wrapper .Started__container').find('.Started__item').each(function() {
      $(this).removeClass(animationName).hide();
    });
  }

  function updateSections() {
    var windowHeight = $(window).height(),
      halfWindowHeight = windowHeight/2,
      scrollTop = $(window).scrollTop();

    contentSections.each(function(){
      var section = $(this),
        sectionId = section.attr('id'),
        navigationItem = navigationItems.filter('[href^="#'+ sectionId +'"]');

        if ((section.offset().top - halfWindowHeight < scrollTop ) && ( section.offset().top + section.height() - halfWindowHeight > scrollTop)) {
          navigationItem.addClass('active');
          addAnimation(sectionId);
        } else {
          navigationItem.removeClass('active');
          removeAnimation(sectionId);
        }

        if ( (section.offset().top - 50 < scrollTop ) && ( section.offset().top + section.height() - 50 > scrollTop) ) {
          if (currentSection !== sectionId) {
            currentSection = sectionId;

            if (sectionId === 'section1') {
              $cpHeader.addClass('_background--dark');
            } else {
              $cpHeader.removeClass('_background--dark');
            }
          }
        }
    });
    scrolling = false;

    $mobileMenu.removeClass('cbp-spmenu-open' );

    if (currentScrollPos >= scrollTop && scrollTop !== 0) {
      $bd.removeClass('_scrolling--down').addClass('_scrolling--up');
    } else {
      if(scrollTop > 0){
        $bd.removeClass('_scrolling--up').addClass('_scrolling--down');
      } else {
        $bd.removeClass('_scrolling--up _scrolling--down');
      }
    }
    currentScrollPos = scrollTop;
  }

  function checkScroll() {
    if( !scrolling ) {
      scrolling = true;

      if (!window.requestAnimationFrame) {
        setTimeout(updateSections, 300);
      } else {
        window.requestAnimationFrame(updateSections);
      }
    }
  }

  function smoothScroll(target) {
    $('body,html').animate(
      {'scrollTop':target.offset().top},
      300
    );
  }

	$(window).on('scroll', checkScroll);

	//smooth scroll to the selected section
	verticalNavigation.on('click', 'a', function(event){
    event.preventDefault();
    smoothScroll($(this.hash));
    verticalNavigation.removeClass('open');
  });

  //smooth scroll to the second section
  scrollArrow.on('click', function(event){
  	event.preventDefault();
    smoothScroll($(this.hash));
  });

	// open navigation if user clicks the .cd-nav-trigger - small devices only
  navTrigger.on('click', function(event){
  	event.preventDefault();
  	verticalNavigation.toggleClass('open');
  });

  $('#cp-menu--mobile').click(function(){
    $mobileMenu.toggleClass('cbp-spmenu-open' );
  });

  $('._animate--selector').css('opacity', 0);
  $('.Started__item').hide();
  $(document).ready(function(){
    addAnimation('section1');
  });
})(jQuery);
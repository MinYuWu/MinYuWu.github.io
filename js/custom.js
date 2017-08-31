jQuery(document).ready(function ($) {
    // Preloader
    $(window).on('load', function () {
        $('#preloader').delay(100).fadeOut('slow', function () {
            $(this).remove();
        });
    });
    // Hero rotating texts
    $("#hero .rotating").Morphext({
        animation: "flipInX"
        , separator: ","
        , speed: 3000
        , zIndex: '1'
    });
    // Initiate the wowjs
    new WOW().init();
    // Initiate superfish on nav menu
    $('.nav-menu').superfish({
        animation: {
            opacity: 'show'
        }
        , speed: 400
    });
    // Mobile Navigation
    if ($('#nav-menu-container').length) {
        var $mobile_nav = $('#nav-menu-container').clone().prop({
            id: 'mobile-nav'
        });
        $mobile_nav.find('> ul').attr({
            'class': ''
            , 'id': ''
        });
        $('body').append($mobile_nav);
        $('body').prepend('<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>');
        $('body').append('<div id="mobile-body-overly"></div>');
        $('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>');
        $(document).on('click', '.menu-has-children i', function (e) {
            $(this).next().toggleClass('menu-item-active');
            $(this).nextAll('ul').eq(0).slideToggle();
            $(this).toggleClass("fa-chevron-up fa-chevron-down");
        });
        $(document).on('click', '#mobile-nav-toggle', function (e) {
            $('body').toggleClass('mobile-nav-active');
            $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
            $('#mobile-body-overly').toggle();
        });
        $(document).click(function (e) {
            var container = $("#mobile-nav, #mobile-nav-toggle");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                if ($('body').hasClass('mobile-nav-active')) {
                    $('body').removeClass('mobile-nav-active');
                    $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
                    $('#mobile-body-overly').fadeOut();
                }
            }
        });
    }
    else if ($("#mobile-nav, #mobile-nav-toggle").length) {
        $("#mobile-nav, #mobile-nav-toggle").hide();
    }
    
    
    // Stick the header at top on scroll
    $("#header").sticky({
        topSpacing: 0
        , zIndex: '50'
    });
    // Smooth scroll on page hash links
    $('a[href*="#"]:not([href="#"])').on('click', function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            if (target.length) {
                var top_space = 0;
                if ($('#header').length) {
                    top_space = $('#header').outerHeight();
                }
                $('html, body').animate({
                    scrollTop: target.offset().top - top_space
                }, 1500, 'easeInOutExpo');
                if ($(this).parents('.nav-menu').length) {
                    $('.nav-menu .menu-active').removeClass('menu-active');
                    $(this).closest('li').addClass('menu-active');
                }
                if ($('body').hasClass('mobile-nav-active')) {
                    $('body').removeClass('mobile-nav-active');
                    $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
                    $('#mobile-body-overly').fadeOut();
                }
                return false;
            }
        }
    });
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        }
        else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 1500, 'easeInOutExpo');
        return false;
    });
    // Produces width of .barChart
    // 目前捲動深度 
    $(window).on('scroll.number', function (e) {
        // 如果捲動深度達到到100px 
        var $current_top = $(this).scrollTop();
        if ($current_top > 1800) {
            // 執行js code here 
            $(document).ready(function () {
                $('.graph-bar').each(function () {
                    var dataWidth = $(this).data('value');
                    $(this).css("width", dataWidth + "%");
                });
            });
            // 關閉捲動偵測，避免重複觸發 (option)
            $(window).off('scroll.number')
        }
    })
    
    // Header navagation
    var heightOfNavBar = 100;
    var top1 = $('#about').offset().top - heightOfNavBar - 30;
    var top2 = $('#experience').offset().top - heightOfNavBar;
    var top3 = $('#skills').offset().top - heightOfNavBar;
    var top4 = $('#portfolio').offset().top - heightOfNavBar;
    var top5 = $('#contact').offset().top - heightOfNavBar - 10;
    $(window).scroll(function () {
        var scrollPos = $(window).scrollTop();
        if($(window).width()>768){
        if (scrollPos < top1) {
            $('.menu').css('color', '#fff');
        }
        if (scrollPos >= top1 && scrollPos < top2) {
            $('.menu').css('color', '#fff');
            $('a[href$="#about"]').css('color', '#03C4EB');
        }
        else if (scrollPos >= top2 && scrollPos < top3) {
            $('.menu').css('color', '#fff');
            $('a[href$="#experience"]').css('color', '#03C4EB');
        }
        else if (scrollPos >= top3 && scrollPos < top4) {
            $('.menu').css('color', '#fff');
            $('a[href$="#skills"]').css('color', '#03C4EB');
        }
        else if (scrollPos >= top4 && scrollPos < top5) {
            $('.menu').css('color', '#fff');
            $('a[href$="#portfolio"]').css('color', '#03C4EB');
        }
        else if (scrollPos >= top5) {
            $('.menu').css('color', '#fff');
            $('a[href$="#contact"]').css('color', '#03C4EB');
        }
        }
    });
    
    
    //contact form
    $("form").submit(function (){
        if($('#name').val() == '' || $('#email').val() == '' || $('#subject').val() == '' || $('#message').val() == '') {
            $('#errormessage').show();
            $('#sendmessage').hide(); 
        } 
        else {
            $('#sendmessage').show();  
            $('#errormessage').hide();    
        }
        return false;     
    });
    

    
});
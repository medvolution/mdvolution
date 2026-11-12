/*
 * Navigation, section switching and projects carousel for the landing pages.
 * Written for this project. Requires jQuery and Slick.
 */

(function ($) {
    'use strict';

    var projectsCarousel = null;

    // Carousel breakpoints (px) and how many cards show at each one.
    var CAROUSEL_SETTINGS = {
        slidesToShow: 5,
        slidesToScroll: 3,
        dots: true,
        arrows: false,
        responsive: [
            {
                breakpoint: 992,
                settings: { slidesToShow: 4, slidesToScroll: 4, infinite: true, dots: true }
            },
            {
                breakpoint: 767,
                settings: { slidesToShow: 3, slidesToScroll: 3 }
            },
            {
                breakpoint: 575,
                settings: { slidesToShow: 2, slidesToScroll: 2 }
            }
        ]
    };

    function closeMenu() {
        $('.navbar-collapse').removeClass('show');
    }

    function highlightMenu(pageNo) {
        var $items = $('.navbar .navbar-nav > .nav-item');
        $items.removeClass('selected');
        $items
            .find('> .nav-link[data-no="' + pageNo + '"]')
            .parent()
            .addClass('selected');
    }

    function buildCarousel() {
        projectsCarousel = $('.gallery-slider').slick(CAROUSEL_SETTINGS);
    }

    function showSection(pageNo) {
        // The projects carousel is rebuilt each time its section opens, so
        // slide widths are recalculated after the section becomes visible.
        if (pageNo === 2) {
            if (projectsCarousel) {
                $('.gallery-slider').slick('unslick');
            }
            buildCarousel();
        }

        $('.cd-hero-slider li').hide();
        $('.cd-hero-slider li[data-page-no="' + pageNo + '"]').fadeIn();
    }

    $(window).on('load', function () {
        $('body').addClass('loaded');
        showSection(1);
    });

    $(function () {
        $('.tm-page-link').on('click', function () {
            var pageNo = $(this).data('page-no');
            showSection(pageNo);
            highlightMenu(pageNo);
        });

        $('.navbar .navbar-nav > .nav-item > a.nav-link').on('click', function () {
            var pageNo = $(this).data('no');
            // Links without a section number (language, HYDRA) navigate normally.
            if (pageNo === undefined) {
                return;
            }
            showSection(pageNo);
            highlightMenu(pageNo);
            closeMenu();
        });

        $('html').on('click', function () {
            closeMenu();
        });
    });
})(jQuery);

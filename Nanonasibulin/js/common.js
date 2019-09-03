$(function() {
	//! Vars
	let paused = false;
	// Header
	const burgerBtn = $("header .burger-btn");
	const navMenu = $(".header-menu");
	// Home
	const sliderInfo = $(".slider");
	const currentSlideIndex = $(".current-index");
	const totalSlides = $(".total-slides");
	const leftBtn = $(".left-btn");
	const rightBtn = $(".right-btn");
	const pauseBtn = $(".pause-btn");
	// Research
	const tab = $(".tabs .tab");
	const tabContent = $(".tab-contents .item");
	const boxItem = $(".research-areas .box .box-item");
	// Gallery
	const gallerySlider = $(".gallery-slider");
	const scaleImgBtn = $(".scale-img");
	const closeBtn = $(".scaled-img .close-btn");
	const imgNavItem = $(".gallery-img-nav .item");

	let skolkovoLocation = {
		lat: 55.741245300808686, 
		lng: 37.51009225845337
	}
	// Google maps
    let map = new google.maps.Map(document.getElementById('map-block'), {
      center: skolkovoLocation,
      zoom: 8,
      streetViewControl: false,
      styles: [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dadada"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#1b3f5a"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  }
]
    });

    let marker = new google.maps.Marker({position: skolkovoLocation, map: map});

	// Hover to box items
	boxItem.hover(function () {
		$(this).children(".tooltip").stop(false, true).fadeIn();
	}, function () {
		$(this).children(".tooltip").stop(false, true).fadeOut();
	});

	// Clicking to tab buttons
	tab.on("click", function() {
		tab.removeClass("active").eq($(this).index()).addClass("active");
		tabContent.removeClass("active").eq($(this).index()).addClass("active");
	});

	// Image nav item
	imgNavItem.on("click", function() {
		$(this).closest(".gallery-img-nav").find(".item").removeClass("active");
		$(this).addClass("active");
		$(this).closest(".gallery-img-nav").next().slick("slickGoTo", $(this).index());
	});

	$(".gallery-img-nav").next().on("afterChange", function(){
		$(this).prev().find(".item").removeClass("active").eq($(this).slick("slickCurrentSlide")).addClass("active");
	});

	// Close scaled image
	closeBtn.on("click", function(){
		$(this).closest(".scaled-img").removeClass("active");
	});

	// Scale image button
	scaleImgBtn.on("click", function() {
		let equalizer;
		if ($(window).width() > 996) {
			equalizer = 2;
		} else {
			equalizer = 1;
		}

		$(this).closest(".container").prev().find(".scaled-img").eq($(this).closest(".gallery-slide").index() - equalizer).addClass("active");	
		
	});

	// Gallery slider
	gallerySlider.slick({
		zIndex: 111,
		centerMode: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		infinite: true,
	  arrows: false,
	  variableWidth: true,
	centerPadding: '100px',
	autoplay: true,
	focusOnSelect: true,
	speed: 800,
	responsive: [
	{
		breakpoint: 991,
		settings: {
			variableWidth: false,
			centerPadding: '0px',
			centerMode: false
		}
	}
	]
	})

	// Slider
	sliderInfo.slick({
		zIndex: 111,
	  slidesToShow: 1,
	  slidesToScroll: 1,
	  infinite: true,
	  arrows: false,
	  autoplay: true
	});

	// Counter for slider
	currentSlideIndex.html("1");

	// Total slides
	totalSlides.each(function(index, value) {
		$(this).html($(this).closest(".slide-nav").prev().find(".slick-slide:not(.slick-cloned)").length);
	});

	// On after change event
	$(".slick-slider").on("afterChange", function() {
		let currentSlideNum = $(this).slick("slickCurrentSlide") + 1;
		$(this).next().find(".current-index").html(currentSlideNum);
	})

	// left click btn 
	leftBtn.on("click", function() {
		$(this).closest(".slide-nav").prev().slick("slickPrev");
	});

	// right click btn
	rightBtn.on("click", function() {
		$(this).closest(".slide-nav").prev().slick("slickNext");
	});

	// Pause slider
	pauseBtn.on("click", function() {
		let pausedSlider = $(this).closest(".slide-nav").prev();

		if(!paused) {
			pausedSlider.slick("slickPause");
			$(this).html('<i class="fas fa-caret-right"></i>');
			paused = true;
		} else {
			pausedSlider.slick("slickPlay");
			$(this).html('<i class="fas fa-pause"></i>');
			paused = false;
		}
	});

	// nav-menu while resizing 
	$(window).on("resize", function () {
		if ($(this).width() >= 992) {
			burgerBtn.removeClass("on");
			navMenu.css("display", "flex");
		} else {
			burgerBtn.removeClass("on");
			navMenu.css("display", "none");
		}
	});

	$(document.body).on("click", function (params) {
		if ($(window).width() <= 1200) {
			burgerBtn.removeClass("on");
			// header
			navMenu.slideUp(150);
		}
	});

	navMenu.on("click", function (e) {
		e.stopPropagation();
	});

	burgerBtn.on("click", function(e) {
		e.stopPropagation();
		$(e.currentTarget).toggleClass("on");
		navMenu.slideToggle().css("display", "flex");
	});

});

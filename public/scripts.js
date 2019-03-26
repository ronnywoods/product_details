$(document).ready(() => {
  if($('.carousel-inner .carousel-item:first').hasClass('active')) {
    $('#carouselLikes').children('carousel-control-prev').hide();
    $('#carouselLikes').children('carousel-control-next').show();
  } else if ($('.carousel-inner .carousel-item:last').hasClass('active')) {
    $('#carouselLikes').children('carousel-control-next').hide();
    $('#carouselLikes').children('carousel-control-prev').show();
  } else {
    $('#carouselLikes').children('carousel-control').show();
  }
})

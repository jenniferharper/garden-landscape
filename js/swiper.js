var swiper = new Swiper('.swiper', {
  slidesPerView: 1,
  spaceBetween: 20,
  loop: true,
  autoplay: {
    delay: 6000,
    disableOnInteraction: false, // Keeps autoplay running after user clicks
    pauseOnMouseEnter: true, // This is the "pause on hover" fix
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
})

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('year').textContent = new Date().getFullYear()
})

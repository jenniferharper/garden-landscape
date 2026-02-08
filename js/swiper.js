var swiper = new Swiper('.swiper', {
  slidesPerView: 1,
  spaceBetween: 20,
  loop: true,
  autoplay: {
    delay: 6000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
})

document.addEventListener('DOMContentLoaded', function () {
  // Update year
  const yearEl = document.getElementById('year')
  if (yearEl) yearEl.textContent = new Date().getFullYear()

  //handle copy email
  const emailLinks = document.querySelectorAll('.email-link')
  emailLinks.forEach((link) => {
    link.addEventListener('copy', function (e) {
      // Prevent the default copy behavior (which includes mailto:)
      e.preventDefault()

      // Get the actual visible text of the link
      const cleanEmail = link.innerText || link.textContent

      // Manually push the clean text to the clipboard
      if (e.clipboardData) {
        e.clipboardData.setData('text/plain', cleanEmail)
      }
    })
  })

  // Handle multiple contact links
  ;(function () {
    const contactLinks = document.querySelectorAll('.contact-link')
    const phoneNum = '6421123456789'
    const isMobile = window.innerWidth < 768

    contactLinks.forEach((link) => {
      if (isMobile) {
        link.addEventListener('click', function (e) {
          e.preventDefault()

          // Use the Universal Link for better compatibility
          const whatsappUrl = `https://wa.me/${phoneNum}`
          const telUrl = `tel:${phoneNum}`

          // 1. Try to open WhatsApp
          window.location.href = whatsappUrl

          // 2. Fail-over timer: If the browser is still focused after 500ms,
          // it means the WhatsApp app didn't hijack the request.
          setTimeout(function () {
            if (document.hasFocus()) {
              window.location.href = telUrl
            }
          }, 500)
        })
      } else {
        // Desktop: Completely disable interaction
        link.href = '#'
        link.style.cursor = 'default' // Just in case CSS isn't loaded
        link.addEventListener('click', (e) => e.preventDefault())
      }
    })
  })()
})

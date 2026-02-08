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

  // Handle copy email
  const emailLinks = document.querySelectorAll('.email-link')
  emailLinks.forEach((link) => {
    link.addEventListener('copy', function (e) {
      e.preventDefault()
      const cleanEmail = link.innerText || link.textContent
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
        // A11y: Tell screen readers what this link does
        link.setAttribute('aria-label', `Chat on WhatsApp or call ${phoneNum}`)

        link.addEventListener('click', function (e) {
          e.preventDefault()

          const whatsappUrl = `https://wa.me/${phoneNum}`
          const telUrl = `tel:${phoneNum}`

          // 1. Try to open WhatsApp
          window.location.href = whatsappUrl

          // 2. Fail-over timer
          setTimeout(function () {
            if (document.hasFocus()) {
              window.location.href = telUrl
            }
          }, 500)
        })
      } else {
        // Desktop: Completely disable interaction and hide from screen readers
        link.href = '#'
        link.style.cursor = 'default'
        link.setAttribute('tabindex', '-1') // Prevents keyboard focus
        link.setAttribute('aria-hidden', 'true') // Hides from screen readers
        link.addEventListener('click', (e) => e.preventDefault())
      }
    })
  })()
})

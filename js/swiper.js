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

  // --- Handle copy email ---
  const emailLinks = document.querySelectorAll('.email-link')

  emailLinks.forEach((link) => {
    // 1. Handle Manual Copy (Long-press/Selection -> Copy)
    link.addEventListener('copy', (e) => {
      const cleanEmail = link.textContent.trim()
      if (e.clipboardData) {
        e.clipboardData.setData('text/plain', cleanEmail)
        e.preventDefault()
      }
    })

    // 2. Handle Click/Tap (Copied feedback + trigger mailto)
    link.addEventListener('click', function (e) {
      const cleanEmail = link.textContent.trim()

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(cleanEmail)
      }

      // Visual feedback
      link.classList.add('copied')
      setTimeout(() => link.classList.remove('copied'), 2000)
    })
  })

  // --- Handle WhatsApp/Contact Links ---
  // We've removed the desktop restriction so WhatsApp works everywhere
  const contactLinks = document.querySelectorAll('.contact-link')
  const phoneNum = '6421123456789'

  contactLinks.forEach((link) => {
    // A11y: Standard label for all platforms
    link.setAttribute('aria-label', `Contact us on WhatsApp at ${phoneNum}`)

    // Ensure it's interactive
    link.removeAttribute('inert')
    link.setAttribute('tabindex', '0')
    link.style.cursor = 'pointer'

    // We no longer need the 'if (isMobile)' failover logic.
    // The link in your HTML (https://wa.me/...) will now work natively.
    // If you want to keep the "automatic phone call" failover on mobile only:
    link.addEventListener('click', function (e) {
      if (window.innerWidth < 768) {
        // Optional mobile-only behavior: try WhatsApp, then phone
        const whatsappUrl = `https://wa.me/${phoneNum}`
        const telUrl = `tel:${phoneNum}`

        window.location.href = whatsappUrl

        setTimeout(function () {
          if (document.hasFocus()) {
            window.location.href = telUrl
          }
        }, 1000) // Slightly longer delay to allow Desktop app prompts to fire
        e.preventDefault()
      }
      // On Desktop, the default link behavior takes over (opens WhatsApp Web/App)
    })
  })
})

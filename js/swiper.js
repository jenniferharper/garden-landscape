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
  // 1. Update year
  const yearEl = document.getElementById('year')
  if (yearEl) yearEl.textContent = new Date().getFullYear()

  // 2. Handle copy email
  const emailLinks = document.querySelectorAll('.email-link')
  emailLinks.forEach((link) => {
    link.addEventListener('copy', (e) => {
      const cleanEmail = link.textContent.trim()
      if (e.clipboardData) {
        e.clipboardData.setData('text/plain', cleanEmail)
        e.preventDefault()
      }
    })

    link.addEventListener('click', function () {
      const cleanEmail = link.textContent.trim()
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(cleanEmail)
      }
      link.classList.add('copied')
      setTimeout(() => link.classList.remove('copied'), 2000)
    })
  })

  const lightbox = document.getElementById('lightbox')
  // 1. Grab every image on the site tagged with our data attribute
  const globalImages = document.querySelectorAll('img[data-gallery="lightbox"]')

  if (lightbox && globalImages.length > 0) {
    const lightboxWrapper = lightbox.querySelector('.swiper-wrapper')
    const closeBtn = document.getElementById('close-lightbox')

    // 2. Populate the lightbox once with all global images
    globalImages.forEach((img) => {
      img.style.cursor = 'zoom-in'
      const slide = document.createElement('div')
      slide.className = 'swiper-slide flex! items-center justify-center p-4 md:p-12'
      slide.innerHTML = `<img src="${img.src}" class="max-h-[85vh] max-w-[90vw] object-contain shadow-2xl">`
      lightboxWrapper.appendChild(slide)
    })

    // 3. Initialize Swiper
    // We only loop if we have enough images (usually > 3) to prevent that warning
    const shouldLoop = globalImages.length > 3

    const lightboxSwiper = new Swiper('.lightbox-swiper', {
      slidesPerView: 1,
      centeredSlides: true,
      loop: shouldLoop,
      grabCursor: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      keyboard: { enabled: true },
    })

    // 4. Map the clicks
    globalImages.forEach((img, index) => {
      img.addEventListener('click', () => {
        lightbox.classList.remove('opacity-0', 'pointer-events-none')
        lightboxSwiper.update()

        // Use slideToLoop if looping, otherwise standard slideTo
        if (shouldLoop) {
          lightboxSwiper.slideToLoop(index, 0)
        } else {
          lightboxSwiper.slideTo(index, 0)
        }
      })
    })

    // 5. Global Close Logic
    const closeLightbox = () => lightbox.classList.add('opacity-0', 'pointer-events-none')
    if (closeBtn) closeBtn.addEventListener('click', closeLightbox)
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox()
    })
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeLightbox()
    })
  }
})

// --- Handle WhatsApp/Contact Links ---
// We've removed the desktop restriction so WhatsApp works everywhere
//   const contactLinks = document.querySelectorAll('.contact-link')
//   const phoneNum = '6421123456789'

//   contactLinks.forEach((link) => {
//     // A11y: Standard label for all platforms
//     link.setAttribute('aria-label', `Contact us on WhatsApp at ${phoneNum}`)

//     // Ensure it's interactive
//     link.removeAttribute('inert')
//     link.setAttribute('tabindex', '0')
//     link.style.cursor = 'pointer'

//     // We no longer need the 'if (isMobile)' failover logic.
//     // The link in your HTML (https://wa.me/...) will now work natively.
//     // If you want to keep the "automatic phone call" failover on mobile only:
//     link.addEventListener('click', function (e) {
//       if (window.innerWidth < 768) {
//         // Optional mobile-only behavior: try WhatsApp, then phone
//         const whatsappUrl = `https://wa.me/${phoneNum}`
//         const telUrl = `tel:${phoneNum}`

//         window.location.href = whatsappUrl

//         setTimeout(function () {
//           if (document.hasFocus()) {
//             window.location.href = telUrl
//           }
//         }, 1000) // Slightly longer delay to allow Desktop app prompts to fire
//         e.preventDefault()
//       }
//       // On Desktop, the default link behavior takes over (opens WhatsApp Web/App)
//     })
//   })

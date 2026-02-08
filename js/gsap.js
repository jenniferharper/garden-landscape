document.addEventListener('DOMContentLoaded', (event) => {
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)

    // Create a matchMedia object
    let mm = gsap.matchMedia()

    // This condition checks for BOTH:
    // 1. Min-width of 1366px
    // 2. Non-touch device (any-pointer: fine)
    mm.add('(min-width: 1366px) and (any-pointer: fine)', () => {
      console.log('Desktop & Mouse detected: Animation active')
      gsap.from('#work-leaf', {
        scrollTrigger: {
          trigger: '#work-leaf-trigger',
          start: '20% top',
          end: 'bottom bottom',
          scrub: true,
          markers: true,
        },
        y: '-80vh',
        rotate: -120,

        force3D: true,
        // immediateRender: false,
        ease: 'none',
      })
      // Optional: Return a cleanup function if needed
      return () => {
        // This runs when the screen goes below 1366px
        // GSAP automatically reverts the #work-leaf to its CSS state!
      }
    })
  }
})

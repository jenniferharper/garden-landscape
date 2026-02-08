document.addEventListener('DOMContentLoaded', (event) => {
  if (typeof ScrollTrigger !== 'undefined') {
    // Ensure all 3 are registered
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, MorphSVGPlugin)

    let mm = gsap.matchMedia()

    mm.add('(min-width: 1366px) and (any-pointer: fine)', () => {
      const flightTL = gsap.timeline({
        scrollTrigger: {
          trigger: '#bird-trigger',
          id: 'Bird-Animation',
          start: 'center center',
          end: 'top 20%',
          scrub: 1.5,
          //   markers: { id: 'Bird', startColor: 'blue', endColor: 'blue' },
        },
      })

      const totalDuration = 2 // We define a fixed "length" for the timeline
      const totalFlaps = 10
      const flapDuration = totalDuration / totalFlaps // Math to make them fit!

      // 1. Flight Path - Forced to last the 'totalDuration'
      flightTL.from(
        '#bird',
        {
          motionPath: {
            path: [
              { x: 0, y: 0 },
              { x: -100, y: -50 },
              { x: -200, y: 50 },
              { x: -300, y: -50 },
            ],
            curviness: 1.5,
          },
          scale: 0.2,
          duration: totalDuration, // This is the key
          ease: 'none',
        },
        0,
      )

      // 2. Morphing Flaps - Distributed across the same duration
      for (let i = 0; i < totalFlaps; i++) {
        flightTL.to(
          '#bird path',
          {
            morphSVG: '#wing-down-path',
            duration: flapDuration / 2, // Divided by 2 because of yoyo
            yoyo: true,
            repeat: 1,
            ease: 'sine.inOut',
          },
          i * flapDuration,
        ) // Starts each flap at exactly the right interval
      }

      // 3. Leaf Animation
      gsap.from('#work-leaf', {
        scrollTrigger: {
          trigger: '#work-leaf-trigger',
          id: 'Work Leaf',
          start: '20% top',
          end: 'bottom bottom',
          scrub: true,
          //   markers: { startColor: 'orange', endColor: 'orange' },
        },
        y: '-80vh',
        rotate: -120,
        force3D: true,
        ease: 'none',
      })
    })
  }
})

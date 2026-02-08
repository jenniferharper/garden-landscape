document.addEventListener('DOMContentLoaded', (event) => {
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, MorphSVGPlugin)

    let mm = gsap.matchMedia()

    mm.add('(min-width: 1366px) and (any-pointer: fine)', () => {
      // --- BIRD ANIMATION ---
      const flightTL = gsap.timeline({
        scrollTrigger: {
          trigger: '#bird-trigger',
          id: 'Bird-Animation',
          start: 'center center',
          end: 'top 20%',
          scrub: 1.5,
        },
      })

      const totalDuration = 2
      const totalFlaps = 10
      const flapDuration = totalDuration / totalFlaps

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
          duration: totalDuration,
          ease: 'none',
        },
        0,
      )

      for (let i = 0; i < totalFlaps; i++) {
        flightTL.to(
          '#bird path',
          {
            morphSVG: '#wing-down-path',
            duration: flapDuration / 2,
            yoyo: true,
            repeat: 1,
            ease: 'sine.inOut',
          },
          i * flapDuration,
        )
      }

      // --- LEAF ANIMATION ---
      const startPaths = gsap.utils.toArray('#work-leaf path')
      const endPaths = gsap.utils.toArray('#end-leaf path')

      const leafTL = gsap.timeline({
        scrollTrigger: {
          trigger: '#work-leaf-trigger',
          id: 'Work Leaf',
          start: '20% top',
          end: 'bottom bottom',
          scrub: true,
        },
      })

      leafTL.from(
        '#work-leaf',
        {
          y: '-80vh',
          rotate: -120,
          force3D: true,
          ease: 'none',
        },
        0,
      )

      startPaths.forEach((path, i) => {
        // Safety check: only morph if a corresponding end path exists
        if (endPaths[i]) {
          leafTL.to(
            path,
            {
              morphSVG: endPaths[i],
              ease: 'none',
            },
            0,
          )
        }
      })

      // Optional: Cleanup
      return () => {
        flightTL.kill()
        leafTL.kill()
      }
    }) // End mm.add
  } // End ScrollTrigger check
}) // End DOMContentLoaded

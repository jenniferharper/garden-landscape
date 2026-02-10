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

      // --- vine animation ---

      const startPathsVine = gsap.utils.toArray('#start-leaf path')
      const endPathsVine = gsap.utils.toArray('#leaf-end path')
      const vineTL = gsap.timeline({
        scrollTrigger: {
          trigger: '#vine-trigger',
          id: 'start-leaf-animation',
          start: '-20% top',
          end: 'bottom center',
          scrub: 1.5,
        },
      })

      startPathsVine.forEach((path, i) => {
        if (endPathsVine[i]) {
          const isLeaf = path.hasAttribute('fill')
          const isStalk = path.hasAttribute('stroke')

          if (isLeaf) {
            // Morph shape AND change color
            vineTL.to(
              path,
              {
                morphSVG: endPathsVine[i],
                fill: '#6D7A54',
                ease: 'none',
              },
              0,
            )
          } else if (isStalk) {
            // Morph shape but keep it a stroke (no fill)
            vineTL.to(
              path,
              {
                morphSVG: endPathsVine[i],
                fill: 'none', // Force no fill
                stroke: '#9BC349', // Keep original stroke color
                ease: 'none',
              },
              0,
            )
          }
        }
      })

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
          top: '-60%',
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

      // --- vine animation2 ---
      const startPathsVineOther = gsap.utils.toArray('#start-leaf-other path')
      const endPathsVineOther = gsap.utils.toArray('#leaf-end-other path')
      const vineOtherTL = gsap.timeline({
        scrollTrigger: {
          trigger: '#vine-trigger-other',
          id: 'start-leaf-animation-other',
          start: '-20% top',
          end: 'bottom center',
          scrub: 1.5,
        },
      })

      startPathsVineOther.forEach((path, i) => {
        if (endPathsVineOther[i]) {
          const isLeaf = path.hasAttribute('fill')
          const isStalk = path.hasAttribute('stroke')

          if (isLeaf) {
            vineOtherTL.to(
              path,
              {
                morphSVG: endPathsVineOther[i],
                fill: '#6D7A54',
                ease: 'none',
              },
              0,
            )
          } else if (isStalk) {
            // FIX: Changed vineTL to vineOtherTL
            vineOtherTL.to(
              path,
              {
                morphSVG: endPathsVineOther[i],
                fill: 'none',
                stroke: '#9BC349',
                ease: 'none',
              },
              0,
            )
          }
        }
      })

      // Final Cleanup update
      return () => {
        flightTL.kill()
        leafTL.kill()
        vineTL.kill() // Added
        vineOtherTL.kill() // Added
      }
    }) // End mm.add
  } // End ScrollTrigger check
}) // End DOMContentLoaded

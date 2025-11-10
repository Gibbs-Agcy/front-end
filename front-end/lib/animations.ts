/**
 * Animation utilities and helpers
 */

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Create a fade-in animation with ScrollTrigger
 */
export function fadeInOnScroll(
  element: gsap.TweenTarget,
  options?: gsap.TweenVars
) {
  return gsap.fromTo(
    element,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      ...options,
    }
  )
}

/**
 * Create a stagger animation for multiple elements
 */
export function staggerFadeIn(
  elements: gsap.TweenTarget,
  staggerAmount: number = 0.1
) {
  return gsap.fromTo(
    elements,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: staggerAmount,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: elements,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    }
  )
}

/**
 * Parallax effect
 */
export function parallax(element: gsap.TweenTarget, speed: number = 0.5) {
  return gsap.to(element, {
    yPercent: -50 * speed,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  })
}


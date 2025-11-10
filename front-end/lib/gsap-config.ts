'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Observer } from 'gsap/Observer'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, Observer)
}

// PERFORMANS AYARLARI
gsap.defaults({
  ease: 'power2.out',
  duration: 0.6, // Daha hızlı
})

ScrollTrigger.defaults({
  markers: false, // Production'da kapalı
  start: 'top 85%',
  end: 'bottom 15%',
  toggleActions: 'play none none none',
})

// ScrollTrigger config
ScrollTrigger.config({
  limitCallbacks: true,
  syncInterval: 150, // Throttle
})

export const animations = {
  fadeIn: {
    opacity: 0,
    y: 30,
    duration: 0.6,
    ease: 'power2.out',
  },
  fadeInUp: {
    opacity: 0,
    y: 60,
    duration: 0.8,
    ease: 'power3.out',
  },
  fadeInLeft: {
    opacity: 0,
    x: -60,
    duration: 0.6,
    ease: 'power2.out',
  },
  fadeInRight: {
    opacity: 0,
    x: 60,
    duration: 0.6,
    ease: 'power2.out',
  },
  scaleIn: {
    scale: 0,
    opacity: 0,
    duration: 0.5,
    ease: 'back.out(1.4)',
  },
}

export const createScrollTrigger = (
  element: HTMLElement,
  animation: gsap.TweenVars
) => {
  return gsap.from(element, {
    ...animation,
    scrollTrigger: {
      trigger: element,
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
  })
}

export { gsap, ScrollTrigger, Observer }


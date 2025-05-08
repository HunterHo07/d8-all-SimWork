import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface FadeInOptions {
  delay?: number;
  duration?: number;
  y?: number;
  x?: number;
  opacity?: number;
  ease?: string;
  stagger?: number;
  scrollTrigger?: boolean;
}

export function useAnimations() {
  // Fade in animation
  const fadeIn = (
    element: string | Element | Element[] | null,
    options: FadeInOptions = {}
  ) => {
    if (!element) return;
    
    const {
      delay = 0,
      duration = 0.8,
      y = 20,
      x = 0,
      opacity = 0,
      ease = 'power3.out',
      stagger = 0.1,
      scrollTrigger = false
    } = options;

    const tl = gsap.timeline({
      scrollTrigger: scrollTrigger ? {
        trigger: element as Element,
        start: 'top 80%',
        toggleActions: 'play none none none'
      } : undefined
    });

    tl.from(element, {
      y,
      x,
      opacity,
      duration,
      delay,
      ease,
      stagger,
      clearProps: 'all'
    });

    return tl;
  };

  // Reveal text animation (character by character)
  const revealText = (
    element: string | Element | null,
    options: {
      delay?: number;
      duration?: number;
      stagger?: number;
      ease?: string;
    } = {}
  ) => {
    if (!element) return;
    
    const {
      delay = 0,
      duration = 0.5,
      stagger = 0.02,
      ease = 'power2.out'
    } = options;

    // Split text into characters
    const chars = gsap.utils.toArray(element as Element);
    
    const tl = gsap.timeline();
    tl.from(chars, {
      opacity: 0,
      y: 20,
      rotationX: -90,
      duration,
      stagger,
      ease,
      delay
    });

    return tl;
  };

  // Parallax effect
  const parallax = (
    element: string | Element | null,
    options: {
      speed?: number;
      direction?: 'vertical' | 'horizontal';
    } = {}
  ) => {
    if (!element || typeof window === 'undefined') return;
    
    const {
      speed = 0.5,
      direction = 'vertical'
    } = options;

    const prop = direction === 'vertical' ? 'y' : 'x';
    
    ScrollTrigger.create({
      trigger: element as Element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        gsap.to(element, {
          [prop]: `${self.progress * 100 * speed}px`,
          ease: 'none'
        });
      }
    });
  };

  // 3D tilt effect
  const tilt = (
    element: string | Element | null,
    options: {
      max?: number;
      perspective?: number;
      scale?: number;
      speed?: number;
      axis?: 'both' | 'x' | 'y';
    } = {}
  ) => {
    if (!element || typeof window === 'undefined') return;
    
    const {
      max = 15,
      perspective = 1000,
      scale = 1.05,
      speed = 0.3,
      axis = 'both'
    } = options;

    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (!el) return;

    const update = (e: MouseEvent) => {
      const rect = (el as Element).getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      const percentX = (mouseX - centerX) / (rect.width / 2);
      const percentY = -((mouseY - centerY) / (rect.height / 2));
      
      const rotateX = axis === 'both' || axis === 'y' ? percentY * max : 0;
      const rotateY = axis === 'both' || axis === 'x' ? percentX * max : 0;
      
      gsap.to(el, {
        transformPerspective: perspective,
        rotationX: rotateX,
        rotationY: rotateY,
        scale: scale,
        ease: `power${speed}`,
        duration: 0.5
      });
    };

    const resetTilt = () => {
      gsap.to(el, {
        rotationX: 0,
        rotationY: 0,
        scale: 1,
        ease: 'power3.out',
        duration: 0.5
      });
    };

    (el as Element).addEventListener('mousemove', update);
    (el as Element).addEventListener('mouseleave', resetTilt);

    return () => {
      (el as Element).removeEventListener('mousemove', update);
      (el as Element).removeEventListener('mouseleave', resetTilt);
    };
  };

  return {
    fadeIn,
    revealText,
    parallax,
    tilt
  };
}

import './style.css'
import { initCarousel, initEventCarousel } from './js/carousel.js'
import { initScrollEffect } from './js/header.js';
import { initScrollReveal } from './js/scroll.js';

//init the hiding of top bar when scrolled
initScrollEffect();
//init the cards reveal animation when scrolled
initScrollReveal();
//init Carousel scroll effect
initCarousel();
//init the automatic change of image on the events & shows section
initEventCarousel();
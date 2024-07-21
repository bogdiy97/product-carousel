import './style.scss';
import javascriptLogo from './javascript.svg';
import viteLogo from './public/vite.svg';
import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';
import products from './products.json';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');

  app.innerHTML = `
    <div class="swiper-container">
      <div class="swiper-wrapper"></div>
      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>
    </div>
  `;

  const swiperWrapper = app.querySelector('.swiper-wrapper');

  products.forEach(product => {
    const slide = document.createElement('div');
    slide.classList.add('swiper-slide');

    const hasDiscountedPrice = product.discounted_price !== null;

    slide.innerHTML = `
      <h2 class="product-name">${product.name}</h2>
      <img class="product-image" src="${product.image}" alt="${product.name}">
      <p class="product-price">
        <span class="original-price ${hasDiscountedPrice ? 'line-through' : ''}">$${product.original_price}</span>
        ${hasDiscountedPrice ? `<span class="discounted-price">$${product.discounted_price}</span>` : ''}
      </p>
      <button class="action-button"><i class="fas fa-shopping-cart"></i>Add to cart</button>
      <button class="wishlist-button"><i class="far fa-heart"></i></button>
    `;

    swiperWrapper.appendChild(slide);
  });

  const swiper = new Swiper('.swiper-container', {
    loop: true, // Enable looping if needed
    centeredSlides: true,
    slidesPerView: 1,
    centerInsufficientSlides:true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      // Adjust these values as needed for your design
      440: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      768: { // Added a new breakpoint for better responsiveness
        slidesPerView: 4,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 5,
        spaceBetween: 40,
      },
    },
  });

  document.querySelectorAll('.wishlist-button').forEach(button => {
    button.addEventListener('click', () => {
      const icon = button.querySelector('i');
      if (icon.classList.contains('far')) {
        icon.classList.remove('far');
        icon.classList.add('fas', 'active');
      } else {
        icon.classList.remove('fas', 'active');
        icon.classList.add('far');
      }
    });
  });

  const themeToggleButton = document.getElementById('theme-toggle');
  themeToggleButton.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    themeToggleButton.textContent =  themeToggleButton.textContent.includes('Light') ? 'Dark mode' : 'Light mode'
  });
});

'use strict';

/* show/hide burger menu links */
let burgerMenu = document.getElementById('burger-menu');
let navLinks = document.getElementById('nav-links');
let nav = document.querySelector('#nav-links');

function toggleMenuLinks() {
	navLinks.classList.toggle('hidden');
}

burgerMenu.addEventListener('click', toggleMenuLinks);

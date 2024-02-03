document.addEventListener('DOMContentLoaded', function () {
  const images = document.querySelectorAll('.carousel-container img');
  let currentImageIndex = 0;

  // Show the first image immediately
  images[currentImageIndex].classList.add('active');

  function showNextImage() {
    images[currentImageIndex].classList.remove('active');
    currentImageIndex = (currentImageIndex + 1) % images.length;
    images[currentImageIndex].classList.add('active');
  }

  // Start rotating after 3 seconds
  setTimeout(function () {
    // Use setInterval with a function reference
    setInterval(showNextImage, 3000);
  }, 3000);
});

document.querySelector('.hamburger-menu').addEventListener('click', function() {
  var links = document.querySelectorAll('.menu a');
  for (var i = 0; i < links.length; i++) {
      if (links[i].style.display === 'block') {
          links[i].style.display = 'none';
      } else {
          links[i].style.display = 'block';
      }
  }
});
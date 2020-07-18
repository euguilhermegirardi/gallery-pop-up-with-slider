function Gallery(gallery) {
  if(!gallery) {
    throw new Error('No gallery was found!');
  }

  // Select the elements
  const images = Array.from(gallery.querySelectorAll('img'));
  const modal = document.querySelector('.modal');
  const prevButton = modal.querySelector('.prev');
  const nextButton = modal.querySelector('.next');
  let currentImage;

  function openModal() {
    // First check if the modal is already open
    if(modal.matches('.open')) {
      return;
    }
    modal.classList.add('open');

    // Event listeners to be bound when we open the modal
    window.addEventListener('keyup', handleKeyUp);
    prevButton.addEventListener('click', showPrevImage);
    nextButton.addEventListener('click', showNextImage);
  };

  function showImage(element) {
    if(!element) {
      return;
    }

    // Update the modal (pop-up) with the new info (img and info such h2 and p)
    modal.querySelector('img').src = element.src;
    modal.querySelector('h2').textContent = element.title;
    modal.querySelector('figure p').textContent = element.dataset.description;
    currentImage = element;
    openModal();
  };

  function showPrevImage() {
    showImage(
      // prev element sibling or goes back to the last element.
      currentImage.previousElementSibling ||
      gallery.lastElementChild
    )
  };

  function showNextImage() {
    showImage(
      // next element sibling or goes forward to the first element.
      currentImage.nextElementSibling ||
      gallery.firstElementChild
    )
  };

  function closeModal() {
    modal.classList.remove('open');
    window.removeEventListener('keyup', handleKeyUp);
    nextButton.removeEventListener('click', showNextImage);
    prevButton.removeEventListener('click', showPrevImage);
  };

  function handleClickOutside(e) {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  function handleKeyUp(e) {
    if(e.key === 'Escape') return closeModal();
    if(e.key === 'ArrowRight') return showNextImage();
    if(e.key === 'ArrowLeft') return showPrevImage();
  }

  // Event Listeners
  // Select every single picture
  images.forEach(image =>
    image.addEventListener('click', e => showImage(e.currentTarget))
  );

  // Loop over each image
  images.forEach(image => {
    // Attach an eventListener for each image
    image.addEventListener('keyup', e => {
      // When that is 'keyup', check if it was enter
      if(e.key === 'Enter') {
        showImage(e.currentTarget);
      }
    });
  });

  modal.addEventListener('click', handleClickOutside);
};

// Use it on the page
const gallery = Gallery(document.querySelector('.gallery'));

function load() {

  const scrollSnaps = document.querySelectorAll('.scroll-snap');

  if(scrollSnaps.length) {

    scrollSnaps.forEach(snap => {

      const snapControlPrevious = snap.nextElementSibling.querySelector('.scroll-snap-control--previous');
      const snapControlNext = snap.nextElementSibling.querySelector('.scroll-snap-control--next');

      let snapIncrement = calculate();

      function calculate() {

        return parseFloat(getComputedStyle(snap.firstElementChild).minWidth) + parseFloat(getComputedStyle(snap).gap);

      }

      function update() {

        if(snapControlPrevious) snapControlPrevious.disabled = snap.scrollLeft === 0;
        if(snapControlNext) snapControlNext.disabled = snap.scrollLeft >= snap.scrollWidth - snap.clientWidth;

      }

      update();

      snapControlPrevious.addEventListener('click', () => {

        snap.scrollTo({
          left: snap.scrollLeft - snapIncrement,
          behavior: 'smooth'
        });

        update();

      });

      snapControlNext.addEventListener('click', () => {

        snap.scrollTo({
          left: snap.scrollLeft + snapIncrement,
          behavior: 'smooth'
        });

        update();

      });

      snap.addEventListener('scroll', update);

      addEventListener('resize', () => {

        snapIncrement = calculate();

        update();

      });

    });

  }

}

export { load };

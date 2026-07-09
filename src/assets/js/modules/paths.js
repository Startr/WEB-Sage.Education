function ready() {

  const paths = document.querySelectorAll('.path');

  if(paths.length) {

    function plot() {

      paths.forEach(path => {

        if(!path.classList.contains('selected') && !path.classList.contains('path--plot')) return;

        const pathSVG = path.querySelector('svg');
        const pathSVGPath = pathSVG.querySelector('path');
        const pathSVGHeight = pathSVG.getAttribute('height') || pathSVG.getBoundingClientRect().height;
        const pathSVGWidth = pathSVG.getAttribute('width') || pathSVG.getBoundingClientRect().width;
        const pathSVGScaleX = pathSVG.getBoundingClientRect().width / pathSVGWidth;
        const pathSVGScaleY = pathSVG.getBoundingClientRect().height / pathSVGHeight;
        const pathPoints = path.querySelectorAll('.path__points div');

        pathPoints.forEach(point => {

          const pointDistance = pathSVGPath.getPointAtLength(pathSVGPath.getTotalLength() * point.dataset.percent);

          point.style.left = `${pointDistance.x * pathSVGScaleX}px`;
          point.style.top = `${pointDistance.y * pathSVGScaleY}px`;

        });

        if(!path.classList.contains('path--loaded')) path.classList.add('path--loaded');

      });

    }

    plot();

    addEventListener('load', plot);
    addEventListener('resize', plot);

    const pathsNav = document.querySelector('.paths-nav');
    const pathsNavContainer = document.querySelector('.paths-nav__container');
    const pathsContainer = document.querySelector('.paths__container--paths');

    if(pathsNavContainer && pathsContainer) {

      const pathsNavItems = pathsNavContainer.querySelectorAll('.paths-nav__item');

      pathsNavItems.forEach((item, index) => {

        item.addEventListener('click', () => {

          if(!item.classList.contains('selected')) {

            pathsNavContainer.querySelector('.selected').classList.remove('selected');
            pathsNavContainer.children.item(index).classList.add('selected');

            pathsContainer.querySelector('.selected').classList.remove('selected');
            pathsContainer.children.item(index).classList.add('selected');

            plot();

          }

          scrollTo({
            top: scrollY + pathsNav.getBoundingClientRect().top + (parseFloat(getComputedStyle(pathsNav).height) * 0.25),
            behavior: 'smooth'
          });

        });

      });

    }

  }

}

export { ready };

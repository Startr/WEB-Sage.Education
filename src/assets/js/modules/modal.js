function ready() {

  const modal = document.querySelector('.modal');

  if(modal) {

    const modalTriggers = document.querySelectorAll('.modal-trigger');
    const modalBackdrop = modal.querySelector('.modal__backdrop');
    const modalContainer = modal.querySelector('.modal__container');

    function open(dataset, id) {

      const dataType = dataset.type;
      const dataSrc = dataset.src;
      const dataSrcset = dataset.srcset;
      const dataAlt = dataset.alt;
      const dataPoster = dataset.poster;
      const dataTrack = dataset.track;
      const dataTrackJSON = dataset.trackJson;
      const dataEvent = dataset.event;

      if(dataType === 'image') {

        modalContainer.innerHTML = `
          <figure class="modal__image">
            <picture>
              ${dataSrcset ? `<source srcset="${dataSrcset}" type="image/webp">` : ''}
              <img src="${dataSrc}" alt="${dataAlt}">
            </picture>
          </figure>
        `;

        const modalFigure = modalContainer.querySelector('.modal__image');

        modalFigure.addEventListener('click', close);

      } else if(dataType === 'video') {

        modalContainer.innerHTML = `
          <div class="modal__video">
            <video ${dataPoster ? `poster="${dataPoster}"` : ''} src="${dataSrc}" ${dataEvent ? `data-event="${dataEvent}"` : ''} playsinline>
              ${dataTrack ? `<track src="${dataTrack}" kind="captions" label="English" srclang="en" default>` : dataTrackJSON ? JSON.parse(dataTrackJSON).map((track, index) => `<track src="${track.src}" kind="captions" label="${track.label}" srclang="${track.lang}" ${index === 0 ? 'default' : ''}>`).join('') : ''}
            </video>
            <button></button>
          </div>
        `;

        const modalVideo = modalContainer.querySelector('.modal__video');
        const modalVideoElement = modalVideo.querySelector('video');
        const modalVideoButton = modalVideo.querySelector('button');
        const modalVideoTracks = modalVideoElement.textTracks;
        const modalVideoEvent = modalVideoElement.dataset.event;

        if(modalVideoTracks[0]) modalVideoTracks[0].mode = 'hidden';

        modalVideoButton.addEventListener('click', () => {

          if(modalVideoElement.paused) {

            modalVideoElement.play();

          } else {

            modalVideoElement.pause();

          }

        });

        modalVideoElement.addEventListener('play', (e) => {

          if(window.plausible && modalVideoEvent && e.target.currentTime === 0) {

            plausible('Video Start', {
              props: {
                title: modalVideoEvent
              }
            });

          }

          modalVideo.classList.add('modal__video--playing');

          e.target.setAttribute('controls', 'controls');

        });

        modalVideoElement.addEventListener('ended', (e) => {

          if(window.plausible && modalVideoEvent) {

            plausible('Video Finish', {
              props: {
                title: modalVideoEvent
              }
            });

          }

          modalVideo.classList.remove('modal__video--playing');

          e.target.removeAttribute('controls');
          e.target.load();

        });

        if(!location.hash || location.hash.substring(1) !== id) modalVideoElement.play();

      }

      if(id) history.replaceState(null, '', `#${id}`);

      modal.setAttribute('aria-hidden', 'false');
      modal.focus();
      modal.showModal();

    }

    function close() {

      modalContainer.innerHTML = '';

      modal.scrollTo(0, 0);
      modal.close();
      modal.setAttribute('aria-hidden', 'true');

      history.replaceState(null, '', location.pathname);

    }

    if(modalTriggers.length) {

      modalTriggers.forEach(trigger => {

        trigger.addEventListener('click', (e) => {

          open(e.currentTarget.dataset, e.currentTarget.id);

        });

      });

    }

    modalBackdrop.addEventListener('click', close);

    document.addEventListener('keydown', (e) => {

      if(e.key === 'Escape') close();

    });

    const hash = location.hash.substring(1);

    if(hash) {

      const hashElement = document.getElementById(hash);

      if(hashElement && hashElement.classList.contains('modal-trigger')) open(hashElement.dataset, hash);

    }

  }

}

export { ready };

function ready() {

  const videos = document.querySelectorAll('.video');

  if(videos.length) {

    videos.forEach(video => {

      const videoElement = video.querySelector('video');
      const videoButton = video.querySelector('button');
      const videoTracks = videoElement.textTracks;
      const videoEvent = videoElement.dataset.event;

      if(videoTracks[0]) videoTracks[0].mode = 'hidden';

      videoButton.addEventListener('click', () => {

        if(videoElement.paused) {

          videoElement.play();

        } else {

          videoElement.pause();

        }

      });

      videoElement.addEventListener('play', (e) => {

        if(window.plausible && videoEvent && e.target.currentTime === 0) {

          plausible('Video Start', {
            props: {
              title: videoEvent
            }
          });

        }

        video.classList.add('video--playing');

        e.target.setAttribute('controls', 'controls');

      });

      videoElement.addEventListener('ended', (e) => {

        if(window.plausible && videoEvent) {

          plausible('Video Finish', {
            props: {
              title: videoEvent
            }
          });

        }

        video.classList.remove('video--playing');

        e.target.removeAttribute('controls');
        e.target.load();

      });

    });

  }

}

export { ready };

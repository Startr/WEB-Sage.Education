function ready() {

  const newsletter = document.querySelector('.newsletter');

  if(newsletter) {

    const newsletterForm = document.getElementById('mc-embedded-subscribe-form');
    const newsletterInput = document.getElementById('mce-EMAIL');
    const newsletterButton = newsletterForm.querySelector('button');

    newsletterForm.addEventListener('submit', function(e) {

      e.preventDefault();

      newsletterInput.value = newsletterInput.value.trim();

      if(newsletterInput.value) {

        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(newsletterInput.value);

        if(isValid) {

          fetch(newsletterForm.action, {

            body: new FormData(newsletterForm),
            method: newsletterForm.method,
            mode: 'no-cors'

          }).then(() => {

            newsletterForm.reset();

            newsletterButton.disabled = false;

            newsletter.classList.add('newsletter--success');

          });

          newsletterButton.disabled = true;

        } else {

          newsletter.classList.add('newsletter--error');

        }

      }

    });

    function removeError() {

      newsletter.classList.remove('newsletter--error', 'newsletter--success');

    }

    newsletterInput.addEventListener('click', removeError);
    newsletterInput.addEventListener('focus', removeError);
    newsletterInput.addEventListener('input', removeError);

  }

}

export { ready };

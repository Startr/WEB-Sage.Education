function ready() {

  const navPhrase = document.querySelector('.nav__phrase');

  if(navPhrase) {

    let randomPhrase = 'Private by Design';

    if(window.phrase.length) randomPhrase = window.phrase[Math.floor(Math.random() * window.phrase.length)].phrase;

    navPhrase.querySelector('span').textContent = randomPhrase;

    if(document.body.classList.contains('has-nav-phrase')) document.body.classList.remove('has-nav-phrase');

  }

  const navActive = document.getElementById('nav-active');
  const navMobile = document.querySelectorAll('.nav__mobile a');

  if(navActive && navMobile.length) {

    navMobile.forEach(link => {

      link.addEventListener('click', () => {

        navActive.checked = false;

      });

    });

  }

}

function scroll() {

  const nav = document.querySelector('.nav');

  if(nav) {

    if(scrollY > 0) {

      nav.classList.add('nav--stuck');

    } else {

      nav.classList.remove('nav--stuck');

    }

  }

}

export { ready, scroll };

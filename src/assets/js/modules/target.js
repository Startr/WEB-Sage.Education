function hashchange(ready = false) {

  if(location.hash) {

    const hashElement = document.querySelector(location.hash);

    if(hashElement) {

      if(hashElement.matches('details')) hashElement.open = true;

      if(ready == true) hashElement.classList.add('target');

    }

  }

}

export { hashchange };

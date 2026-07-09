function ready() {

  const signups = document.querySelector('.data-signups');

  if(signups) {

    const response = new XMLHttpRequest();

    response.addEventListener('load', () => {

      if(response.status >= 200 && response.status < 400) {

        const data = JSON.parse(response.responseText);

        signups.querySelector('.data-signups__value').textContent = data.signups;

      }

    });

    response.open('GET', 'https://startr.cloud/statistics/public?stat=bc3_signups');

    response.send();

  }

}

export { ready };

function ready() {

  const summaries = document.querySelectorAll('div.details details summary');

  if(summaries.length) {

    summaries.forEach(summary => {

      const details = summary.closest('details');

      summary.addEventListener('click', (e) => {

        e.preventDefault();

        if(details.open) {

          details.open = false;

          history.replaceState(null, '', location.pathname);

        } else {

          details.open = true;

          location.hash = details.id;

        }

      });

    });

  }

}

export { ready };

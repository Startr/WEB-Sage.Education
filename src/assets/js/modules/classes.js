function ready() {

  if(sessionStorage.getItem('classes')) {

    output();

  } else {

    const response = new XMLHttpRequest();

    response.addEventListener('load', () => {

      if(response.status >= 200 && response.status < 400) {

        const data = JSON.parse(response.responseText);

        // Handle both old array format and new object format for backwards compatibility
        const classesData = Array.isArray(data) ? data : data.upcoming_classes;

        classesData.sort((a, b) => new Date(a.class.start_time) - new Date(b.class.start_time));

        sessionStorage.setItem('classes', JSON.stringify(classesData));

        output();

      }

    });
    // #TODO make this LIVE
    //response.open('GET', 'https://sage.is/support/classes/upcoming.json');
    response.open('GET', 'https://sage.is/support/classes/upcoming.json?cache=' + new Date().getTime());
    response.send();

  }

  function output() {

    const classes = document.querySelectorAll('.data-classes');

    if(classes.length) {

      const data = JSON.parse(sessionStorage.getItem('classes'));

      if(data && data.length) {

        classes.forEach(element => {

          const elementOutput = element.querySelector('.data-classes__output');
          const elementDataLimit = element.dataset.classesLimit || null;

          let elementDataType = element.dataset.classesType || null;

          if(elementDataType === 'intro-to-sage') {

            elementDataType = 'Intro to Sage';

          } else if(elementDataType === 'become-a-pro') {

            elementDataType = 'Become a Pro';

          }

          let elementData = data;

          if(elementDataType) elementData = elementData.filter(item => item.class.class_type === elementDataType);

          if(elementDataLimit) elementData = elementData.slice(0, elementDataLimit);

          if(elementData.length === 0) {

            element.remove();

            return;

          }

          if(elementData.length === data.length) {

            const elementLink = element.querySelector('.data-classes__link');

            if(elementLink) elementLink.remove();

          }

          elementData.forEach(value => {

            const valueDate = new Date(value.class.start_time);

            const classDay = valueDate.toLocaleString('default', { weekday: 'short' });
            const classMonth = valueDate.toLocaleString('default', { month: 'short' });
            const classDate = valueDate.getDate();
            const classTime = valueDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
            const classLink = value.class.webinar_link;
            const classType = value.class.class_type;
            const classDescription = value.class.description;

            elementOutput.insertAdjacentHTML('beforeend', `
              <a class="data-classes__class" href="${classLink}">
                <dl class="data-classes__date" aria-hidden="true">
                  <dt>${classMonth}</dt>
                  <dd>${classDate}</dd>
                </dl>
                <dl class="data-classes__details">
                  <dt>${classDescription ? classDescription : classType}</dt>
                  <dd>${classDay}, ${classMonth} ${classDate}, ${classTime.toLowerCase().replace(/\s+(am|pm)$/, '$1')}</dd>
                </dl>
              </a>
            `);

          });

        });

      } else {

        classes.forEach(element => {

          element.remove();

        });

      }

    }

  }

}

export { ready };

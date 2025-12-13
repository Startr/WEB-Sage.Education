function ready() {

  const PRODUCTS = {
    bc3: { name: 'Sage', survey: true },
    bcx: { name: 'Sage', survey: true },
    sage: { name: 'Sage', survey: true },
    campfire: { name: 'Campfire' },
    backpack: { name: 'Backpack' },
    highrise: { name: 'Highrise' },
    skybox: { name: 'the Startr Suite' }
  };

  const SURVEY_URL = 'https://nota.startr.cloud/to/M4eDXjbW#id=:accountId:';

  function setProductName(name) {

    const element = document.querySelector('[data-behavior="cancel_product"]');

    if(element) element.textContent = name;

  }

  function showSurvey(accountId) {

    const element = document.querySelector('[data-behavior="cancel_survey"]');

    if(element) {

      const link = element.querySelector('a');

      if(link) link.href = SURVEY_URL.replace(/:accountId:/, accountId);

      element.style.display = 'block';

    }

  }

  function params(name) {

    const url = new URL(document.location);

    return url.searchParams.get(name);

  }

  let product;

  if(product = PRODUCTS[params('product')]) {

    setProductName(product.name);

    if(product.survey) showSurvey(params('id'));

  }

}

export { ready };

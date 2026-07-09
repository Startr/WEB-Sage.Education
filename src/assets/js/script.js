import * as body from './modules/body.js';
import * as cancel from './modules/cancel.js';
import * as classes from './modules/classes.js';
import * as details from './modules/details.js';
import * as modal from './modules/modal.js';
import * as nav from './modules/nav.js';
/*import * as newsletter from './modules/newsletter.js';*/
import * as paths from './modules/paths.js';
import * as pwaGuideLink from './modules/pwaGuideLink.js';
import * as scrollSnap from './modules/scrollSnap.js';
import * as signups from './modules/signups.js';
import * as target from './modules/target.js';
import * as video from './modules/video.js';

document.addEventListener('DOMContentLoaded', () => {

  body.ready();

  cancel.ready();

  classes.ready();

  details.ready();


  modal.ready();

  nav.ready();

  /* newsletter.ready();*/
  // newsletter is not used anymore, but kept for reference
  // in case we want to reintroduce it later

  paths.ready();

  pwaGuideLink.ready();

  signups.ready();

  target.hashchange(true);

  video.ready();

});

addEventListener('scroll', () => {

  nav.scroll();

});

addEventListener('hashchange', () => {

  target.hashchange();

});

addEventListener('load', () => {

  scrollSnap.load();

  document.documentElement.style.scrollBehavior = 'smooth';

});

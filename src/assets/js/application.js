import { Application } from './packages/stimulus.js';

const application = Application.start();

import SignupController from './controllers/signup_controller.js';
application.register('signup', SignupController);

import SignupIframeController from './controllers/signup_iframe_controller.js';
application.register('signup-iframe', SignupIframeController);

import TrackingController from './controllers/tracking_controller.js';
application.register('tracking', TrackingController);

import EngagedSessionController from './controllers/engaged_session_controller.js';
application.register('engagement', EngagedSessionController);

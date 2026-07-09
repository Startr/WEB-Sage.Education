import { Application } from './packages/stimulus.js';

const application = Application.start();

import AnchorsController from './controllers/anchors_controller.js';
application.register('anchors', AnchorsController);

import BookmarkController from './controllers/bookmark_controller.js';
application.register('bookmark', BookmarkController);

import GlossaryController from './controllers/glossary_controller.js';
application.register('glossary', GlossaryController);

import SidebarController from './controllers/sidebar_controller.js';
application.register('sidebar', SidebarController);

import TweetController from './controllers/tweet_controller.js';
application.register('tweet', TweetController);

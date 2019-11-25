const pkg = require('../package.json');
import updateNotifier = require('update-notifier');

updateNotifier({ pkg }).notify();

import {main, authCallback} from './main.js';

declare let global: any;
global.main = main;
global.authCallback = authCallback;

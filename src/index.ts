import { main, authCallback } from './main';

declare let global: any;
global.main = main;
global.authCallback = authCallback;

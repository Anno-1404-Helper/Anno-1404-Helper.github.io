import page from './lib/page.mjs';

import { addRender } from './middlewares/render.js';
import { addSession } from './middlewares/session.js';
import { addStorage } from './middlewares/storage.js';

import { renderSettings } from './views/settings.js';
import { renderIslands } from './views/islands.js';
import { renderLogin } from './views/login.js';
import { renderRegister } from './views/register.js';

import { getGames } from './data/games.js';

import * as api from './data/island.js';

window.api = api;

window.getGames = getGames;

page(addRender);
page(addStorage);
page(addSession);

page('/index.html', '/');
page('/', renderIslands);
page('/settings', renderSettings);
page('/login', renderLogin);
page('/register', renderRegister);

page.start();

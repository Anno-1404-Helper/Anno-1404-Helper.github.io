import page from './lib/page.mjs';

import { addRender } from './middlewares/render.js';
import { addSession } from './middlewares/session.js';

import { renderSettings } from './views/settings.js';
import { renderIslands } from './views/islands.js';
import { renderLogin } from './views/login.js';
import { register } from './data/auth.js';
import { getGames } from './data/games.js';

window.register = register;
window.getGames = getGames;

page(addRender);
page(addSession);

page('/index.html', '/');
page('/', renderIslands);
page('/settings', renderSettings);
page('/login', renderLogin);

page.start();

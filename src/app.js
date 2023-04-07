import page from './lib/page.mjs';

import { addRender } from './middlewares/render.js';
import { addSession } from './middlewares/session.js';
import { addStorage } from './middlewares/storage.js';

import { renderSettings } from './views/settings.js';
import { renderIslands } from './views/islands.js';
import { renderLogin } from './views/login.js';
import { renderRegister } from './views/register.js';

import { getGames } from './data/games.js';

import * as api from './data/islands.js';
import { addSelection } from './middlewares/selection.js';
import { renderPopulation } from './views/population.js';
import { renderAscension } from './views/ascension.js';
import { renderNeeds } from './views/needs.js';

window.api = api;

window.getGames = getGames;

page('/:island/:mode', addSelection);
page(addRender);
page(addStorage);
page(addSession);

page('/index.html', '/');
page('/', renderIslands);
page('/settings', renderSettings);
page('/login', renderLogin);
page('/register', renderRegister);
page('/:island/population', renderPopulation);
page('/:island/ascension', renderAscension);
page('/:island/needs', renderNeeds);

page.start();

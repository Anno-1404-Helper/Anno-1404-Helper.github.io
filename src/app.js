import page from './lib/page.mjs';

import { addRender } from './middlewares/render.js';
import { addConfig } from './middlewares/config.js';
import { addSession } from './middlewares/session.js';
import { addStorage } from './middlewares/storage.js';
import { addSelection } from './middlewares/selection.js';
import { addCommit } from './middlewares/commit.js';
import { hasGame } from './middlewares/guards.js';

import { renderSettings } from './views/settings.js';
import { renderIslands } from './views/islands.js';
import { renderLogin } from './views/login.js';
import { renderRegister } from './views/register.js';
import { renderPopulation } from './views/population.js';
import { renderAscension } from './views/ascension.js';
import { renderNeeds } from './views/needs.js';

import { logout } from './data/auth.js';

page('/:island/:mode', addSelection);
page(addSession);
page(addConfig);
page(addStorage);
page(addRender);
page(addCommit);

page('/index.html', '/');
page('/', renderIslands);
page('/settings', renderSettings);
page('/login', renderLogin);
page('/register', renderRegister);
page('/logout', logout);
page('/:island/population', hasGame, renderPopulation);
page('/:island/ascension', hasGame, renderAscension);
page('/:island/needs', hasGame, renderNeeds);

page.start();

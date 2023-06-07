import page from './lib/page.mjs';

import { addRender } from './middlewares/render.js';
import { addConfig } from './middlewares/config.js';
import { addSession } from './middlewares/session.js';
import { addStorage } from './middlewares/storage.js';
import { addSelection } from './middlewares/selection.js';
import { addCommit } from './middlewares/commit.js';
import { hasGame } from './middlewares/guards.js';
import { title } from './middlewares/title.js';

import { renderSettings } from './views/settings.js';
import { renderIslands } from './views/islands.js';
import { renderLogin } from './views/login.js';
import { renderRegister } from './views/register.js';
import { renderLogout } from './views/logout.js';
import { renderPopulation } from './views/population.js';
import { renderAscension } from './views/ascension.js';
import { renderNeeds } from './views/needs.js';
import { renderIcons } from './views/icons.js';
import { renderRates } from './views/rates.js';

page.base('/Anno-1404-Helper.github.io');

page('/:island/:mode', addSelection);
page(addSession);
page(addConfig);
page(addStorage);
page(addRender);
page(addCommit);

page('/index.html', '/');
page('/', title('Islands'), renderIslands);
page('/settings', title('Settings'), renderSettings);
page('/login', title('Login'), renderLogin);
page('/register', title('Register'), renderRegister);
page('/logout', title('Logout'), renderLogout);
page(
  '/:island/population',
  hasGame,
  title('$name | Population'),
  renderPopulation
);
page(
  '/:island/ascension',
  hasGame,
  title('$name | Ascension'),
  renderAscension
);
page('/:island/needs', hasGame, title('$name | Needs'), renderNeeds);
page('/icons', title('Icons'), renderIcons);
page('/rates', title('Production'), renderRates);

page.start();

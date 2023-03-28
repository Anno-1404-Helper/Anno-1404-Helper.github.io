import page from './lib/page.mjs';
import { addRender } from './middlewares/render.js';
import { renderSettings } from './views/settings.js';
import { renderIslands } from './views/islands.js';

page(addRender);

page('/index.html', '/');
page('/', renderIslands);
page('/settings', renderSettings);

page.start();

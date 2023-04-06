import { getIslands } from '../data/island.js';
import { html } from '../lib/lit-html.js';

export async function renderIslands(ctx) {
  const islands = await getIslands();
  ctx.render(islandsTemplate(islands));
}

const islandsTemplate = (islands) =>
  html`<h1>Islands Page</h1>
    <ul>
      ${islands.map((i) => html`<li>${i.name}</li>`)}
    </ul>`;

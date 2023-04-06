import { html } from '../lib/lit-html.js';

export async function renderIslands(ctx) {
  const game = ctx.game;
  if (!game) {
    ctx.page.redirect('/settings');
    alert('No loaded game found!');
    return;
  }

  ctx.render(islandsTemplate(ctx.islands));
}

const islandsTemplate = (islands) =>
  html`<h1>Islands Page</h1>
    <ul>
      ${islands.map((i) => html`<li>${i.name}</li>`)}
    </ul>`;

import { get } from '../data/api.js';
import { html } from '../lib/lit-html.js';

export function renderIslands(ctx) {
  ctx.render(islandsTemplate(onClick));

  async function onClick() {
    await get('/classes/Game');
  }
}

const islandsTemplate = (onClick) =>
  html`<h1>Islands Page</h1>
    <button @click=${onClick}>Make Request</button>`;

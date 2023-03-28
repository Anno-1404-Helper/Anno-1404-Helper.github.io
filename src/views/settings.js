import { html } from '../lib/lit-html.js';

export function renderSettings(ctx) {
  ctx.render(settignsTemplate());
}

const settignsTemplate = () => html`<h1>Settings Page</h1>`;

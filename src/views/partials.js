import { loadConfig } from '../data/config.js';
import { html } from '../lib/lit-html.js';
import { until } from '../lib/directives/until.js';

let config = null;

export function icon(name) {
  return until(resolveIcon(name), iconTemplate(15, 13));
}

async function resolveIcon(name) {
  if (config === null) {
    config = loadConfig('icons');
  }

  let data = (await config)[name];
  if (!data) {
    data = (await config).missing;
  }

  return iconTemplate(data[0], data[1]);
}

const iconTemplate = (x, y) =>
  html`<span
    class="icon"
    style="background-position: -${x * 46}px -${y * 46}px"
  ></span>`;

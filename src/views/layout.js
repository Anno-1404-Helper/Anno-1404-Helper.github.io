import { html } from '../lib/lit-html.js';
import { classMap } from '../lib/directives/class-map.js';

export const layoutTemplate = (tab, islands, content) => html`<header>
    <nav class="main-nav">
      <div class="nav-left">
        <a
          href="/settings"
          class=${classMap({
            nav: true,
            tab: true,
            active: tab === '/settings',
          })}
        >
          <span class="icon" style="background-position: -368px -736px"></span
        ></a>
      </div>
      <div class="nav-left">
        <a
          href="/"
          class=${classMap({
            nav: true,
            tab: true,
            active: tab === '/',
          })}
        >
          <span class="icon" style="background-position: -828px -736px"></span
        ></a>
      </div>
      <div class="nav-section">
        <select class="nav select tab">
          <option value="null" style="font-style: italic" selected="">
            -- Select Island --
          </option>
          ${islands.map(
            (island) =>
              html`<option value=${island.objectId}>${island.name}</option>`
          )}
        </select>
        ${islands.map(
          (island) => html`<a
            class="nav island-nav tab"
            href="/${island.objectId}/population"
          >
            <span class="nav-label">${island.name}</span>
          </a>`
        )}
      </div>
    </nav>
  </header>
  <main>${content}</main>`;

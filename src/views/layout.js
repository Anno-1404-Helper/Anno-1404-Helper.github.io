import { html, nothing } from '../lib/lit-html.js';
import { classMap } from '../lib/directives/class-map.js';

export const layoutTemplate = (
  tab,
  islands,
  current,
  mode = 'population',
  onChange,
  content
) => html`<header>
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
        <select
          @change=${onChange}
          class="nav select tab ${current ? 'active' : ''}"
          .value=${current}
        >
          ${current
            ? nothing
            : html` <option value="null" style="font-style: italic" selected>
                -- Select Island --
              </option>`}
          ${islands.map(
            (island) =>
              html`<option
                value=${island.url}
                ?selected=${current === island.name}
              >
                ${island.name}
              </option>`
          )}
        </select>
        ${islands.map(
          (island) => html`<a
            class="nav island-nav tab ${current === island.url ? 'active' : ''}"
            href="/${island.url}/${mode}"
          >
            <span class="nav-label">${island.name}</span>
          </a>`
        )}
      </div>
    </nav>
    ${current
      ? html`<nav class="sub-nav">
          <a
            class=${mode === 'ascension' ? 'active' : ''}
            href="/${current}/ascension"
            >Ascension</a
          >
          <a
            class=${mode === 'population' ? 'active' : ''}
            href="/${current}/population"
            >Population</a
          >
          <a class=${mode === 'needs' ? 'active' : ''} href="/${current}/needs"
            >Needs</a
          >
        </nav>`
      : nothing}
  </header>
  <main>${content}</main>`;

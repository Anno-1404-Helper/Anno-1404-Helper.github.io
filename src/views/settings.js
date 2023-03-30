import { html, nothing } from '../lib/lit-html.js';

export function renderSettings(ctx) {
  ctx.render(settignsTemplate(ctx.user));
}

const settignsTemplate = (user) => html`<h1>Settings Page</h1>
  <section class="main">
    ${user
      ? nothing
      : html`<div>
            <a class="link" href="/login">Sign in</a> to enable cloud sync
          </div>
          <br />`}

    <table>
      <thead>
        <tr>
          <th>Game Name</th>
          <th>Controls</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colspan="2">No games recorded!</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="2">
            <form>
              <input type="text" name="name" placeholder="New Game Name" />
              <button class="btn">
                <i class="fa-solid fa-plus"></i> Create Game
              </button>
            </form>
          </td>
        </tr>
      </tfoot>
    </table>
  </section>`;

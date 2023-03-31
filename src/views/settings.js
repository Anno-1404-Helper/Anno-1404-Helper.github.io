import { createGame, getGames } from '../data/games.js';
import { html, nothing } from '../lib/lit-html.js';
import { createSubmitHandler } from '../util.js';

export async function renderSettings(ctx) {
  const games = ctx.user ? await getGames() : [];

  update();

  function update(error) {
    ctx.render(
      settignsTemplate(games, ctx.user, createSubmitHandler(onCreate), error)
    );
  }

  async function onCreate({ name }, form) {
    try {
      if (!name) {
        throw {
          message: 'Name is required!',
        };
      }

      const gameData = { name };

      const result = await createGame(gameData);

      Object.assign(gameData, result);
      games.push(gameData);

      form.reset();

      update();
    } catch (error) {
      update(error.message);
    }
  }
}

const settignsTemplate = (games, user, onCreate, error) => html`<h1>
    Settings Page
  </h1>
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
        ${games.length === 0
          ? html`<tr>
              <td colspan="2">No games recorded!</td>
            </tr>`
          : games.map(gameTemplate)}
      </tbody>
      <tfoot>
        <tr>
          <td colspan="2">
            <form @submit=${onCreate}>
              ${error ? html`<p class="error">${error}</p>` : nothing}
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

const gameTemplate = (game) =>
  html`<tr>
    <td>${game.name}</td>
    <td>
      <button class="btn"><i class="fa-solid fa-download"></i> Load</button>
      <button class="btn"><i class="fa-solid fa-trash-can"></i> Delete</button>
    </td>
  </tr>`;

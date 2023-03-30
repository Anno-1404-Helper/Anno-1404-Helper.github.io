import { login } from '../data/auth.js';
import { html, nothing } from '../lib/lit-html.js';
import { createSubmitHandler } from '../util.js';

export function renderLogin(ctx) {
  update();

  function update(formData, error) {
    ctx.render(loginTemplate(createSubmitHandler(onLogin), formData, error));
  }

  async function onLogin({ username, password }) {
    try {
      if (!username || !password) {
        throw {
          message: 'All fields are required!',
        };
      }

      await login(username, password);

      ctx.page.redirect('settings');
    } catch (error) {
      update({ username }, error.message);
      error.handled = true;
    }
  }
}

const loginTemplate = (onLogin, formData = {}, error) =>
  html`<h1>Login</h1>
    <section class="main">
      <form @submit=${onLogin}>
        ${error ? html`<p class="error">${error}</p>` : nothing}
        <label
          >Username
          <input type="text" name="username" .value=${formData.username || ''}
        /></label>
        <label>Password <input type="password" name="password" /></label>
        <button class="btn">Sign In</button>
      </form>
      <p>
        Don't have an acoount? <a class="link" href="/register">Sign up here</a>
      </p>
    </section>`;

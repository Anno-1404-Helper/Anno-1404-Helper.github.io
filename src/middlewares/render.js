import { render } from '../lib/lit-html.js';
import { layoutTemplate } from '../views/layout.js';

const root = document.getElementById('content');

export function addRender(ctx, next) {
  ctx.render = renderView.bind(ctx);

  next();
}

function renderView(content) {
  const tab = this?.pathname;
  const islands = this?.islands || [];
  const current = this?.selection?.island;
  const mode = this?.selection?.mode;

  document.title = [this?.customTitle, 'Anno 1404 Helper']
    .filter((x) => x) //* Removes falsy values
    .join(' | ');

  render(
    layoutTemplate(tab, islands, current, mode, onChange.bind(this), content),
    root
  );

  function onChange(event) {
    const url = event.target.value;
    this.page.redirect(`/${url}/${mode || 'population'}`);
  }
}

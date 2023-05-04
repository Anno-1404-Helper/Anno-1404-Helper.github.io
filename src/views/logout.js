import { logout } from '../data/auth.js';

export async function renderLogout(ctx) {
  await logout(ctx.user.sessionToken);
  ctx.page.redirect('/settings');
}

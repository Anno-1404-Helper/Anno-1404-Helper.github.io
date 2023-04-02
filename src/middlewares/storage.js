export function addStorage(ctx, next) {
  ctx.game = getGame();
  ctx.setGame = setGame.bind(ctx);

  next();
}

const gameItem = 'activeGame';

function getGame() {
  return JSON.parse(localStorage.getItem(gameItem));
}

function setGame(game) {
  this.game = game;
  localStorage.setItem(gameItem, JSON.stringify(game));
}

function removeGame() {
  localStorage.removeItem(gameItem);
}

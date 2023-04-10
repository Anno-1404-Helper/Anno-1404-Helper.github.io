import { createStorage } from '../util.js';

export function addStorage(ctx, next) {
  ctx.game = gameStorage.get();
  ctx.setGame = setGame.bind(ctx);

  ctx.islands = islandStorage.get();
  ctx.setIslands = setIslands.bind(ctx);

  ctx.ascension = ascensionStorage.get();
  ctx.setAscension = setAscension.bind(ctx);

  next();
}

const gameStorage = createStorage('activeGame');
const islandStorage = createStorage('islands');
const ascensionStorage = createStorage('ascension', {});

function setGame(game) {
  this.game = game;
  gameStorage.set(game);
}

function setIslands(islands) {
  this.islands = islands;
  islandStorage.set(islands);
}

function setAscension(ascension) {
  this.ascension = ascension;
  ascensionStorage.set(ascension);
}

import { get, post, del, put } from './api.js';
import { addOwner } from './queries.js';

const endpoints = {
  catalog: '/classes/Game',
  byId: (id) => `/classes/Game/${id}`,
};

export async function getGames() {
  return (await get(endpoints.catalog)).results;
}

export async function createGame(game) {
  addOwner(game);
  return await post(endpoints.catalog, game);
}

export async function deleteGame(id) {
  return await del(endpoints.byId(id));
}

export async function updateGame(id, game) {
  if (typeof game.owner === 'string') {
    addOwner(game);
  }

  delete game.createdAt;
  delete game.updatedAt;
  delete game.active;

  return await put(endpoints.byId(id), game);
}

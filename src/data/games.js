import { get, post, del } from './api.js';
import { addOwner } from './queries.js';

const endpoints = {
  catalog: '/classes/Game',
  byId: '/classes/Game/',
};

export async function getGames() {
  return (await get(endpoints.catalog)).results;
}

export async function createGame(game) {
  addOwner(game);
  return await post(endpoints.catalog, game);
}

export async function deleteGame(id) {
  return await del(endpoints.byId + id);
}

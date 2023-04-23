import { del, get, post, put } from './api.js';
import { addOwner, createGamePointer, filter } from './queries.js';

const endpoints = {
  catalog: '/classes/Island',
  byGameId: (gameId) =>
    `/classes/Island${filter('game', createGamePointer(gameId))}`,
  byId: (id) => `/classes/Island/${id}`,
};

export async function getIslands(gameId) {
  const islands = await get(endpoints.byGameId(gameId));
  return islands.results;
}

export async function createIsland(island) {
  addOwner(island);
  island.game = createGamePointer(island.game);

  return await post(endpoints.catalog, island);
}

export async function deleteIsland(id) {
  return await del(endpoints.byId(id));
}

export async function updateIsland(id, island) {
  if (typeof island.owner === 'string') {
    addOwner(island);
  }

  if (typeof island.game === 'string') {
    island.game = createGamePointer(island.game);
  }

  delete island.createdAt;
  delete island.updatedAt;

  return await put(endpoints.byId(id));
}

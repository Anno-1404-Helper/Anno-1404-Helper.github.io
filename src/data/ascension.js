import { del, get, post, put } from './api.js';
import {
  addOwner,
  createGamePointer,
  createIslandPointer,
  filter,
} from './queries.js';

const endpoints = {
  catalog: '/classes/Ascension',
  byGameId: (gameId) =>
    `/classes/Ascension${filter('game', createGamePointer(gameId))}`,
  byId: (islandId) => `/classes/Ascension/${islandId}`,
};

export async function getAscension(gameId) {
  const data = await get(endpoints.byGameId(gameId));
  return data.results;
}

export async function createAscension(ascension) {
  addOwner(ascension);
  ascension.game = createGamePointer(ascension.game);
  ascension.island = createIslandPointer(ascension.island);
  return await post(endpoints.catalog, ascension);
}

export async function updateAscension(id, ascension, dontMask = false) {
  if (typeof ascension.owner == 'string') {
    addOwner(ascension);
  }

  if (typeof ascension.game == 'string') {
    ascension.game = createGamePointer(ascension.game);
  }

  if (typeof ascension.island == 'string') {
    ascension.island = createIslandPointer(ascension.island);
  }

  delete ascension.createdAt;
  delete ascension.updatedAt;

  return await put(endpoints.byId(id), ascension, dontMask);
}

export async function deleteAscension(id) {
  return del(endpoints.byId(id));
}

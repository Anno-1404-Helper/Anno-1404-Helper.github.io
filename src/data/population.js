import { del, get, post, put } from './api.js';
import {
  addOwner,
  createGamePointer,
  createIslandPointer,
  filter,
} from './queries.js';

const endpoints = {
  catalog: '/classes/Population',
  byGameId: (gameId) =>
    `/classes/Population${filter('game', createGamePointer(gameId))}`,
  byId: (id) => `/classes/Population/${id}`,
};

export async function getPopulation(gameId) {
  const data = await get(endpoints.byGameId(gameId));
  return data.results;
}

export async function createPopulation(population) {
  addOwner(population);
  population.game = createGamePointer(population.game);
  population.island = createIslandPointer(population.island);

  return await post(endpoints.catalog, population);
}

export async function updatePopulation(id, population, dontMask = false) {
  if (typeof population.owner == 'string') {
    addOwner(population);
  }

  if (typeof population.game == 'string') {
    population.game = createGamePointer(population.game);
  }

  if (typeof population.island == 'string') {
    population.island = createIslandPointer(population.island);
  }

  delete population.createdAt;
  delete population.updatedAt;

  return await put(endpoints.byId(id), population, dontMask);
}

export async function deletePopulation(id) {
  return await del(endpoints.byId(id));
}

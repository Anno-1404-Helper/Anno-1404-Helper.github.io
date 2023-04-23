import { getUserData } from '../util.js';

export function addOwner(obj) {
  const userData = getUserData();

  if (!userData) {
    throw new ReferenceError('User is not logged in!');
  }

  const id = userData.objectId;

  obj.owner = createPointer('_User', id);
}

export function filter(fieldName, value) {
  const query = JSON.stringify({ [fieldName]: value });
  return `?where=${encodeURIComponent(query)}`;
}

export const createGamePointer = createPointer.bind(null, 'Game');
export const createIslandPointer = createPointer.bind(null, 'Island');

function createPointer(className, objectId) {
  return {
    __type: 'Pointer',
    className,
    objectId,
  };
}

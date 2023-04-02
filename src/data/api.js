import { clearUserData, getUserData } from '../util.js';

const host = 'https://parseapi.back4app.com';
const appId = '9QmOxvHUky9KQxo8tPUQem93BPEolCcm20rMyrBf';
const apiKey = 'wjOwiaTMqvtAefnClzQ4oVpWSUPNRUCgIiEVkgsb';

async function request(method, url, data) {
  const options = {
    method,
    headers: {
      'X-Parse-Application-Id': appId,
      'X-Parse-JavaScript-Key': apiKey,
    },
  };

  const userData = getUserData();
  if (userData) {
    options.headers['X-Parse-Session-Token'] = userData.sessionToken;
  }

  if (data) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${host}${url}`, options);

    let result;
    if (response.status !== 204) {
      result = await response.json();
    }

    if (!response.ok) {
      if (result.code === 209) {
        clearUserData();
      }

      const error = result;
      throw {
        message: error.error,
        handled: false,
      };
    }

    return result;
  } catch (error) {
    handleError(error);
    throw error;
  }
}

async function handleError(error) {
  await new Promise((r) => setTimeout(r, 50));

  if (!error.handled) {
    alert(error.message);
  }
}

export const get = request.bind(null, 'get');
export const post = request.bind(null, 'post');
export const put = request.bind(null, 'put');
export const del = request.bind(null, 'delete');

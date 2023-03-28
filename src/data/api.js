const host = 'http://parseapi.back4app.com';
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
      throw result;
    }

    return result;
  } catch (error) {
    alert(error.message);
    throw error;
  }
}

export const get = request.bind(null, 'get');
export const post = request.bind(null, 'post');
export const put = request.bind(null, 'put');
export const del = request.bind(null, 'delete');

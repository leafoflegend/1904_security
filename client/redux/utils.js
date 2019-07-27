const post = (url, data) => {
  return window
    .fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(res => {
      if (res.status - 200 > 99) {
        throw new Error(`${res.status}: ${res.statusText}`);
      }

      return res.json();
    })
    .then(res => res);
};

const get = url => {
  return window
    .fetch(url, {
      method: 'GET',
      credentials: 'same-origin',
    })
    .then(res => {
      if (res.status - 200 > 99) {
        throw new Error(`${res.status}: ${res.statusText}`);
      }

      return res.json();
    })
    .then(res => res);
};

export { post, get };

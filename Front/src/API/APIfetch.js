export class APIfetchApi {
  fetchApi(headers, method, body, url) {
    return fetch(url, {
      method,
      headers,
      body: JSON.stringify(body)
    })
      .then((res) => res)
      .then((d) => d)
      .catch((error) => {
        console.log(error);
        return undefined;
      });
  }
}

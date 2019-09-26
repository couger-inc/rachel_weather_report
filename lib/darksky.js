const buildUrl = require('build-url');

class Darksky {
  constructor(endpoint, apiKey) {
    this._endpoint = endpoint;
    this._apiKey = apiKey;
  }

  /**
   * build forecast url.
   * @param {string} latlng latitude,longitude
   * @param {Object} queryParams query parameters
   * @return {string} forecast url
   */
  buildForecastUrl(latlng, queryParams) {
    const baseWithApiKey = buildUrl(this._endpoint, {
      path: this._apiKey,
    });
    const baseWithLatLng = buildUrl(baseWithApiKey, {
      path: latlng,
    });
    return buildUrl(baseWithLatLng, {
      queryParams: queryParams,
    });
  }
}

module.exports = {
  Darksky: Darksky,
};

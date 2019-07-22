const buildUrl = require('build-url');
const logger = require('./logger');

class Infrastructure {
  constructor(apiResponse) {
    // TODO: handling parse error
    this._apiResponse = JSON.parse(apiResponse);
    // TODO: handling out of range
    this._today = this._apiResponse.daily.data[0];
    this._now = this._apiResponse.currently;
  }

  get todaySummary() {
    return this._today.summary;
  }
  get highTemp() {
    return this._today.temperatureHigh;
  }
  get lowTemp() {
    return this._today.temperatureLow;
  }
  get nowSummary() {
    return this._now.summary;
  }
  get nowTemp() {
    return this._now.temperature;
  }

  static sendBody(connection, speechMessage) {
    const body = JSON.stringify({
      speechMessage: speechMessage,
    });
    connection.sendUTF(body);
  }
}

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

  /**
   * Generate speech message.
   * @param {string} nowSummary summary now
   * @param {string} todaySummary summary
   * @param {double} high nowTemp high
   * @param {double} low nowTemp low
   * @param {double} current current nowTemp
   * @return {string} Japanese weather type
   */
  static generateSpeechMessage(nowSummary, todaySummary, high, low, current) {
    // eslint-disable-next-line max-len
    return `只今の天気は、${nowSummary}。${todaySummary}予想最高気温は、${high.toFixed()}度。最低気温は、${low.toFixed()}度。現在の気温は、${current.toFixed()}度です。`;
  }

  static mapIconsJa(key) {
    const icons = {
      'clear-day': '日中晴れ',
      'clear-night': '晴れ',
      'rain': '雨',
      'snow': '雪',
      'sleet': 'みぞれ',
      'wind': '強風',
      'fog': '霧',
      'cloudy': 'くもり',
      'partly-cloudy-day': 'ところによりくもり',
      'partly-cloudy-night': '夜ところによりくもり',
    };
    return icons[key];
  }
}

module.exports = {
  Darksky: Darksky,
  Infrastructure: Infrastructure,
};

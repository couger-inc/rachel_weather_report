const assert = require('assert').strict;
const {Darksky, Infrastructure} = require('../../lib/darksky');

describe('Darksky', () => {
  describe('#buildForecastUrl', () => {
    it('Should build Darksky forecast URL', () => {
      const endpoint = 'https://api.darksky.net/forecast';
      const apiKey = '0123456789';
      const latlng = '35.6828,139.759';
      const queryParams = {
        units: 'si',
        lang: 'ja',
      };
      const darksky = new Darksky(endpoint, apiKey);
      const actual = darksky.buildForecastUrl(latlng, queryParams);
      const expected = 'https://api.darksky.net/forecast/0123456789/35.6828,139.759?units=si&lang=ja';
      assert.equal(actual, expected);
    });
  });

  describe('#generateSpeechMessage', () => {
    it('Should get message', () => {
      const nowIcon = 'cloudy';
      const temperatureHigh = 30.19;
      const temperatureLow = 24.71;
      const temperatureNow = 29.92;
      const actual = Darksky.generateSpeechMessage(
          nowIcon,
          temperatureHigh,
          temperatureLow,
          temperatureNow);
      // eslint-disable-next-line max-len
      const expected = '只今の天気は、くもり。予想最高気温は、30度。最低気温は、25度。現在の気温は、30度です。';
      assert.equal(actual, expected);
    });
  });
});

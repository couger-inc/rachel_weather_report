const assert = require('assert').strict;
const {Darksky} = require('../../lib/darksky');

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
});

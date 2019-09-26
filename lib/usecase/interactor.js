const Result = require('folktale/result');
const {OutputData} = require('../dto/dto');
const {logger} = require('../../lib');

/**
 * Interactor
 */
class Interactor {
  /**
   * Handle interactor
   * @param  {InputData} inputData
   * @param {string} responseFromAPI
   * @return {OutputData}
   */
  handle(inputData, responseFromAPI) {
    const parseJSONWithResult = (stringified) => {
      try {
        const json = JSON.parse(stringified);
        return Result.Ok(json);
      } catch (e) {
        return Result.Error(`failed to parse: ${stringified}`);
      }
    };
    return parseJSONWithResult(responseFromAPI).map((response) => {
      return inputData.matchWith({
        Today: ({}) => {
          const icon = response.currently.icon;
          const now = response.currently.temperature;
          const high = response.daily.data[0].temperatureHigh;
          const low = response.daily.data[0].temperatureLow;
          return OutputData.Today(icon, now, high, low);
        },
        Tomorrow: ({}) => {
          const icon = response.daily.data[1].icon;
          const high = response.daily.data[1].temperatureHigh;
          const low = response.daily.data[1].temperatureLow;
          return OutputData.Tomorrow(icon, high, low);
        },
      });
    }).matchWith({
      Ok: ({value}) => value,
      Error: ({value}) => {
        logger.error.error(value);
        return OutputData.Nothing();
      },
    });
  }
}

module.exports = {
  Interactor: Interactor,
};

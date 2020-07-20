const union = require('folktale/adt/union/union');

const InputData = union('InputData', {
  Today() {},
  Tomorrow() {},
});

/**
 * Input data factory
 * @param {string} messageFromClient
 * @return {InputData}
 */
const inputDataFactory = (messageFromClient) => {
  const parseJSONOrDefault = (stringified, defaultValue) => {
    try {
      return JSON.parse(stringified);
    } catch (e) {
      return defaultValue;
    }
  };
  let result = InputData.Today();
  const message = parseJSONOrDefault(messageFromClient, {type: 'TODAY'});
  switch (message.type) {
    case 'TOMORROW':
      result = InputData.Tomorrow();
      break;
    default: InputData.Today();
      break;
  }
  return result;
};

const OutputData = union('OutputData', {
  Nothing() {},
  Today(icon, now, high, low) {
    return {icon, now, high, low};
  },
  Tomorrow(icon, high, low) {
    return {icon, high, low};
  },
});

module.exports = {
  inputDataFactory: inputDataFactory,
  OutputData: OutputData,
};

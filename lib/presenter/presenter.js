/**
 * Presenter
 */
class Presenter {
  /**
   * Handle presenter
   * @param outputData
   * @return {Object} View Model
   */
  handle(outputData) {
    return outputData.matchWith({
      Today: ({icon, now, high, low}) => {
        const fixedHigh = high.toFixed();
        const fixedLow = low.toFixed();
        const fixedNow = now.toFixed();
        const iconJa = Presenter.mapIconToJa(icon);
        const speechMessage =
          // eslint-disable-next-line max-len
          `只今の天気は、${iconJa}。予想最高気温は、${fixedHigh}度。最低気温は、${fixedLow}度。現在の気温は、${fixedNow}度です。`;
        return {
          type: 'TODAY',
          speechMessage: speechMessage,
          icon: icon,
          iconJa: iconJa,
          high: fixedHigh,
          low: fixedLow,
          now: fixedNow,
        };
      },
      Tomorrow: ({icon, high, low}) => {
        const fixedHigh = high.toFixed();
        const fixedLow = low.toFixed();
        const iconJa = Presenter.mapIconToJa(icon);
        // eslint-disable-next-line max-len
        const speechMessage = `明日の天気は、${iconJa}。予想最高気温は、${fixedHigh}度。最低気温は、${fixedLow}度です。`;
        return {
          type: 'TOMORROW',
          speechMessage: speechMessage,
          icon: icon,
          iconJa: iconJa,
          high: fixedHigh,
          low: fixedLow,
        };
      },
    });
    return result;
  }

  static mapIconToJa(key) {
    const icons = {
      'clear-day': '晴れ',
      'clear-night': '晴れ',
      'rain': '雨',
      'snow': '雪',
      'sleet': 'みぞれ',
      'wind': '強風',
      'fog': '霧',
      'cloudy': 'くもり',
      'partly-cloudy-day': 'ところによりくもり',
      'partly-cloudy-night': 'ところによりくもり',
    };
    return icons[key];
  }
}

module.exports = {
  Presenter: Presenter,
};

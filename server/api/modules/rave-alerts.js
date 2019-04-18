const Parser = require('rss-parser');

const parser = new Parser();
const BASE_URL = 'https://www.getrave.com/rss/oregonstate/channel2';

/**
 * Gets active alerts from RAVE.
 * @returns {Promise<Object[]>}
 */
const getAlerts = async () => {
  try {
    // Rave alerts come as an RSS feed, always containing a single item.
    const { items } = await parser.parseURL(BASE_URL);
    const alert = items[0];

    // Check for the presence of 'all clear' text in the message body
    // 'all clear' indicates that an alert is NOT active and should not be displayed.
    const isAlertActive = !alert.title.match(/all clear/im) && !alert.content.match(/all clear/im);
    const data = isAlertActive ? [alert] : [];

    return data;
  } catch (err) {
    throw err;
  }
};

module.exports = { getAlerts };

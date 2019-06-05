/*
 * We are testing the getAlerts function here indirectly. If that change we need to
 * update this code. The Object.xml data is what the server returns, Object.response
 * is what we get after running our logic.
 */
const alertPresent = {
  xml: `<?xml version="1.0" encoding="UTF-8"?>
    <rss xmlns:dc="http://purl.org/dc/elements/1.1/" version="2.0">
        <channel>
            <title>CVS - Web Test Channel</title>
            <link>http://content.getrave.com/rss/oregonstate/channel2</link>
            <description>RSS feed for web pages - Testing</description>
            <item>
                <title>Weather closure 10/12</title>
                <link />
                <description>Snow causes dangerous road conditions</description>
                <pubDate>Tue, 10 Dec 2018 18:47:39 GMT</pubDate>
                <guid />
                <dc:date>2018-05-29T18:47:39Z</dc:date>
            </item>
        </channel>
    </rss>
  `,
  response: [
    {
      date: '2018-05-29T18:47:39Z',
      title: 'Weather closure 10/12',
      link: '',
      pubDate: 'Tue, 10 Dec 2018 18:47:39 GMT',
      'dc:date': '2018-05-29T18:47:39Z',
      content: 'Snow causes dangerous road conditions',
      contentSnippet: 'Snow causes dangerous road conditions',
      guid: '',
      isoDate: '2018-12-10T18:47:39.000Z'
    }
  ]
};

const alertClear = {
  xml: `<?xml version="1.0" encoding="UTF-8"?>
    <rss xmlns:dc="http://purl.org/dc/elements/1.1/" version="2.0">
        <channel>
            <title>CVS - Web Test Channel</title>
            <link>http://content.getrave.com/rss/oregonstate/channel2</link>
            <description>RSS feed for web pages - Testing</description>
            <item>
                <title>Z - CVS - Homepage - All Clear</title>
                <link />
                <description>All Clear</description>
                <pubDate>Tue, 29 May 2018 18:47:39 GMT</pubDate>
                <guid />
                <dc:date>2018-05-29T18:47:39Z</dc:date>
            </item>
        </channel>
    </rss>
  `,
  response: []
};
module.exports = { alertClear, alertPresent };

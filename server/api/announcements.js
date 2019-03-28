const { Router } = require('express');
const request = require('request-promise');

const baseUrl = 'http://dev-api-dx.pantheonsite.io';
const announcementsUrl = `${baseUrl}/jsonapi/node/announcement?include=field_announcement_image`;

const announcements = Router();

announcements.get('/', async (req, res) => {
  try {
    const { data, included } = await request.get(announcementsUrl, { json: true });
    if (included) {
      included.forEach(item => {
        const matchingAnnouncement = data.find(e => {
          return e.relationships.field_announcement_image.data.id === item.id;
        });
        if (matchingAnnouncement) {
          data[data.indexOf(matchingAnnouncement)].attributes.background_image = `${baseUrl}${
            item.attributes.uri.url
          }`;
        }
      });
    }
    res.send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = announcements;

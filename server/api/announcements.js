const { Router } = require('express');
const request = require('request-promise');

const baseUrl = 'http://dev-api-dx.pantheonsite.io';
const announcementsUrl = `${baseUrl}/jsonapi/node/announcement?include=field_announcement_image&sort=-created`;
const queueUrl = `${baseUrl}/jsonapi/entity_subqueue/announcements`;

const announcements = Router();

const getData = async url => {
  const { data, included } = await request.get(url, { json: true });
  if (included) {
    included.forEach(item => {
      const matchingAnnouncement = data.find(e => {
        return (
          e.relationships.field_announcement_image.data &&
          e.relationships.field_announcement_image.data.id === item.id
        );
      });
      if (matchingAnnouncement) {
        data[data.indexOf(matchingAnnouncement)].attributes.background_image = `${baseUrl}${
          item.attributes.uri.url
        }`;
      }
    });
  }
  return data;
};

announcements.get('/', async (req, res) => {
  try {
    const result = await getData(announcementsUrl);
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

announcements.get('/academic', async (req, res) => {
  const academicUrl = `${queueUrl}/9ff07e4b-ec28-4dfb-8b75-9bbc1ef9d7cb/items?include=field_announcement_image`;
  try {
    const result = await getData(academicUrl);
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

announcements.get('/financial', async (req, res) => {
  const financialUrl = `${queueUrl}/9e3a07b8-4174-4979-990c-c114d2410c29/items?include=field_announcement_image`;
  try {
    const result = await getData(financialUrl);
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = announcements;

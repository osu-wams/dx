//==========================================//
//               /api/services              //
//==========================================//
const { Router } = require('express');
const request = require('request-promise');

const baseUrl = 'http://dev-api-dx.pantheonsite.io';
const servicesUrl = `${baseUrl}/jsonapi/node/services?include=field_service_category,field_icon.field_media_image`;
const categoriesUrl = `${baseUrl}/jsonapi/taxonomy_term/categories?include=field_taxonomy_icon.field_media_image&sort=weight`;

const services = Router();

const getData = async (url, match) => {
  const { data, included } = await request.get(url, { json: true });
  if (included) {
    included.forEach(item => {
      const matchingItem = data.find(e => {
        return e.relationships[match].data && e.relationships[match].data.id === item.id;
      });
      if (matchingItem) {
        const matchingMedia = included.find(e => {
          return e.id === item.relationships.field_media_image.data.id;
        });
        if (matchingMedia) {
          data[
            data.indexOf(matchingItem)
          ].attributes.icon = `${baseUrl}${matchingMedia.attributes.uri.url}`;
        }
      }
    });
  }
  return data;
};

services.get('/', async (req, res) => {
  try {
    let requestUrl = servicesUrl;
    if (req.query.query) {
      requestUrl = `${servicesUrl}&filter[title-filter][condition][path]=title&filter[title-filter][condition][operator]=CONTAINS&filter[title-filter][condition][value]=${req.query.query}`;
    } else if (req.query.category) {
      const categories = req.query.category.split(',');
      requestUrl = `${servicesUrl}&fields[taxonomy_term--categories]=name&filter[and-group][group][conjunction]=AND`;
      for (let i = 0; i < categories.length; i++) {
        requestUrl += `&filter[${categories[i]}][condition][path]=field_service_category.id`;
        requestUrl += `&filter[${categories[i]}][condition][value]=${categories[i]}`;
        if (i == 0) {
          requestUrl += `&filter[${categories[i]}][condition][memberOf]=and-group`;
        }
      }
    }
    const data = await getData(requestUrl, 'field_icon');
    res.send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

services.get('/categories', async (req, res) => {
  try {
    const data = await getData(categoriesUrl, 'field_taxonomy_icon');
    res.send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = services;

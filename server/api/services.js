//==========================================//
//               /api/services              //
//==========================================//
const { Router } = require('express');
const request = require('request-promise');

const servicesUrl =
  'http://dev-api-dx.pantheonsite.io/jsonapi/node/services?include=field_service_category,field_icon';
const servicesByCategoryUrl =
  'http://dev-api-dx.pantheonsite.io/jsonapi/node/services?include=field_service_category,field_icon&fields[taxonomy_term--categories]=name&filter[field_service_category.id]=';
const categoriesUrl = 'http://dev-api-dx.pantheonsite.io/jsonapi/taxonomy_term/categories';

const services = Router();

services.get('/', async (req, res) => {
  try {
    let requestUrl = servicesUrl;
    if (req.query.query) {
      requestUrl = `${servicesUrl}&filter[title-filter][condition][path]=title&filter[title-filter][condition][operator]=CONTAINS&filter[title-filter][condition][value]=${req.query.query}`;
    } else if (req.query.category) {
      requestUrl = `${servicesByCategoryUrl}${req.query.category}`;
    }
    const data = await request.get(requestUrl, { json: true });
    res.send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

services.get('/categories', async (req, res) => {
  try {
    const { data } = await request.get(categoriesUrl, { json: true });
    res.send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = services;

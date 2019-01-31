import { createClient } from 'contentful';

const client = createClient({
  space: 't36t8bar6hrf',
  accessToken: '06cc69a6c4470c98db677b6b64a84c6f31d9d56fd416e458333f6daf43d1503e'
});

const getServices = () =>
  client.getEntries({ content_type: 'service' }).then(entries => entries.items);

const getFeaturedServices = () =>
  client
    .getEntries({ content_type: 'service', 'fields.featured': true })
    .then(entries => entries.items);

const getServiceCategories = () =>
  client.getEntries({ content_type: 'serviceCategory' }).then(entries => entries.items);

export { getServices, getFeaturedServices, getServiceCategories };

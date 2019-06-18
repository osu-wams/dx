const resourcesData = {
  data: [
    {
      id: '2ff0aaa4-5ca2-4adb-beaa-decc8744396f',
      attributes: {
        title: 'Student Jobs'
      },
      relationships: {
        field_icon: {
          data: {
            type: 'media--image',
            id: '351f80a6-77c4-4d26-ba4f-59de040de6b5'
          }
        },
        field_service_category: {
          data: [
            {
              type: 'taxonomy_term--categories',
              id: '1b9b7a4b-5a64-41af-a40a-8bb01abedd19'
            },
            {
              type: 'taxonomy_term--categories',
              id: 'e2730988-0614-43b7-b3ce-0b047e8219e0'
            }
          ]
        }
      }
    }
  ],
  included: [
    {
      type: 'media--image',
      id: '351f80a6-77c4-4d26-ba4f-59de040de6b5',
      attributes: {
        name: 'logo_sites_128px'
      },
      relationships: {
        field_media_image: {
          data: {
            type: 'file--file',
            id: '16a9fe66-eca3-4f59-a7eb-7d04ae12d8fa'
          }
        }
      }
    },
    {
      type: 'file--file',
      id: '16a9fe66-eca3-4f59-a7eb-7d04ae12d8fa',
      attributes: {
        filename: 'logo_sites_128px.png',
        uri: {
          url: '/sites/default/files/2019-05/logo_sites_128px.png'
        }
      }
    }
  ]
};

const categoriesData = {
  data: [
    {
      type: 'taxonomy_term--categories',
      id: '1b9b7a4b-5a64-41af-a40a-8bb01abedd19',
      attributes: {
        name: 'Popular'
      },
      relationships: {
        field_taxonomy_icon: {
          data: {
            type: 'media--image',
            id: 'b23d828b-6e45-45a2-96a7-148757b4c88f'
          }
        }
      }
    }
  ],
  included: [
    {
      type: 'media--image',
      id: 'b23d828b-6e45-45a2-96a7-148757b4c88f',
      attributes: {
        name: 'star'
      },
      relationships: {
        field_media_image: {
          data: {
            type: 'file--file',
            id: 'e7cda0c1-fbb3-4773-a1d0-3dabae8113a6'
          }
        }
      }
    },
    {
      type: 'file--file',
      id: 'e7cda0c1-fbb3-4773-a1d0-3dabae8113a6',
      attributes: {
        filename: 'star.svg',
        uri: {
          url: '/sites/default/files/2019-05/star.svg'
        }
      }
    }
  ]
};

const emptyData = {
  data: []
};

module.exports = { resourcesData, categoriesData, emptyData };

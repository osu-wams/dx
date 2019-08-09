const resourcesData = {
  data: [
    {
      id: '2ff0aaa4-5ca2-4adb-beaa-decc8744396f',
      attributes: {
        title: 'Student Jobs',
        icon: 'http://dev-api-dx.pantheonsite.io/sites/default/files/2019-05/logo_sites_128px.png',
        field_service_url: {
          uri:
            'https://jobs.oregonstate.edu/postings/search?utf8=&query=&query_v0_posted_at_date=&query_position_type_id=5&query_organizational_tier_3_id=any&1970=&1971=&225=&commit=Search',
          title: ''
        }
      }
    },
    {
      id: '825d22a1-938c-4ca7-8b9d-625a639bcdde',
      attributes: {
        title: 'Billing Information',
        icon: 'http://dev-api-dx.pantheonsite.io/sites/default/files/2019-05/money-bill-wave.svg',
        field_service_url: {
          uri: 'http://fa.oregonstate.edu/business-affairs/studentbilling',
          title: ''
        }
      }
    }
  ]
};

const resourcesDataByCategory = {
  data: [
    {
      id: '825d22a1-938c-4ca7-8b9d-625a639bcdde',
      attributes: {
        title: 'Billing Information',
        icon: 'http://dev-api-dx.pantheonsite.io/sites/default/files/2019-05/money-bill-wave.svg',
        field_service_url: {
          uri: 'http://fa.oregonstate.edu/business-affairs/studentbilling',
          title: ''
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
        name: 'Popular',
        icon: 'http://dev-api-dx.pantheonsite.io/sites/default/files/2019-05/star.svg'
      }
    },
    {
      type: 'taxonomy_term--categories',
      id: '2cd0a3c4-a7f1-4080-bf2e-e458559de2a3',
      attributes: {
        name: 'Academic',
        icon: 'http://dev-api-dx.pantheonsite.io/sites/default/files/2019-05/graduation-cap.svg'
      }
    },
    {
      type: 'taxonomy_term--categories',
      id: 'e2730988-0614-43b7-b3ce-0b047e8219e0',
      attributes: {
        name: 'Financial',
        icon: 'http://dev-api-dx.pantheonsite.io/sites/default/files/2019-05/hands-usd.svg'
      }
    }
  ]
};

const defaultCategory = '1b9b7a4b-5a64-41af-a40a-8bb01abedd19';

export { resourcesData, resourcesDataByCategory, categoriesData, defaultCategory };

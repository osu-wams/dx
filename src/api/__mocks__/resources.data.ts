const resourcesData = {
  data: [
    {
      audiences: ['First Year', 'Bend'],
      id: '2ff0aaa4-5ca2-4adb-beaa-decc8744396f',
      title: 'Student Jobs',
      icon: 'http://dev-api-dx.pantheonsite.io/sites/default/files/2019-05/logo_sites_128px.png',
      uri:
        'https://jobs.oregonstate.edu/postings/search?utf8=&query=&query_v0_posted_at_date=&query_position_type_id=5&query_organizational_tier_3_id=any&1970=&1971=&225=&commit=Search'
    },
    {
      audiences: ['Graduate Student', 'International Student', 'Ecampus', 'Corvallis'],
      id: '825d22a1-938c-4ca7-8b9d-625a639bcdde',
      title: 'Billing Information',
      icon: 'http://dev-api-dx.pantheonsite.io/sites/default/files/2019-05/money-bill-wave.svg',
      uri: 'http://fa.oregonstate.edu/business-affairs/studentbilling'
    }
  ],
  loading: false,
  error: false
};

const resourcesDataByCategory = {
  data: [
    {
      audiences: [],
      id: '825d22a1-938c-4ca7-8b9d-625a639bcdde',
      title: 'Billing Information',
      icon: 'http://dev-api-dx.pantheonsite.io/sites/default/files/2019-05/money-bill-wave.svg',
      uri: 'http://fa.oregonstate.edu/business-affairs/studentbilling'
    }
  ],
  loading: false,
  error: false
};

const categoriesData = {
  data: [
    {
      id: '6b7cd598-d71e-45f7-911c-d71551ec0a7c',
      name: 'Featured',
      icon: 'http://dev-api-dx.pantheonsite.io/sites/default/files/2019-05/star.svg'
    },
    {
      id: '2cd0a3c4-a7f1-4080-bf2e-e458559de2a3',
      name: 'Academic',
      icon: 'http://dev-api-dx.pantheonsite.io/sites/default/files/2019-05/graduation-cap.svg'
    },
    {
      id: 'e2730988-0614-43b7-b3ce-0b047e8219e0',
      name: 'Financial',
      icon: 'http://dev-api-dx.pantheonsite.io/sites/default/files/2019-05/hands-usd.svg'
    }
  ],
  loading: false,
  error: false
};

const defaultCategory = 'Featured';

export { resourcesData, resourcesDataByCategory, categoriesData, defaultCategory };

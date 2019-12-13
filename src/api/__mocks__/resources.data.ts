// Reusable array for both Resources and ResourcesCard
const resourcesArray = [
  {
    id: '1',
    title: 'Bend Testo Success Center',
    link: 'https://success.oregonstate.edu/',
    icon: 'https://data.dx.oregonstate.edu/sites/default/files/2019-05/badge-check.svg',
    audiences: ['Bend'],
    affiliation: [],
    categories: ['Featured'],
    synonyms: ['help', 'tutoring', 'writing', 'math']
  },
  {
    id: '2',
    title: 'Academics for Student Athletes',
    link: 'https://studentathlete.oregonstate.edu/',
    icon: 'https://data.dx.oregonstate.edu/sites/default/files/2019-05/running.svg',
    audiences: [],
    affiliation: ['student', 'employee'],
    categories: ['Academic'],
    synonyms: []
  },
  {
    id: '3',
    title: 'Billing Information',
    link: 'https://oregonstate.edu/bill',
    icon: 'https://data.dx.oregonstate.edu/sites/default/files/2019-05/align-justify.svg',
    audiences: ['Corvallis'],
    affiliation: [],
    categories: ['Featured', 'Financial'],
    synonyms: ['boo']
  },
  {
    id: '4',
    title: 'Student Jobs',
    link: 'https://testo.com',
    icon: 'https://data.dx.oregonstate.edu/sites/default/files/2019-05/align-justify.svg',
    audiences: ['Corvallis'],
    categories: ['Financial'],
    affiliation: ['student'],
    synonyms: ['boo']
  },
  {
    id: '5',
    title: 'Listservs',
    link: 'https://oregonstate.edu/bill',
    icon: 'https://data.dx.oregonstate.edu/sites/default/files/2019-05/align-justify.svg',
    audiences: ['Corvallis'],
    affiliation: ['employee'],
    categories: ['Financial'],
    synonyms: []
  },
  {
    id: '6',
    title: 'Employee Only',
    link: 'https://oregonstate.edu/bill',
    icon: 'https://data.dx.oregonstate.edu/sites/default/files/2019-05/align-justify.svg',
    audiences: ['Corvallis'],
    affiliation: ['employee'],
    categories: ['Featured'],
    synonyms: []
  }
];

const resourcesData = {
  data: resourcesArray,
  loading: false,
  error: false
};

const resourcesCardData = {
  data: {
    entityQueueTitle: 'Featured',
    items: resourcesArray
  },
  loading: false,
  error: false
};

const resourcesDataByCategory = {
  data: [
    {
      audiences: [],
      affiliation: [],
      id: '825d22a1-938c-4ca7-8b9d-625a639bcdde',
      title: 'Billing Information',
      icon: 'http://dev-api-dx.pantheonsite.io/sites/default/files/2019-05/money-bill-wave.svg',
      link: 'http://fa.oregonstate.edu/business-affairs/studentbilling'
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

export {
  resourcesData,
  resourcesDataByCategory,
  categoriesData,
  defaultCategory,
  resourcesCardData
};

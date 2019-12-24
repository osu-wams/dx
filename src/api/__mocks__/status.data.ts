export default {
  data: [
    {
      id: 1,
      name: 'Banner',
      description: 'Includes Banner HRIS, Banner Student, and other systems.',
      statusText: 'Operational',
      status: 1,
      updatedAt: '2018-09-26 14:37:52',
      incidents: []
    },
    {
      id: 2,
      name: 'G Suite',
      description: "Google's suite of productivity tools including Docs, Sheets, Forms and more.",
      statusText: 'Major Outage',
      status: 4,
      updatedAt: '2019-11-05 10:33:11',
      incidents: [
        {
          id: 29,
          name: 'G Suite No Longer a G',
          message: 'G Suite outage',
          duration: 38775841,
          isResolved: false,
          status: 3,
          statusText: 'Watching',
          permalink: 'https://status.is.oregonstate.edu/incidents/29',
          updatedAt: '2018-09-26 14:36:10'
        }
      ]
    },
    {
      id: 4,
      name: 'Canvas',
      description: 'OSU’s learning management system',
      statusText: 'Operational',
      status: 1,
      updatedAt: '2019-11-06 17:45:56',
      incidents: []
    },
    {
      id: 5,
      name: 'Box',
      description: 'Storage',
      statusText: 'Performance Issues',
      status: 2,
      updatedAt: '2019-11-06 17:45:56',
      incidents: []
    }
  ],
  loading: false,
  error: false
};

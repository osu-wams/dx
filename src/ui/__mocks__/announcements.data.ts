const announcementsData = {
  data: [
    {
      id: '12345',
      date: null,
      title: 'Announcement test title 1',
      body: 'Announcement test body text 1',
      bg_image: 'http://example.oregonstate.edu/sites/default/files/2019-03/example_image_0.jpg',
      action: {
        title: 'Announcement link title',
        link: 'https://oregonstate.edu'
      }
    },
    {
      id: '67890',
      date: null,
      title: 'Announcement test title 2',
      body: 'Announcement test body text 2',
      action: {
        title: null,
        link: null
      }
    }
  ],
  loading: false,
  error: false
};

const localistData = {
  data: [
    {
      event: {
        title: 'Localist test title 1',
        photo_url: 'http://example.oregonstate.edu/sites/default/files/2019-03/example_image_0.jpg',
        localist_url: 'https://events.oregonstate.edu/event/intro_to_media_workshop_2369',
        event_instances: [
          {
            event_instance: {
              id: '13579'
            }
          }
        ]
      }
    }
  ],
  loading: false,
  error: false
};

export { announcementsData, localistData };

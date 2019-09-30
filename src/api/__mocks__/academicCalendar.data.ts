// for testing 3 items
const academicCalendar3 = {
  data: [
    {
      title: 'Testo Event',
      link: 'https://events.oregonstate.edu/event/week_zero_summer_session_ends',
      pubDate: new Date(),
      content: 'Week Zero Summer Session Ends',
      contentSnippet: 'Week Zero Summer Session Ends',
      isoDate: new Date()
    },
    {
      title: '11-week session beigns',
      link: 'https://events.oregonstate.edu/event/11-week_session_beigns_1572',
      pubDate: 'Mon, 24 Jun 2019 00:00:00 -0700',
      content: '11-week session begins',
      contentSnippet: '11-week session begins',
      isoDate: '2019-06-24T07:00:00.000Z'
    },
    {
      title: '8-week session begins',
      link: 'https://events.oregonstate.edu/event/8-week_session_begins_741',
      pubDate: 'Mon, 24 Jun 2019 00:00:00 -0700',
      content: '8-week session beigns',
      contentSnippet: '8-week session beigns',
      isoDate: '2019-06-24T07:00:00.000Z'
    }
  ],
  loading: false,
  error: false
};

// For testing more than 5 items
const academicCalendar6 = {
  data: [
    {
      title: 'Week Zero Summer Session Ends',
      link: 'https://events.oregonstate.edu/event/week_zero_summer_session_ends',
      pubDate: 'Fri, 21 Jun 2019 00:00:00 -0700',
      content: 'Week Zero Summer Session Ends',
      contentSnippet: 'Week Zero Summer Session Ends',
      isoDate: new Date()
    },
    {
      title: '11-week session beigns',
      link: 'https://events.oregonstate.edu/event/11-week_session_beigns_1572',
      pubDate: 'Mon, 24 Jun 2019 00:00:00 -0700',
      content: '11-week session begins',
      contentSnippet: '11-week session begins',
      isoDate: '2019-06-24T07:00:00.000Z'
    },
    {
      title: '8-week session begins',
      link: 'https://events.oregonstate.edu/event/8-week_session_begins_741',
      pubDate: 'Mon, 24 Jun 2019 00:00:00 -0700',
      content: '8-week session beigns',
      contentSnippet: '8-week session beigns',
      isoDate: '2019-06-24T07:00:00.000Z'
    },
    {
      title: 'Testo Event',
      link: 'https://events.oregonstate.edu/event/week_zero_summer_session_ends',
      pubDate: 'Fri, 21 Jun 2019 00:00:00 -0700',
      content: 'Week Zero Summer Session Ends',
      contentSnippet: 'Week Zero Summer Session Ends',
      isoDate: '2019-06-21T07:00:00.000Z'
    },
    {
      title: '11-week test',
      link: 'https://events.oregonstate.edu/event/11-week_session_beigns_1572',
      pubDate: 'Mon, 24 Jun 2019 00:00:00 -0700',
      content: '11-week session begins',
      contentSnippet: '11-week session begins',
      isoDate: '2019-06-24T07:00:00.000Z'
    },
    {
      title: 'Testo',
      link: 'https://events.oregonstate.edu/event/8-week_session_begins_741',
      pubDate: 'Mon, 24 Jun 2019 00:00:00 -0700',
      content: '8-week session beigns',
      contentSnippet: '8-week session beigns',
      isoDate: '2019-06-24T07:00:00.000Z'
    }
  ],
  loading: false,
  error: false
};

export { academicCalendar6, academicCalendar3 };

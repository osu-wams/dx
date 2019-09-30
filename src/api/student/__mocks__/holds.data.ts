export default {
  data: [
    {
      id: '123-BOGUS-ID',
      type: 'holds',
      attributes: {
        holds: [
          {
            description: 'Bill is overdue',
            fromDate: '2019-12-31',
            reason: 'CS 161',
            toDate: '2020-12-31'
          }
        ]
      },
      links: {
        self: null
      }
    }
  ],
  loading: false, 
  error: false
};

export default {
  data: [
    {
      id: '123-BOGUS-ID',
      type: 'academic-status',
      attributes: {
        academicStanding: 'Good Standing',
        term: '201803',
        termDescription: 'Spring 2018',
        gpa: [
          {
            gpa: '3.44',
            gpaCreditHours: 13,
            gpaType: 'Institution',
            creditHoursAttempted: 13,
            creditHoursEarned: 13,
            creditHoursPassed: 13,
            level: 'Undergraduate',
            qualityPoints: '44.80'
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

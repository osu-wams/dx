export default {
  data: {
    type: 'account-transactions',
    id: '123-BOGUS-ID',
    links: {
      self: null
    },
    attributes: {
      transactions: [
        {
          amount: 3417.97,
          description: 'Web eCheck Payment',
          entryDate: '2018-04-21T09:22:12Z',
          category: 'Cash, Check, Credit Card',
          term: '201803',
          transactionType: 'payment'
        },
        {
          amount: 381.23,
          description: 'Incidental Fee',
          entryDate: '2018-03-24T23:47:03Z',
          category: 'Registration Fees',
          term: '201803',
          transactionType: 'charge'
        },
        {
          amount: 111.78,
          description: 'Student Health Service Fee',
          entryDate: '2018-03-24T23:47:03Z',
          category: 'Registration Fees',
          term: '201803',
          transactionType: 'charge'
        },
        {
          amount: 2540,
          description: 'R Undergrad EngineeringTuition',
          entryDate: '2018-03-24T23:47:03Z',
          category: 'Registration Tuition',
          term: '201803',
          transactionType: 'charge'
        },
        {
          amount: 40,
          description: 'Building Fee',
          entryDate: '2018-03-24T23:47:03Z',
          category: 'Registration Fees',
          term: '201803',
          transactionType: 'charge'
        },
        {
          amount: -1116,
          description: 'R Undergrad EngineeringTuition',
          entryDate: '2017-09-28T01:16:11Z',
          category: 'Registration Tuition',
          term: '201801',
          transactionType: 'charge'
        },
        {
          amount: 1612,
          description: 'Ford Loan-Subsidized',
          entryDate: '2017-09-13T05:30:50Z',
          category: 'Financial Aid',
          term: '201801',
          transactionType: 'payment'
        }
      ]
    }
  },
  loading: false,
  error: false
};

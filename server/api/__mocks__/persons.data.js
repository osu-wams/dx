const personsData = {
  data: {
    id: '111',
    type: 'person',
    attributes: {
      birthDate: '1998-10-14',
      firstName: 'Testo',
      middleName: 'D',
      lastName: 'Smith',
      previousRecords: [],
      homePhone: null,
      alternatePhone: null,
      osuUID: '12345',
      primaryPhone: null,
      mobilePhone: null,
      currentStudent: true,
      currentEmployee: true,
      employeeStatus: 'A',
      email: 'testo@oregonstate.edu',
      username: 'testo',
      confidential: false
    },
    links: {
      self: 'https://oregonstateuniversity-test.apigee.net/v1/persons/111'
    }
  }
};

module.exports = { personsData };

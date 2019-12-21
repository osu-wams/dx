const personsData = {
  loading: false,
  error: false,
  data: {
    id: '123',
    birthDate: '1980-09-10',
    firstName: 'Testo',
    preferredName: '',
    middleName: null,
    lastName: 'Last',
    previousRecords: [],
    homePhone: '1234phone',
    alternatePhone: null,
    osuUID: '123456',
    primaryPhone: '1234phone',
    mobilePhone: '1234phone',
    currentStudent: false,
    currentEmployee: true,
    employeeStatus: 'A',
    email: 'testo.last@oregonstate.edu',
    username: 'testol',
    confidential: false
  }
};

const preferredName = {
  data: {
    id: '12345',
    alternatePhone: null,
    birthDate: '1973-02-08',
    citizen: null,
    confidential: false,
    currentEmployee: false,
    currentStudent: false,
    email: null,
    employeeStatus: null,
    firstName: 'FirstName',
    homePhone: '1234home',
    lastName: 'Testo',
    middleName: null,
    mobilePhone: '1234mobile',
    osuUID: null,
    displayFirstName: 'displayFirstName',
    displayLastName: 'displayLastName',
    displayMiddleName: 'displayMiddleName',
    previousRecords: [],
    primaryPhone: '1234mobile',
    sex: 'F',
    ssnStatus: 'vault',
    username: null
  },
  loading: false,
  error: false
};

const preferredFirstName = {
  data: {
    id: '12345',
    alternatePhone: null,
    birthDate: '1973-02-08',
    citizen: null,
    confidential: false,
    currentEmployee: false,
    currentStudent: false,
    email: null,
    employeeStatus: null,
    firstName: 'FirstName',
    homePhone: '1234home',
    lastName: 'Testo',
    middleName: null,
    mobilePhone: '1234mobile',
    osuUID: null,
    displayFirstName: 'displayFirstName',
    displayLastName: null,
    displayMiddleName: null,
    previousRecords: [],
    primaryPhone: '1234mobile',
    sex: 'F',
    ssnStatus: 'vault',
    username: null
  },
  loading: false,
  error: false
};

const nullName = {
  data: {
    id: null,
    alternatePhone: null,
    birthDate: '1973-02-08',
    citizen: null,
    confidential: false,
    currentEmployee: false,
    currentStudent: false,
    email: null,
    employeeStatus: null,
    firstName: null,
    homePhone: '1234home',
    lastName: 'Testo',
    middleName: null,
    mobilePhone: '1234mobile',
    osuUID: null,
    preferredName: 'Preferred',
    previousRecords: [],
    primaryPhone: '1234primary',
    sex: 'F',
    ssnStatus: 'vault',
    username: null
  },
  loading: false,
  error: false
};

export { personsData, nullName, preferredFirstName, preferredName };

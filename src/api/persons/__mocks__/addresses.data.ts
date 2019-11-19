const personsMailingAddressData = {
  data: {
    id: '111',
    type: 'addresses',
    attributes: {
      addressType: 'CM',
      addressTypeDescription: 'Current Mailing',
      addressLine1: 'Bogus 1st Ave SW',
      addressLine2: null,
      addressLine3: null,
      addressLine4: null,
      houseNumber: null,
      city: 'Corvallis',
      stateCode: 'OR',
      state: 'Oregon',
      postalCode: '97321-1907',
      countyCode: '41043',
      county: 'Linn',
      nationCode: null,
      nation: null,
      lastModified: '2019-02-24'
    },
    links: null
  },
  loading: false,
  error: false
};

const personsMinimalAddressData = {
  data: {
    id: '111',
    type: 'addresses',
    attributes: {
      addressType: 'CM',
      addressTypeDescription: null,
      addressLine1: 'Bogus 1st Ave SW',
      addressLine2: null,
      addressLine3: null,
      addressLine4: null,
      houseNumber: null,
      city: null,
      stateCode: null,
      state: null,
      postalCode: null,
      countyCode: '41043',
      county: 'Linn',
      nationCode: null,
      nation: null,
      lastModified: '2019-02-24'
    },
    links: null
  },
  loading: false,
  error: false
};

export { personsMailingAddressData, personsMinimalAddressData };

const Url = {
  osuMap: {
    main: 'http://map.oregonstate.edu',
  },
  osuDirectory: {
    main: 'http://directory.oregonstate.edu/?type=search&cn=',
    person: 'http://directory.oregonstate.edu/?type=showfull&osuUid=',
  },
  myDegrees: {
    main: 'https://mydegrees.oregonstate.edu:7447/dashboard/',
  },
  canvas: {
    main: 'https://canvas.oregonstate.edu',
    mainOld: 'https://oregonstate.instructure.com',
    betaOld: 'https://oregonstate.beta.instructure.com',
    testOld: 'https://oregonstate.test.instructure.com',
  },
  campusMap: {
    main: 'https://map.oregonstate.edu/',
    building: 'https://map.oregonstate.edu/?building=',
  },
  events: {
    academicCalendar: 'https://registrar.oregonstate.edu/osu-academic-calendar',
  },
  banner: {
    financialTransactions:
      'https://xe.ucsadm.oregonstate.edu:9990/ssomanager/c/SSB?pkg=OSU_ARWEB.P_ViewBillDate',
    studentProfile: 'https://xe.ucsadm.oregonstate.edu:8890/StudentSelfService/ssb/studentProfile',
    editProfile:
      'https://xe.ucsadm.oregonstate.edu:9990/ssomanager/c/SSB?pkg=twbkwbis.P_GenMenu?name=bmenu.P_GenMnu',
  },
  myosu: {
    main: 'https://myosu.oregonstate.edu/',
  },
  bill: {
    main: 'http://mybill.oregonstate.edu',
  },
  support: {
    main:
      'https://oregonstate.teamdynamix.com/TDClient/1935/Portal/Requests/TicketRequests/NewForm?ID=ZpgUdtILMxQ_',
  },
  // Used to be qualtrix, we might need to remove this at some point
  // Now it's a copy of support.main above
  feedback: {
    main:
      'https://oregonstate.teamdynamix.com/TDClient/1935/Portal/Requests/TicketRequests/NewForm?ID=ZpgUdtILMxQ_',
    // main: 'https://oregonstate.qualtrics.com/jfe/form/SV_73vMvyQZBQx8aaN?type=feedback',
  },
  registrar: {
    academicStanding: 'https://registrar.oregonstate.edu/grades-honor-roll-academic-standing',
  },
  empcenter: {
    main: 'https://osu.workforcehosting.com/',
  },
  evals: {
    main: 'https://evals.oregonstate.edu/',
  },
  itSystemStatus: {
    main: 'https://status.is.oregonstate.edu',
  },
  gettingStarted: {
    main: 'https://oregonstate.teamdynamix.com/TDClient/1935/Portal/KB/?CategoryID=18200',
  },
};

export default Url;

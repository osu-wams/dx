const todayUTC = Date.now();
const currentBeginDate = new Date(todayUTC - 1000 * 60 * 60 * 24).toISOString().slice(0, 10);
const currentEndDate = new Date(todayUTC).toISOString().slice(0, 10);
const beginPastDate = new Date(todayUTC - 1000 * 60 * 60 * 24 * 10).toISOString().slice(0, 10);
const endPastDate = new Date(todayUTC - 1000 * 60 * 60 * 24 * 5).toISOString().slice(0, 10);

export default {
  data: [
    {
      type: 'class-schedule',
      id: 'bogus-id-1',
      links: {
        self: null
      },
      attributes: {
        academicYear: '1718',
        academicYearDescription: 'Academic Year 2017-18',
        courseReferenceNumber: '17342',
        courseSubject: 'WR',
        courseSubjectDescription: 'Written English',
        courseNumber: '214',
        courseTitle: '*WRITING IN BUSINESS',
        sectionNumber: '004',
        term: '201801',
        termDescription: 'Fall 2017',
        scheduleDescription: 'Lecture',
        scheduleType: 'A',
        creditHours: 3,
        registrationStatus: '**Web Registered**',
        gradingMode: 'Normal Grading Mode',
        continuingEducation: false,
        faculty: [
          {
            osuId: '123456789',
            name: 'Delf, Elizabeth',
            email: '123456789@oregonstate.edu',
            primary: true
          }
        ],
        meetingTimes: [
          {
            beginDate: currentBeginDate,
            beginTime: '10:00:00',
            endDate: currentEndDate,
            endTime: '10:50:00',
            room: '123',
            building: 'SMB',
            buildingDescription: 'Some Building',
            campus: ' Bend',
            hoursPerWeek: 2.5,
            creditHourSession: 3,
            scheduleType: 'A',
            scheduleDescription: 'Lecture',
            weeklySchedule: ['M', 'T', 'W', 'Th', 'F', 'Sa', 'Su']
          }
        ]
      }
    },
    {
      type: 'class-schedule',
      id: 'bogus-id-2',
      links: {
        self: null
      },
      attributes: {
        academicYear: '1718',
        academicYearDescription: 'Academic Year 2017-18',
        courseReferenceNumber: '18513',
        courseSubject: 'PH',
        courseSubjectDescription: 'Physics',
        courseNumber: '222',
        courseTitle: 'RECITATION FOR PHYSICS 212',
        sectionNumber: '002',
        term: '201801',
        termDescription: 'Fall 2017',
        scheduleDescription: 'Recitation',
        scheduleType: 'C',
        creditHours: 1,
        registrationStatus: '**Web Registered**',
        gradingMode: 'Pass/No Pass Grading Mode',
        continuingEducation: false,
        faculty: [
          {
            osuId: '123456789',
            name: 'Jansen, Henri',
            email: '123456789@physics.oregonstate.edu',
            primary: true
          }
        ],
        meetingTimes: [
          {
            beginDate: currentBeginDate,
            beginTime: '09:00:00',
            endDate: currentEndDate,
            endTime: '09:50:00',
            room: '285',
            building: 'WNGR',
            buildingDescription: 'Every Day Test',
            campus: ' Oregon State - Corvallis',
            hoursPerWeek: 0.83,
            creditHourSession: 1,
            scheduleType: 'C',
            scheduleDescription: 'Recitation',
            weeklySchedule: ['M', 'T', 'W', 'Th', 'F', 'Sa', 'Su']
          }
        ]
      }
    },
    {
      type: 'class-schedule',
      id: 'bogus-id-3',
      links: {
        self: null
      },
      attributes: {
        academicYear: '1718',
        academicYearDescription: 'Academic Year 2017-18',
        courseReferenceNumber: '23908',
        courseSubject: 'CS',
        courseSubjectDescription: 'Computer Science',
        courseNumber: '262',
        courseTitle: 'DATA SUPER STRUCTURES',
        sectionNumber: '002',
        term: '201801',
        termDescription: 'Fall 2017',
        scheduleDescription: 'Lecture',
        scheduleType: 'A',
        creditHours: 4,
        registrationStatus: '**Web Registered**',
        gradingMode: 'Normal Grading Mode',
        continuingEducation: false,
        faculty: [
          {
            osuId: '123456789',
            name: 'Hess, Robin',
            email: '123456789@oregonstate.edu',
            primary: true
          }
        ],
        meetingTimes: [
          {
            beginDate: currentBeginDate,
            beginTime: '09:30:00',
            endDate: currentEndDate,
            endTime: '11:20:00',
            room: '305',
            building: 'PHAR',
            buildingDescription: 'Pharmacy Building',
            campus: ' Oregon State - Corvallis',
            hoursPerWeek: 1.83,
            creditHourSession: 0,
            scheduleType: 'FNL',
            scheduleDescription: 'Final Exam',
            weeklySchedule: ['M'] // every day so we can test display
          },
          {
            beginDate: currentBeginDate,
            beginTime: '11:00:00',
            endDate: currentBeginDate,
            endTime: '11:50:00',
            room: '305',
            building: 'PHAR',
            buildingDescription: 'Pharmacy Building',
            campus: ' Oregon State - Corvallis',
            hoursPerWeek: 2.5,
            creditHourSession: 4,
            scheduleType: 'A',
            scheduleDescription: 'Lecture',
            weeklySchedule: ['M', 'W', 'F']
          }
        ]
      }
    },
    {
      type: 'class-schedule',
      id: 'bogus-id-4',
      links: {
        self: null
      },
      attributes: {
        academicYear: '1718',
        academicYearDescription: 'Academic Year 2017-18',
        courseReferenceNumber: '23909',
        courseSubject: 'CS',
        courseSubjectDescription: 'Computer Science',
        courseNumber: '261',
        courseTitle: 'DATA STRUCTURES',
        sectionNumber: '016',
        term: '201801',
        termDescription: 'Fall 2017',
        scheduleDescription: 'Recitation',
        scheduleType: 'C',
        creditHours: 0,
        registrationStatus: '**Web Registered**',
        gradingMode: 'Normal Grading Mode',
        continuingEducation: false,
        faculty: [
          {
            osuId: '123456789',
            name: 'Hess, Robin',
            email: 'testo@oregonstate.edu',
            primary: true
          }
        ],
        meetingTimes: [
          {
            beginDate: currentBeginDate,
            beginTime: '10:00:00',
            endDate: currentEndDate,
            endTime: '10:50:00',
            room: '110',
            building: 'STAG',
            buildingDescription: 'Strand Agriculture Hall',
            campus: ' Oregon State - Corvallis',
            hoursPerWeek: 0.83,
            creditHourSession: 0,
            scheduleType: 'C',
            scheduleDescription: 'Recitation',
            weeklySchedule: ['T']
          }
        ]
      }
    },
    {
      type: 'class-schedule',
      id: 'bogus-id-5',
      links: {
        self: null
      },
      attributes: {
        academicYear: '1718',
        academicYearDescription: 'Academic Year 2017-18',
        courseReferenceNumber: '24254',
        courseSubject: 'CS',
        courseSubjectDescription: 'Computer Science',
        courseNumber: '290',
        courseTitle: 'WEB DEVELOPMENT',
        sectionNumber: '001',
        term: '201801',
        termDescription: 'Fall 2017',
        scheduleDescription: 'Lecture',
        scheduleType: 'A',
        creditHours: 4,
        registrationStatus: '**Web Registered**',
        gradingMode: 'Normal Grading Mode',
        continuingEducation: false,
        faculty: [
          {
            osuId: '123456789',
            name: 'LAstBame, Robin',
            email: 'testo@oregonstate.edu',
            primary: true
          }
        ],
        meetingTimes: [
          {
            beginDate: currentBeginDate,
            beginTime: '15:00:00',
            endDate: currentEndDate,
            endTime: '15:50:00',
            room: '210',
            building: 'LINC',
            buildingDescription: 'Learning Innovation Center',
            campus: ' Oregon State - Corvallis',
            hoursPerWeek: 2.5,
            creditHourSession: 4,
            scheduleType: 'A',
            scheduleDescription: 'Lecture',
            weeklySchedule: ['M', 'W', 'F']
          }
        ]
      }
    },
    {
      type: 'class-schedule',
      id: 'bogus-id-6',
      links: {
        self: null
      },
      attributes: {
        academicYear: '1718',
        academicYearDescription: 'Academic Year 2017-18',
        courseReferenceNumber: '25222',
        courseSubject: 'PH',
        courseSubjectDescription: 'Physics',
        courseNumber: '212',
        courseTitle: 'TESTO PHYSICS',
        sectionNumber: '070',
        term: '201801',
        termDescription: 'Fall 2017',
        scheduleDescription: 'Lecture Testo',
        scheduleType: 'A',
        creditHours: 4,
        registrationStatus: '**Web Registered**',
        gradingMode: 'Normal Grading Mode',
        continuingEducation: false,
        faculty: [
          {
            osuId: '1234567891',
            name: 'Jansen, Henri',
            email: '123456789@physics.oregonstate.edu',
            primary: false
          },
          {
            osuId: '1234567892',
            name: 'Ketter, James',
            email: '123456789@physics.oregonstate.edu',
            primary: false
          },
          {
            osuId: '1234567893',
            name: 'Bannon, David',
            email: '123456789@physics.oregonstate.edu',
            primary: true
          },
          {
            osuId: '1234567894',
            name: 'Hadley, Kathryn',
            email: '123456789@oregonstate.edu',
            primary: false
          }
        ],
        meetingTimes: [
          {
            beginDate: currentBeginDate,
            beginTime: '16:00:00',
            endDate: currentEndDate,
            endTime: '16:50:00',
            room: '151',
            building: 'WNGR',
            buildingDescription: 'Library',
            campus: ' Oregon State - Corvallis',
            hoursPerWeek: 1.66,
            creditHourSession: 4,
            scheduleType: 'A',
            scheduleDescription: 'Lecture',
            weeklySchedule: ['M', 'T', 'W', 'Th', 'F', 'Sa', 'Su']
          },
          {
            beginDate: currentEndDate,
            beginTime: '09:00:00',
            endDate: currentEndDate, // intentionally matching date to endDate, the exam is on one day
            endTime: '09:50:00',
            room: 'FNL',
            building: 'GRP',
            buildingDescription: 'Group Events',
            campus: ' Oregon State - Corvallis',
            hoursPerWeek: 1.83,
            creditHourSession: 0,
            scheduleType: 'FNL',
            scheduleDescription: 'Final Exam',
            weeklySchedule: ['F']
          },
          {
            beginDate: currentBeginDate,
            beginTime: '20:30:00',
            endDate: currentEndDate,
            endTime: '21:50:00',
            room: 'MID',
            building: 'GRP',
            buildingDescription: 'Group Events',
            campus: ' Oregon State - Corvallis',
            hoursPerWeek: 1.33,
            creditHourSession: 0,
            scheduleType: 'A',
            scheduleDescription: 'Lecture',
            weeklySchedule: ['M', 'T', 'W', 'Th', 'F', 'Sa', 'Su']
          }
        ]
      }
    },
    {
      type: 'class-schedule',
      id: 'bogus-id-7',
      links: {
        self: null
      },
      attributes: {
        academicYear: '1718',
        academicYearDescription: 'Academic Year 2017-18',
        courseReferenceNumber: '25226',
        courseSubject: 'PH',
        courseSubjectDescription: 'Physics',
        courseNumber: '212',
        courseTitle: '*GENERAL PHYSICS WITH CALCULUS',
        sectionNumber: '074',
        term: '201801',
        termDescription: 'Fall 2017',
        scheduleDescription: 'Studio',
        scheduleType: 'R',
        creditHours: 0,
        registrationStatus: '**Web Registered**',
        gradingMode: 'Normal Grading Mode',
        continuingEducation: false,
        faculty: [
          {
            osuId: '1234567891',
            name: 'Jansen, Henri',
            email: '123456789@physics.oregonstate.edu',
            primary: false
          },
          {
            osuId: '1234567892',
            name: 'Ketter, James',
            email: '123456789@physics.oregonstate.edu',
            primary: false
          },
          {
            osuId: '1234567893',
            name: 'Bannon, David',
            email: '123456789@physics.oregonstate.edu',
            primary: true
          },
          {
            osuId: '1234567894',
            name: 'Hadley, Kathryn',
            email: '123456789@oregonstate.edu',
            primary: false
          }
        ],
        meetingTimes: [
          {
            beginDate: currentBeginDate,
            beginTime: '14:00:00',
            endDate: currentEndDate,
            endTime: '15:50:00',
            room: '212',
            building: 'WNGR',
            buildingDescription: 'Weniger Hall',
            campus: ' Oregon State - Corvallis',
            hoursPerWeek: 1.83,
            creditHourSession: 0,
            scheduleType: 'R',
            scheduleDescription: 'Studio',
            weeklySchedule: ['Th']
          }
        ]
      }
    },
    {
      type: 'class-schedule',
      id: 'bogus-id-8',
      links: {
        self: null
      },
      attributes: {
        academicYear: '1718',
        academicYearDescription: 'Academic Year 2017-18',
        courseReferenceNumber: '25233',
        courseSubject: 'PH',
        courseSubjectDescription: 'Physics',
        courseNumber: '212',
        courseTitle: '*GENERAL PHYSICS WITH CALCULUS',
        sectionNumber: '087',
        term: '201801',
        termDescription: 'Fall 2017',
        scheduleDescription: 'Laboratory',
        scheduleType: 'D',
        creditHours: 0,
        registrationStatus: '**Web Registered**',
        gradingMode: 'Normal Grading Mode',
        continuingEducation: false,
        faculty: [
          {
            osuId: '1234567891',
            name: 'Jansen, Henri',
            email: '123456789@physics.oregonstate.edu',
            primary: false
          },
          {
            osuId: '1234567892',
            name: 'Ketter, James',
            email: '123456789@physics.oregonstate.edu',
            primary: false
          },
          {
            osuId: '1234567893',
            name: 'Bannon, David',
            email: '123456789@physics.oregonstate.edu',
            primary: true
          },
          {
            osuId: '1234567894',
            name: 'Hadley, Kathryn',
            email: '123456789@oregonstate.edu',
            primary: false
          }
        ],
        meetingTimes: [
          {
            beginDate: currentBeginDate,
            beginTime: '14:00:00',
            endDate: currentEndDate,
            endTime: '15:50:00',
            room: '238',
            building: 'WNGR',
            buildingDescription: 'Weniger Hall',
            campus: ' Oregon State - Corvallis',
            hoursPerWeek: 1.83,
            creditHourSession: 0,
            scheduleType: 'D',
            scheduleDescription: 'Laboratory',
            weeklySchedule: ['T']
          }
        ]
      }
    },
    {
      type: 'class-schedule',
      id: 'bogus-id-9',
      links: {
        self: null
      },
      attributes: {
        academicYear: '1920',
        academicYearDescription: 'Academic Year 2019-20',
        courseReferenceNumber: '17179',
        courseSubject: 'ED',
        courseSubjectDescription: 'Education',
        courseNumber: '408',
        courseTitle: 'WORKSHOP/SEPT EXP SECONDARY',
        sectionNumber: '001',
        term: '202001',
        termDescription: 'Fall 2019',
        scheduleDescription: 'Workshop',
        scheduleType: 'W',
        creditHours: 2,
        registrationStatus: '**Web Registered**',
        gradingMode: 'Normal Grading Mode',
        continuingEducation: false,
        faculty: [
          {
            osuId: '1234567895',
            name: 'McGrory, Sue',
            email: null,
            primary: true
          }
        ],
        meetingTimes: [
          {
            beginDate: beginPastDate,
            beginTime: '09:00:00',
            endDate: endPastDate,
            endTime: '14:50:00',
            room: '101',
            building: 'FURM',
            buildingDescription: 'Joyce Collin Furman Hall Old',
            campusCode: 'C',
            campus: ' Oregon State - Corvallis',
            hoursPerWeek: 5.83,
            creditHourSession: 0,
            scheduleType: 'W',
            scheduleDescription: 'Workshop',
            weeklySchedule: ['M', 'T', 'W', 'Th', 'F', 'Sa', 'Su']
          },
          {
            beginDate: currentBeginDate,
            beginTime: '09:00:00',
            endDate: currentEndDate,
            endTime: '14:50:00',
            room: '101',
            building: 'FURM',
            buildingDescription: 'Joyce Collin Furman Hall',
            campusCode: 'C',
            campus: ' Oregon State - Corvallis',
            hoursPerWeek: 5.83,
            creditHourSession: 2,
            scheduleType: 'W',
            scheduleDescription: 'Workshop',
            weeklySchedule: ['M', 'T', 'W', 'Th', 'F', 'Sa', 'Su']
          }
        ]
      }
    },
    {
      type: 'class-schedule',
      id: 'bogus-id-10',
      links: {
        self: null
      },
      attributes: {
        academicYear: '1920',
        academicYearDescription: 'Academic Year 2019-20',
        courseReferenceNumber: '17179',
        courseSubject: 'ED',
        courseSubjectDescription: 'Education',
        courseNumber: '408',
        courseTitle: 'WORKSHOP/SEPT EXP SECONDARY',
        sectionNumber: '001',
        term: '202001',
        termDescription: 'Fall 2019',
        scheduleDescription: 'Workshop',
        scheduleType: 'W',
        creditHours: 2,
        registrationStatus: '**Web Registered**',
        gradingMode: 'Normal Grading Mode',
        continuingEducation: false,
        faculty: [
          {
            osuId: '1234567895',
            name: 'McGrory, Sue',
            email: null,
            primary: true
          }
        ],
        meetingTimes: [
          {
            beginDate: beginPastDate,
            beginTime: '09:00:00',
            endDate: endPastDate,
            endTime: '14:50:00',
            room: '101',
            building: 'FURM',
            buildingDescription: 'Joyce Collin Furman Hall Past',
            campusCode: 'C',
            campus: ' Oregon State - Corvallis',
            hoursPerWeek: 5.83,
            creditHourSession: 0,
            scheduleType: 'W',
            scheduleDescription: 'Workshop',
            weeklySchedule: ['M', 'T', 'W', 'Th', 'F', 'Sa', 'Su']
          },
          {
            beginDate: beginPastDate,
            beginTime: '09:00:00',
            endDate: endPastDate,
            endTime: '14:50:00',
            room: '101',
            building: 'FURM',
            buildingDescription: 'Joyce Collin Furman Hall Past',
            campusCode: 'C',
            campus: ' Oregon State - Corvallis',
            hoursPerWeek: 5.83,
            creditHourSession: 2,
            scheduleType: 'W',
            scheduleDescription: 'Workshop',
            weeklySchedule: ['M', 'T', 'W', 'Th', 'F', 'Sa', 'Su']
          }
        ]
      }
    }
  ],
  loading: false,
  error: false
};

export const mockSimpleSchedule = (startDate: string) => {
  return {
    data: [
      {
        type: 'class-schedule',
        id: 'simple-id-1',
        links: {
          self: null
        },
        attributes: {
          academicYear: '1920',
          academicYearDescription: 'Academic Year 2019-20',
          courseReferenceNumber: '8675309',
          courseSubject: 'ART',
          courseSubjectDescription: 'Art',
          courseNumber: '410',
          courseTitle: 'ART APPRECIATION',
          sectionNumber: '001',
          term: '202001',
          termDescription: 'Fall 2019',
          scheduleDescription: 'Workshop',
          scheduleType: 'W',
          creditHours: 2,
          registrationStatus: '**Web Registered**',
          gradingMode: 'Normal Grading Mode',
          continuingEducation: false,
          faculty: [
            {
              osuId: '1234567895',
              name: 'Ross, Bob',
              email: null,
              primary: true
            }
          ],
          meetingTimes: [
            {
              beginDate: startDate,
              beginTime: '14:00:00',
              endDate: startDate,
              endTime: '16:20:00',
              room: '101',
              building: 'PHAR',
              buildingDescription: 'Afternoon Building',
              campusCode: 'C',
              campus: ' Oregon State - Corvallis',
              hoursPerWeek: 9.83,
              creditHourSession: 0,
              scheduleType: 'W',
              scheduleDescription: 'Workshop',
              weeklySchedule: ['M', 'W', 'F']
            },
            {
              beginDate: startDate,
              beginTime: '09:00:00',
              endDate: startDate,
              endTime: '09:20:00',
              room: '101',
              building: 'PHAR',
              buildingDescription: 'Morning Building',
              campusCode: 'C',
              campus: ' Oregon State - Corvallis',
              hoursPerWeek: 9.83,
              creditHourSession: 0,
              scheduleType: 'A',
              scheduleDescription: 'Lecture',
              weeklySchedule: ['M', 'F']
            }
          ]
        }
      }
    ],
    loading: false,
    error: false
  };
};

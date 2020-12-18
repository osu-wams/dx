import { rest } from 'msw';
import {
  Student,
  Events,
  Announcements,
  Resources,
  Alerts,
  Trainings,
  Person,
  User,
  Status,
  Cards,
  PageContents,
  ReleaseNotes,
} from '@osu-wams/hooks';
import {
  HOLDS_API,
  GPA_API,
  ACADEMIC_STATUS_API,
  CLASS_SCHEDULE_API,
  ACADEMIC_CALENDAR_API,
  ACADEMIC_ANNOUNCEMENTS_API,
  RESOURCES_BY_QUEUE_API,
  ACCOUNT_TRANSACTION_API,
  DEGREES_API,
  ACCOUNT_BALANCE_API,
  DX_ALERTS_API,
  RAVE_ALERTS_API,
  TRAININGS_API,
  TRAININGS_TAGS_API,
  TRAININGS_AUDIENCES_API,
  PERSONS_ADDRESSES_API,
  PERSONS_API,
  PERSONS_MEALPLAN_API,
  USER_MESSAGES_API,
  IT_STATUS_API,
  CARDS_API,
  RELEASE_NOTES_API,
  PAGE_CONTENT_API,
} from './apis';

const mockHolds = Student.Holds.mockHolds.data;
const mockAcademicStatus = Student.AcademicStatus.mockAcademicStatus.data;
const mockCourseSchedule = Student.CourseSchedule.mockCourseSchedule.courseScheduleData;
const mockDegrees = Student.Degrees.mockDegrees.data;
const { gpaHookData, gpaUndergraduateData } = Student.Gpa.mockGpa;
const { mockAccountTransations } = Student.AccountTransactions.mockAccountTransactions;
const mockGpa = { ...gpaHookData, data: gpaUndergraduateData };
const { academicCalendar6 } = Events.mockEvents;
const { academicAnnouncementResult } = Announcements.mockAnnouncements;
const { resourcesCardData } = Resources.mockResources;
const mockAccountBalance = Student.AccountBalance.mockAccountBalance.data;
const { raveAlerts, dxAlerts } = Alerts.mockAlerts;
const { personsMailingAddressData } = Person.Addresses.mockAddresses;
const { personsData } = Person.Persons.mockPersons;
const { personsMealPlan } = Person.MealPlans.mockMealPlans;
const mockUserMessages = User.mockUser.userMessageItems;
const readUserMessage = User.mockUser.userReadMessage;
const mockStatus = Status.mockStatus.statusData;
const mockCards = Cards.mockCards.cardsArray;
const mockPageContent = PageContents.mockPageContents.pageContentData;
const mockReleaseNotes = ReleaseNotes.mockReleaseNotes.releaseNotesData;

// Mock API Data for our Endpoints
export const handlers = [
  // Students
  rest.get(ACADEMIC_STATUS_API, async (req, res, ctx) => {
    return res(ctx.json(mockAcademicStatus));
  }),

  rest.get(ACCOUNT_BALANCE_API, async (req, res, ctx) => {
    return res(ctx.json(mockAccountBalance));
  }),

  rest.get(CLASS_SCHEDULE_API, async (req, res, ctx) => {
    return res(ctx.json(mockCourseSchedule));
  }),

  rest.get(DEGREES_API, async (req, res, ctx) => {
    // Modify data to match what the server returns
    const apiData = mockDegrees.map((d) => ({
      attributes: d,
    }));
    return res(ctx.json(apiData));
  }),

  rest.get(GPA_API, async (req, res, ctx) => {
    return res(ctx.json(mockGpa.data));
  }),

  rest.get(HOLDS_API, async (req, res, ctx) => {
    return res(ctx.json(mockHolds));
  }),

  rest.get(ACCOUNT_TRANSACTION_API, async (req, res, ctx) => {
    return res(ctx.json(mockAccountTransations.data));
  }),

  // Events
  rest.get(ACADEMIC_CALENDAR_API, async (req, res, ctx) => {
    return res(ctx.json(academicCalendar6.data));
  }),

  // Anouncements
  rest.get(ACADEMIC_ANNOUNCEMENTS_API, async (req, res, ctx) => {
    return res(ctx.json(academicAnnouncementResult.data));
  }),

  // Resources
  rest.get(RESOURCES_BY_QUEUE_API, async (req, res, ctx) => {
    return res(ctx.json(resourcesCardData.data));
  }),

  // Alerts
  rest.get(RAVE_ALERTS_API, async (req, res, ctx) => {
    return res(ctx.json(raveAlerts.data));
  }),

  rest.get(DX_ALERTS_API, async (req, res, ctx) => {
    return res(ctx.json(dxAlerts.data));
  }),

  // Trainings
  rest.get(TRAININGS_API, async (req, res, ctx) => {
    return res(ctx.json(Trainings.mockTrainings.data));
  }),

  rest.get(TRAININGS_TAGS_API, async (req, res, ctx) => {
    return res(ctx.json(Trainings.mockTrainingTags.data));
  }),

  rest.get(TRAININGS_AUDIENCES_API, async (req, res, ctx) => {
    return res(ctx.json(Trainings.mockTrainingAudiences.data));
  }),

  // Persons
  rest.get(PERSONS_API, async (req, res, ctx) => {
    return res(ctx.json(personsData.data));
  }),

  rest.get(PERSONS_MEALPLAN_API, async (req, res, ctx) => {
    return res(ctx.json(personsMealPlan.data));
  }),

  rest.get(PERSONS_ADDRESSES_API, async (req, res, ctx) => {
    return res(ctx.json(personsMailingAddressData.data));
  }),

  // User
  rest.get(USER_MESSAGES_API, async (req, res, ctx) => {
    return res(ctx.json(mockUserMessages));
  }),

  rest.post(USER_MESSAGES_API, async (req, res, ctx) => {
    return res(ctx.json(readUserMessage));
  }),

  // Status
  rest.get(IT_STATUS_API, async (req, res, ctx) => {
    return res(ctx.json(mockStatus));
  }),

  // Dynamic Cards
  rest.get(CARDS_API, async (req, res, ctx) => {
    return res(ctx.json(mockCards));
  }),

  // Release Notes
  rest.get(RELEASE_NOTES_API, async (req, res, ctx) => {
    return res(ctx.json(mockReleaseNotes));
  }),

  // Page Content (About Page for Now)
  rest.get(PAGE_CONTENT_API + '/about', async (req, res, ctx) => {
    return res(ctx.json(mockPageContent));
  }),
];

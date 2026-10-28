import { http, HttpResponse } from 'msw';
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
  InfoButtons,
  People,
  Locations,
} from '@osu-wams/hooks';
import {
  PLANNER_ITEMS_API,
  HOLDS_API,
  INFO_BUTTON_API,
  GPA_API,
  RESOURCES_API,
  TRENDING_RESOURCES_API,
  ACADEMIC_STATUS_API,
  CLASS_SCHEDULE_API,
  ACADEMIC_CALENDAR_API,
  ANNOUNCEMENTS_API,
  RESOURCES_BY_QUEUE_API,
  ACCOUNT_TRANSACTION_API,
  DEGREES_API,
  CATEGORIES_API,
  ACCOUNT_BALANCE_API,
  DX_ALERTS_API,
  RAVE_ALERTS_API,
  TRAININGS_API,
  TRAININGS_TAGS_API,
  FAVORITE_RESOURCES_API,
  TRAININGS_AUDIENCES_API,
  PERSONS_ADDRESSES_API,
  PERSONS_API,
  PERSONS_EMAIL_API,
  PERSONS_PHONE_API,
  PERSONS_MEALPLAN_API,
  USER_MESSAGES_API,
  IT_STATUS_API,
  CARDS_API,
  RELEASE_NOTES_API,
  PAGE_CONTENT_API,
  STUDENT_EVENTS_API,
  EMPLOYEE_EVENTS_API,
  CAMPUS_EVENTS_API,
  HEALTH_CHECK_API,
  APP_VERSION_API,
  USER_API,
  GRADES_API,
  PEOPLE_API,
  LOCATIONS_API,
} from './apis';
import { authUser } from 'src/util/test-utils';

const mockHolds = Student.Holds.mockHolds.data;
const mockAcademicStatus = Student.AcademicStatus.mockAcademicStatus.data;
export const mockCourseSchedule = Student.CourseSchedule.mockCourseSchedule.courseScheduleData;
export const mockGrades = Student.Grades.mockGrades;
const mockDegrees = Student.Degrees.mockDegrees.data;
const { gpaHookData, gpaUndergraduateData } = Student.Gpa.mockGpa;
const { mockAccountTransactions } = Student.AccountTransactions;
const mockGpa = { ...gpaHookData, data: gpaUndergraduateData };
const { academicCalendar6, employeeEvents, studentExperienceEvents } = Events.mockEvents;
export const { academicAnnouncementResult } = Announcements.mockAnnouncements;
const {
  resourcesCardData,
  resourcesData,
  favoriteResource,
  categoriesData,
  trendingResourcesData,
} = Resources.mockResources;
const { mockInfoButtons } = InfoButtons;
const mockAccountBalance = Student.AccountBalance.mockAccountBalance.data;
const { raveAlerts, dxAlerts } = Alerts.mockAlerts;
const { personsMailingAddressData } = Person.Addresses.mockAddresses;
const { personsData, emailsData, phonesData } = Person.Persons.mockPersons;
const { mockMealPlans } = Person.MealPlans;
const mockUser = User.mockUser.user;
const mockUserMessages = User.mockUser.userMessageItems;
const readUserMessage = User.mockUser.userReadMessage;
const mockStatus = Status.mockStatus.statusData;
const mockCards = Cards.mockCards.cardsArray;
const mockPageContent = PageContents.mockPageContents.pageContentData;
const mockReleaseNotes = ReleaseNotes.mockReleaseNotes.releaseNotesData;
const mockPeople = People.mockPeople;
const mockLocations = Locations.mockLocations;
const mockPlannerItems = Student.PlannerItems.mockPlannerItems;

// Mock API Data for our Endpoints
export const handlers = [
  // Students
  http.get(ACADEMIC_STATUS_API, () => HttpResponse.json(mockAcademicStatus)),

  http.get(ACCOUNT_BALANCE_API, () => HttpResponse.json(mockAccountBalance)),

  http.get(CLASS_SCHEDULE_API, () => HttpResponse.json(mockCourseSchedule)),

  http.get(DEGREES_API, () => {
    // Modify data to match what the server returns
    const apiData = mockDegrees.map((d) => ({
      attributes: d,
    }));
    return HttpResponse.json(apiData);
  }),

  http.get(GPA_API, () => HttpResponse.json(mockGpa.data)),

  http.get(GRADES_API, () => HttpResponse.json(mockGrades.data)),

  http.get(HOLDS_API, () => HttpResponse.json(mockHolds)),

  http.get(PLANNER_ITEMS_API, () => HttpResponse.json(mockPlannerItems.data)),

  http.get(ACCOUNT_TRANSACTION_API, () => HttpResponse.json(mockAccountTransactions.data)),

  // Events
  http.get(ACADEMIC_CALENDAR_API, () => HttpResponse.json(academicCalendar6.data)),

  // Anouncements
  http.get(ANNOUNCEMENTS_API, () => HttpResponse.json(academicAnnouncementResult.data)),

  // Resources
  http.get(TRENDING_RESOURCES_API, () => HttpResponse.json(trendingResourcesData.data)),

  http.get(RESOURCES_API, () => HttpResponse.json(resourcesData.data)),

  http.get(RESOURCES_BY_QUEUE_API, ({ params }) => {
    // Gets the category and capitalizes it to match response
    const category = String(params.category);
    const cat = category.charAt(0).toUpperCase() + category.slice(1);

    // Filters results (this happens server side normally) to match category
    const filteredResources = resourcesCardData.data.items.filter((i) =>
      i.categories.includes(cat)
    );

    // Return filtered resources by categories
    return HttpResponse.json({
      entityQueueTitle: resourcesCardData.data.entityQueueTitle,
      items: filteredResources,
    });
  }),

  http.get(CATEGORIES_API, () => HttpResponse.json(categoriesData.data)),

  http.post(FAVORITE_RESOURCES_API, () => HttpResponse.json(favoriteResource)),

  // Alerts
  http.get(RAVE_ALERTS_API, () => HttpResponse.json(raveAlerts.data)),

  http.get(DX_ALERTS_API, () => HttpResponse.json(dxAlerts.data)),

  // Trainings
  http.get(TRAININGS_API, () => HttpResponse.json(Trainings.mockTrainings.data)),

  http.get(TRAININGS_TAGS_API, () => HttpResponse.json(Trainings.mockTrainingTags.data)),

  http.get(TRAININGS_AUDIENCES_API, () => HttpResponse.json(Trainings.mockTrainingAudiences.data)),

  // Persons
  http.get(PERSONS_API, () => HttpResponse.json(personsData.data)),

  http.get(PERSONS_EMAIL_API, () => HttpResponse.json(emailsData.data)),

  http.get(PERSONS_PHONE_API, () => HttpResponse.json(phonesData.data)),

  http.get(PERSONS_MEALPLAN_API, () => HttpResponse.json(mockMealPlans.data)),

  http.get(PERSONS_ADDRESSES_API, () => HttpResponse.json(personsMailingAddressData.data)),

  // User
  http.get(USER_API, () => HttpResponse.json(authUser)),

  http.get(USER_MESSAGES_API, () => HttpResponse.json(mockUserMessages)),

  http.post(USER_MESSAGES_API, () => HttpResponse.json(readUserMessage)),

  // Info-Button
  http.get(INFO_BUTTON_API, () => HttpResponse.json(mockInfoButtons.data)),

  // Status
  http.get(IT_STATUS_API, () => HttpResponse.json(mockStatus)),

  // Dynamic Cards
  http.get(CARDS_API, () => HttpResponse.json(mockCards)),

  // Release Notes
  http.get(RELEASE_NOTES_API, () => HttpResponse.json(mockReleaseNotes)),

  // Page Content (About Page for Now)
  http.get(PAGE_CONTENT_API + '/about', () => HttpResponse.json(mockPageContent)),

  // Student Events
  http.get(STUDENT_EVENTS_API, () => HttpResponse.json(studentExperienceEvents.data)),

  // Employee Events
  http.get(EMPLOYEE_EVENTS_API, () => HttpResponse.json(employeeEvents.data)),

  // Campus Events
  http.get(CAMPUS_EVENTS_API, () => HttpResponse.json(studentExperienceEvents.data)),

  // Health Check
  http.get(HEALTH_CHECK_API, () =>
    HttpResponse.json({
      version: 'server-test-123',
      useMocks: 0,
    })
  ),

  // App Version
  http.get(APP_VERSION_API, () => HttpResponse.text('client-test-123')),

  // People Search
  http.get(PEOPLE_API, () => HttpResponse.json(mockPeople.data)),

  // Locations Search
  http.get(LOCATIONS_API, () => HttpResponse.json(mockLocations.data)),
];

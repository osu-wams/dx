import axios from 'axios';
import { array } from 'prop-types';

export const getJobs = (): Promise<IJobsWrapper> => axios.get(`/api/jobs`).then(res => res.data);

export interface IJobsWrapper {
  success: boolean;
  jobs: IJobs[];
}

export type IJobs = {
  additional_application_instructions: string;
  contact_display: string;
  created_at: string;
  created_by_id: number;
  description: string;
  desired_skills: string;
  division_id: string;
  document_notes: string;
  duration: string;
  employer: IEmployer;
  employer_id: number;
  employment_type_id: number;
  end_date: string;
  government: boolean;
  hidden: boolean;
  id: number;
  import_identifier: string;
  job_type_id: number;
  legacy_employer_name: string;
  monthly_housing_stipend: string;
  pay_rate: string;
  pay_schedule_id: number;
  relocation_assistance_available: boolean;
  remote: boolean;
  responsibilities: string;
  salary: string;
  salary_type_id: number;
  send_summary_when_expired: boolean;
  start_date: string;
  student_screen_id: number;
  title: string;
  tracking_code: string;
  type: string;
  updated_at: string;
  updated_by_id: number;
  work_study: boolean;
};

interface IEmployer {
  aliases: [];
  created_at: string;
  description: string;
  facebook_url: string;
  glassdoor_url: string;
  id: number;
  industry: IIndustry;
  instagram_url: string;
  linkedin_url: string;
  location: ILocation;
  name: string;
  phone: string;
  pitch: string;
  students_can_message: boolean;
  time_zone: string;
  twitter_url: string;
  type: string;
  updated_at: string;
  website: string;
  website_host: string;
}

interface IIndustry {
  created_at: string;
  id: number;
  name: string;
  nubs_category: string;
  type: string;
  updated_at: string;
}

interface ILocation {
  address_line_one: string;
  address_line_two: string;
  city: string;
  country: string;
  created_at: string;
  id: number;
  latitude: string;
  longitude: string;
  name: string;
  state: string;
  type: string;
  updated_at: string;
  zipcode: string;
}

import axios from 'axios';
import { useAPICall } from '@osu-wams/hooks';

const getAcademicStatus = (): Promise<AcademicStatus> =>
  axios.get(`/api/student/academic-status`).then(res => res.data);
export const useAcademicStatus = () =>
  useAPICall<AcademicStatus>({
    api: getAcademicStatus,
    dataTransform: data => data,
    initialState: {} as AcademicStatus
  });

export type AcademicStatus = {
  academicStanding: string;
  term: string;
};

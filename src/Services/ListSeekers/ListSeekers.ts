import httpClient from "../../httpClient/httpClient";
import { apiLinks } from "../mainService";

interface EducationDetail {
  id: number;
  institutionName: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  gpa: number;
}

interface ExperienceDetail {
  id: number;
  companyName: string;
  position: string;
  startDate: string;
  endDate: string;
  responsibilities: string;
  achievements: string;
}

interface SkillSet {
  id: number;
  name: string;
  shorthand: string | null;
  description: string | null;
  proficiencyLevel?:string;
}

interface CVs {
  id: number;
  url: string;
  name: string;
}
interface Benefits {
  id: number;
  name: string;
}

interface certificates {
  id: number;
  certificateName: string;
  certificateOrganization: string;
  description: string;
  certificateURL: string;
  issueDate: string;
}

interface Awards {
  id: number;
  awardName: string;
  awardOrganization: string;
  description: string;
  issueDate: string;
}

interface UserProfile {
  id: number;
  userName: string;
  isLookingForJob: boolean;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string | null;
  coverLetter?: string;
  educationDetails: EducationDetail[];
  experienceDetails: ExperienceDetail[];
  cvs: CVs[];
  skillSets: SkillSet[];
  benefits: Benefits[];
  awards: Awards[];
  certificates: certificates[];
  // userAccountServices?:data[];
}

interface FetchError extends Error {
  code?: number;
  info?: Record<string, unknown>;
}

interface ListSeekersParams {
  pageIndex?: number;
  pageSize?: number;
  jobPostId?:number
  signal?: AbortSignal;
}

interface PaginatedResponse<T> {
  pageIndex?: number;
  pageSize?: number;
  totalCount: number;
  totalPages: number;
  jobPostId?:number
  items: T[];
}

export const ListSeekers = async ({
  pageIndex,
  pageSize,
  jobPostId,
  signal,
}: ListSeekersParams): Promise<PaginatedResponse<UserProfile>> => {
  try {
    const response = await httpClient.get({
      url: `${apiLinks.GetSeekers.GET}`,
      params: { jobPostId, pageIndex, pageSize },
      signal,
    });

    if (response.status !== 200) {
      const error: FetchError = new Error(
        "An error occurred while fetching seekers"
      );
      error.code = response.status;
      error.info = response.data as Record<string, unknown>;
      throw error;
    }

    const result = response.data.result as PaginatedResponse<UserProfile>;
    return result;
  } catch (error) {
    console.error("Fetching seekers failed", error);
    throw error;
  }
};

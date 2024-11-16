import httpClient from "../../httpClient/httpClient";
import { apiLinks } from "../mainService";
interface EducationDetail {
  id: number;
  name: string;
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
  shorthand: string;
  description: string; // HTML content as a string
}

interface CVs {
  id: number;
  url: string;
  name: string;
}
interface UserProfile {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string | null;
  educationDetails: EducationDetail[];
  experienceDetails: ExperienceDetail[];
  cvs: CVs[];
  skillSets: SkillSet[];
}

interface FetchError extends Error {
  code?: number;
  info?: Record<string, unknown>;
}
interface UserId {
  signal?: AbortSignal;
}

export const ListSeekers = async ({
  signal,
}: UserId): Promise<{ UserProfiles: UserProfile[] }> => {
  try {
    const response = await httpClient.get({
      url: `${apiLinks.GetSeekers.GET}`,
      //   params: { id },
      signal: signal,
    });

    if (response.status !== 200) {
      const error: FetchError = new Error(
        "An error occurred while fetching Companies"
      );
      error.code = response.status;
      error.info = response.data as Record<string, unknown>;
      throw error;
    }

    const UserProfile = response.data;
    return {
      UserProfiles: UserProfile.result as UserProfile[],
    };
  } catch (error) {
    console.error("Fetching companies failed", error);
    throw error;
  }
};

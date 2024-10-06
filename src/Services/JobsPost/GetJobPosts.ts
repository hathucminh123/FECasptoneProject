import httpClient from "../../httpClient/httpClient";
import { apiLinks } from "../mainService";

interface JobType {
  id: number;
  name: string;
  description: string;
}

interface JobLocation {
  id: number;
  district: string;
  city: string;
  postCode: string;
  state: string;
  country: string;
  stressAddress: string;
}

interface JobPost {
  id: number;
  jobTitle: string;
  jobDescription: string;
  salary: number;
  postingDate: string;
  expiryDate: string; 
  experienceRequired: number;
  qualificationRequired: string;
  benefits: string;
  imageURL: string;
  isActive: boolean;
  companyId: number;
  companyName: string;
  websiteCompanyURL: string;
  jobType: JobType; // jobType là đối tượng JobType
  jobLocation: JobLocation; // jobLocation là đối tượng JobLocation
  skillSets: string[]; // Array of skill sets, có thể là array rỗng
}

interface FetchError extends Error {
  code?: number;
  info?: Record<string, unknown>;
}

export const GetJobPost = async (): Promise<{
  JobPosts: JobPost[];
}> => {
  try {
    const response = await httpClient.get({
      url: apiLinks.JobPosts.GET,
    });

    if (response.status !== 200) {
      const error: FetchError = new Error(
        "An error occurred while fetching JobPosts"
      );
      error.code = response.status;
      error.info = response.data as Record<string, unknown>;
      throw error;
    }

    const JobPost = response.data;
    return {
      JobPosts: JobPost.result as JobPost[],
    };
  } catch (error) {
    console.error("Fetching SkillSet failed", error);
    throw error;
  }
};
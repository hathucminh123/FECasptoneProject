import httpClient from "../../httpClient/httpClient";
import { apiLinks } from "../mainService";

interface Signal {
  signal?: AbortSignal;
  name?: string; // companyName parameter
  pageIndex?: number;
  pageSize?: number;
}

interface BusinessStream {
  id: number;
  businessStreamName: string;
  description: string;
}

interface JobType {
  id: number;
  name: string;
  description: string;
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
  jobType: JobType;
  jobLocationCities: string[];
  jobLocationAddressDetail: string[];
  skillSets: string[];
}

interface Company {
  id: number;
  companyName: string;
  companyDescription: string;
  websiteURL: string;
  establishedYear: number;
  country: string;
  city: string;
  address: string;
  numberOfEmployees: number;
  businessStream: BusinessStream;
  jobPosts: JobPost[];
  imageUrl: string;
}

interface ApiResponse {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  items: Company[];
}

interface FetchError extends Error {
  code?: number;
  info?: Record<string, unknown>;
}

export const SearchCompany = async ({
  signal,
  name,
  pageIndex = 1,
  pageSize = 5,
}: Signal): Promise<ApiResponse> => {
  try {
    const response = await httpClient.get({
      url: `${apiLinks.Company.GetSearch}`,
      params: {
        companyName: name,
        pageIndex,
        pageSize,
      },
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

    // Return the structured API response
    return response.data.result as ApiResponse;
  } catch (error) {
    console.error("Fetching companies failed", error);
    throw error;
  }
};

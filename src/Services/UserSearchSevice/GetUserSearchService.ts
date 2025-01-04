import httpClient from "../../httpClient/httpClient";
import { apiLinks } from "../mainService";

// Define SkillSetFilter interface for the skillSetFilters array
interface SkillSetFilter {
  skillSet: string;
  proficiencyLevel: string;
}


interface SearchState {
  keyword?: string | null;
  degree?: string | null;
  skillSetFilters?: SkillSetFilter[] | null;
  pageIndex?: number | null;
  pageSize?: number | null;
}

// Define JobSearch interface for the request parameter
interface JobSearch {
  data: SearchState;
}

// Main function to perform the job search
export const GetUserSearchService = async ({ data }: JobSearch) => {
 
  if (data.keyword?.trim() === "") {
    data = { ...data, keyword: null };
  }

 
  if (data.degree?.trim() === "") {
    data = { ...data, degree: null };
  }

  try {
    // Send the POST request using httpClient
    const response = await httpClient.post({
      url: apiLinks.userSearch.POST,
      data: data, // Payload
    });

    // Return the response data
    return response.data;
  } catch (error: unknown) {
    // Handle errors
    if (error instanceof Error) {
      console.error("Post JobActivity request failed:", error.message);
    } else {
      console.error("Unexpected error", error);
    }
    throw error;
  }
};

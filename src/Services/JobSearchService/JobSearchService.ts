import httpClient from "../../httpClient/httpClient";
import { apiLinks } from "../mainService";
interface SearchState {

    keyword?: string | null;
    companyNames?: string[] | null;
    jobTitles?: string[] | null;
    skillSets?: string[] | null;
    minSalary?: number | null ;
    maxSalary?: number | null;
    locations?: string[] | null;
    cities?: string[] | null;
    experience?: number | null |undefined;
    jobTypes?: string[] | null;
    pageIndex?: number | null;
    pageSize?: number | null;
  
}
interface JobSearch {
  // data: { [key: string]: string|number|undefined };
  data: SearchState
}

export const GetJobSearch = async ({ data }: JobSearch) => {
  if (data.keyword?.trim() === "") {
    data.keyword = null
  }
  try {
    const response = await httpClient.post({
      url: apiLinks.jobSearch.POST,
      data: data,
    });
    return response.data;
  } catch (error: unknown) {

    if (error instanceof Error) {
      console.error("Post JobActivity request failed:", error.message);
    } else {
      console.error("Unexpected error", error);
    }
    throw error;
  }
};

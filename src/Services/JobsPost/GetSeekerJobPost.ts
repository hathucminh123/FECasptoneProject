import httpClient from "../../httpClient/httpClient";
import { apiLinks } from "../mainService";

interface SeekersByJobPost {
    data: { [key: string]:  number|string };
  }

interface FetchError extends Error {
  code?: number;
  info?: Record<string, unknown>;
}

export const GetSeekerJobPost = async (): Promise<{
    GetSeekers: SeekersByJobPost[];
}> => {
  try {
    const response = await httpClient.get({
      url: apiLinks.JobPosts.GetSeekerByJobPosts,
    });

    if (response.status !== 200) {
      const error: FetchError = new Error(
        "An error occurred while fetching Seekfer Apply by JobPost"
      );
      error.code = response.status;
      error.info = response.data as Record<string, unknown>;
      throw error;
    }

    const Seeker = response.data;
    return {
        GetSeekers: Seeker.result as SeekersByJobPost[],
    };
  } catch (error) {
    console.error("Fetching Seekfer by JobPost failed", error);
    throw error;
  }
};

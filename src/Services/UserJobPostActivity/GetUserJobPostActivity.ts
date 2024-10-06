import httpClient from "../../httpClient/httpClient";
import { apiLinks } from "../mainService";

interface UserJobActivity {
  data: { [key: string]: string | number };
}

interface FetchError extends Error {
  code?: number;
  info?: Record<string, unknown>;
}

export const GetJobType = async (): Promise<{
  UserJobActivitys: UserJobActivity[];
}> => {
  try {
    const response = await httpClient.get({
      url: apiLinks.UserApply.GET,
    });

    if (response.status !== 200) {
      const error: FetchError = new Error(
        "An error occurred while fetching User JobActivity"
      );
      error.code = response.status;
      error.info = response.data as Record<string, unknown>;
      throw error;
    }

    const UserJobActivity = response.data;
    return {
      UserJobActivitys: UserJobActivity.result as UserJobActivity[],
    };
  } catch (error) {
    console.error("Fetching User JobActivity failed", error);
    throw error;
  }
};

import httpClient from "../../httpClient/httpClient";
import { apiLinks } from "../mainService";

interface Services {
  id: number;
  name: string;
  numberOfPost: number;
  description: string;
  price: number;
}
interface signal{
  signal:AbortSignal
}

interface FetchError extends Error {
  code?: number;
  info?: Record<string, unknown>;
}

export const GetServicePayment = async ({signal}:signal): Promise<{
    Services: Services[];
}> => {
  try {
    const response = await httpClient.get({
      url: apiLinks.Service.GET,
      signal:signal
    });

    if (response.status !== 200) {
      const error: FetchError = new Error(
        "An error occurred while fetching ServicePayment"
      );
      error.code = response.status;
      error.info = response.data as Record<string, unknown>;
      throw error;
    }

    const SkillSet = response.data;
    return {
      Services: SkillSet.result as Services[],
    };
  } catch (error) {
    console.error("Fetching SkillSet failed", error);
    throw error;
  }
};

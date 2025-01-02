import httpClient from "../../httpClient/httpClient";
import { apiLinks } from "../mainService";

interface Locations {
  id: number;
  //   name: string;
  city: string;
  stressAddressDetail: string;
  locationId:number;
  // shorthand: string;
  // description: string;
}
interface signal {
  signal: AbortSignal;
  id: number;
}

interface FetchError extends Error {
  code?: number;
  info?: Record<string, unknown>;
}

export const GetcompanyLocationService = async ({
  signal,
  id,
}: signal): Promise<{
  Locations: Locations[];
}> => {
  try {
    const response = await httpClient.get({
      url: `${apiLinks.companyLocation.GET}/${id}`,
      signal: signal,
    });

    if (response.status !== 200) {
      const error: FetchError = new Error(
        "An error occurred while fetching Locations"
      );
      error.code = response.status;
      error.info = response.data as Record<string, unknown>;
      throw error;
    }

    const Location = response.data;
    return {
      Locations: Location.result as Locations[],
    };
  } catch (error) {
    console.error("Fetching Benefits failed", error);
    throw error;
  }
};
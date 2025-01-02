import httpClient from "../../httpClient/httpClient";
import { apiLinks } from "../mainService";
interface Location {
  locationId: number;
  stressAddressDetail: string;
}

interface Company {
  data: { [key: string]: string | number | undefined | Location[] | null };
}

export const PutCompanyRejected = async ({ data }: Company) => {
  try {
    const response = await httpClient.put({
      url: apiLinks.Company.PUTCompanyRejected,
      data: data,
    });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Update Companies request failed:", error.message);
    } else {
      console.error("Unexpected error", error);
    }
    throw error;
  }
};

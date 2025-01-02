import httpClient from "../../httpClient/httpClient";
import { apiLinks } from "../mainService";


interface LocationService{
    data: { [key: string]: string|number |null };
    // id?: number;
}

export const PutLocationService = async ({ data }: LocationService) => {
    try {
      const response = await httpClient.put({
        url: ` ${apiLinks.Location.PUT}`,
        data: data,
      });
      return response.data;
    } catch (error: unknown) {
  
      if (error instanceof Error) {
        console.error("Update Location request failed:", error.message); 
      } else {
        console.error("Unexpected error", error);
      }
      throw error; 
    }
  };
  
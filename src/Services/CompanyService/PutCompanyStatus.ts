import httpClient from "../../httpClient/httpClient";
import { apiLinks } from "../mainService";


interface Company{
    data: { [key: string]: string | number|undefined |null};
}

export const PutCompaniesStatus = async ({ data }: Company) => {
    try {
      const response = await httpClient.put({
        url: apiLinks.Company.PUTCOMPANYSTATUS,
        data: data,
      });
      return response.data;
    } catch (error: unknown) {
  
      if (error instanceof Error) {
        console.error("Update Companies status request failed:", error.message); 
      } else {
        console.error("Unexpected error", error);
      }
      throw error; 
    }
  };
  
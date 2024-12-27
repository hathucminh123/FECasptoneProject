import httpClient from "../../httpClient/httpClient";
import { apiLinks } from "../mainService";


interface ServicePayment{
    data: { [key: string]: string|number|boolean };
    id?: number;
}

export const PutServicesPayment = async ({ data,id }: ServicePayment) => {
    try {
      const response = await httpClient.put({
        url: ` ${apiLinks.Service.PUT}?Id=${id}`,
        data: data,
      });
      return response.data;
    } catch (error: unknown) {
  
      if (error instanceof Error) {
        console.error("Update Services request failed:", error.message); 
      } else {
        console.error("Unexpected error", error);
      }
      throw error; 
    }
  };
  
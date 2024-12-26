import httpClient from "../../httpClient/httpClient";
import { apiLinks } from "../mainService";


interface ServicePayment{
    data: { [key: string]: string|number|boolean };
}

export const PostServices = async ({ data }: ServicePayment) => {
    try {
      const response = await httpClient.post({
        url: apiLinks.Service.POST,
        data: data,
      });
      return response.data;
    } catch (error: unknown) {
  
      if (error instanceof Error) {
        console.error("Post Services request failed:", error.message); 
      } else {
        console.error("Unexpected error", error);
      }
      throw error; 
    }
  };
  
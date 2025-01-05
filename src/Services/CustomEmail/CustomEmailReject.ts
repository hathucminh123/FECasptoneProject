import httpClient from "../../httpClient/httpClient";
import { apiLinks } from "../mainService";


interface customEmail{
    data: { [key: string]: string | number |undefined};
}

export const CustomEmailReject = async ({ data }: customEmail) => {
    try {
      const response = await httpClient.post({
        url: apiLinks.EmailReject.POST,
        data: data,
      });
      return response.data;
    } catch (error: unknown) {
  
      if (error instanceof Error) {
        console.error("Send Email request failed:", error.message); 
      } else {
        console.error("Unexpected error", error);
      }
      throw error; 
    }
  };
  
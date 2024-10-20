import httpClient from "../../httpClient/httpClient";
import { apiLinks } from "../mainService";


export const GetNotifications = async () => {
    try {
      var token = localStorage.getItem("token") ?? undefined;
      const response = await httpClient.get({
        url: apiLinks.JobPostActivity.GetNotifications,
        authorization: `bearer ${token}`
      });
      return response;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Get Notifications request failed:", error.message); 
      } else {
        console.error("Unexpected error", error);
      }
      throw error; 
    }
  };
  
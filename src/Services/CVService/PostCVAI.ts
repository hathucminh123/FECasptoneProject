import httpClient from "../../httpClient/httpClient";
import { apiLinks } from "../mainService";

interface IFormFile {
    name: string; 
    type: string; 
    size: number; 
    content: Blob | File; 
  }
interface CV {
  data: { [key: string]: IFormFile|string |number |undefined|File};
}

export const PostCVsAI = async ({ data }: CV) => {
  try {
    const response = await httpClient.post({
      url: `${apiLinks.PostCVAI.POST}?jobId=${data.jobPostId}`,
      data: data,

      contentType: "multipart/form-data",
    });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Post CV request failed:", error.message);
    } else {
      console.error("Unexpected error", error);
    }
    throw error;
  }
};
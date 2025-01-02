import httpClient from "../../httpClient/httpClient";
import { apiLinks } from "../mainService";

interface Location {
  id: number;
}

export const DeleteLocationService = async ({ id }: Location) => {
  try {
    const response = await httpClient.delete({
      url: `${apiLinks.Location.DELETE}?id=${id}`,
      // params: { id },
    });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Delete Location request failed:", error.message);
    } else {
      console.error("Unexpected error", error);
    }
    throw error;
  }
};

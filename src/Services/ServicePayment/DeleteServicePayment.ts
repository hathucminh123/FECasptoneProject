import httpClient from "../../httpClient/httpClient";
import { apiLinks } from "../mainService";

interface DeleteServicePayment {
  id: number;
}

export const DeleteServicePayment = async ({ id }: DeleteServicePayment) => {
  try {
    const response = await httpClient.delete({
      url: `${apiLinks.Service.DELETE}?Id=${id}`,
      // params: { id },
    });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Delete Service Payment request failed:", error.message);
    } else {
      console.error("Unexpected error", error);
    }
    throw error;
  }
};

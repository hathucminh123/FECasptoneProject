import httpClient from "../../httpClient/httpClient";
import { apiLinks } from "../mainService";

interface Comment {
  id: number;
  commentText: string;
  commentDate: string;
  rating: number;
}

interface signal {
  signal?: AbortSignal;
  id: number;
}

interface FetchError extends Error {
  code?: number;
  info?: Record<string, unknown>;
}

export const GetCommentByJobActivity = async ({
  id,
  signal,
}: signal): Promise<{
  Comments: Comment[];
}> => {
  try {
    const response = await httpClient.get({
      url: `${apiLinks.JobsComment.GETBYID}/${id}/JobPostActivity`,
      signal: signal,
    });

    if (response.status !== 200) {
      const error: FetchError = new Error(
        "An error occurred while fetching Comment by JobPost"
      );
      error.code = response.status;
      error.info = response.data as Record<string, unknown>;
      throw error;
    }

    const Seeker = response.data;
    return {
      Comments: Seeker.result as Comment[],
    };
  } catch (error) {
    console.error("Fetching Seekfer by JobPost failed", error);
    throw error;
  }
};

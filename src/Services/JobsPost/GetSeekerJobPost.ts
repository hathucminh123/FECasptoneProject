import httpClient from "../../httpClient/httpClient";
import { apiLinks } from "../mainService";

interface SeekersByJobPost {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  cvId: number;
  cvPath: string;
  jobPostActivityId: number;
  status: string;
  jobPostActivityComments: Comment[];
  analyzedResult: AnalyzedResult; // Integrating AnalyzedResult here
}

interface Comment {
  commentId: number;
  text: string;
  date: string;
}

interface AnalyzedResult {
  success: boolean;
  processingTime: number;
  deviceUsed: string;
  matchDetails: MatchDetails;
}

interface MatchDetails {
  jobId: number;
  jobTitle: string;
  candidateName: string;
  candidateEmail: string;
  scores: Scores;
  skillAnalysis: SkillAnalysis;
  experienceAnalysis: ExperienceAnalysis;
  recommendation: Recommendation;
}

interface Scores {
  overallMatch: number;
  skillMatch: number;
  experienceMatch: number;
  contentSimilarity: number;
}

interface SkillAnalysis {
  matchingSkills: string[];
  missingSkills: string[];
  additionalSkills: string[];
}

interface ExperienceAnalysis {
  requiredYears: number;
  candidateYears: number;
  meetsRequirement: boolean;
}

interface Recommendation {
  category: string;
  action: string;
}

interface signal {
  signal?: AbortSignal;
  id: number;
}

interface FetchError extends Error {
  code?: number;
  info?: Record<string, unknown>;
}

export const GetSeekerJobPost = async ({
  id,
  signal,
}: signal): Promise<{
  GetSeekers: SeekersByJobPost[];
}> => {
  try {
    const response = await httpClient.get({
      url: `${apiLinks.JobPosts.GetSeekerByJobPosts}/${id}/Seekers`,
      signal: signal,
    });

    if (response.status !== 200) {
      const error: FetchError = new Error(
        "An error occurred while fetching Seekfer Apply by JobPost"
      );
      error.code = response.status;
      error.info = response.data as Record<string, unknown>;
      throw error;
    }

    const Seeker = response.data;
    return {
      GetSeekers: Seeker.result as SeekersByJobPost[],
    };
  } catch (error) {
    console.error("Fetching Seekfer by JobPost failed", error);
    throw error;
  }
};

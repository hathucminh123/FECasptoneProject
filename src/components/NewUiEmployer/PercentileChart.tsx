import React from "react";
import "./PercentileChart.css";

interface SeekersByJobPost {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string; // Số điện thoại lưu dưới dạng chuỗi
  cvId: number;
  cvPath: string;
  jobPostActivityId: number;
  status: string;
  jobPostActivityComments: Comment[];
  extractedCVInfo: ExtractedCVInfo; // Thêm extractedCVInfo
  analyzedResult: AnalyzedResult;
}

interface Comment {
  id: number;
  commentText: string;
  commentDate: string;
  rating: number;
}

interface ExtractedCVInfo {
  success: boolean;
  data: ExtractedData[];
}

interface ExtractedData {
  personal: PersonalInfo;
  professional: ProfessionalInfo;
}

interface PersonalInfo {
  contact: string[];
  email: string[];
  github: string[];
  linkedin: string[];
  location: string[];
  name: string[];
}

interface ProfessionalInfo {
  education: Education[];
  experience: Experience[];
  technical_skills: string[];
  non_technical_skills: string[];
  tools: string[];
}

interface Education {
  qualification: string | null;
  university: string[];
}

interface Experience {
  company: string[];
  role: string[];
  years: string[];
  project_experience: string[];
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

interface PercentileChartProps {
  overallMatch?: number | undefined;
  skillMatch?: number | undefined;
  experienceMatch?: number | undefined;
  contentSimilarity?: number | undefined;
  profileResult?: SeekersByJobPost|undefined;
}

const PercentileChart: React.FC<PercentileChartProps> = ({
  // overallMatch,
  skillMatch,
  experienceMatch,
  contentSimilarity,
  profileResult,
}) => {
  console.log("okchua",profileResult?.analyzedResult.matchDetails.experienceAnalysis.requiredYears)
  const metrics = [
    // { label: "Overall Match", value: overallMatch },
    { label: "Skill Match", value: skillMatch },
    { label: "Experience Match", value: experienceMatch },
    { label: "Content Similarity", value: contentSimilarity },
  ];

  return (
    <div className="percentile-chart-container">
      {/* <div className="chart-title">Top 20%</div> */}
      <div className="chart-bars">
        {metrics.map((metric, index) => (
          <div
           key={index}
            className="ok"
            title={
              metric.label === "Experience Match"
                ? `RequiredYears: ${profileResult?.analyzedResult.matchDetails.experienceAnalysis.requiredYears} years - CandidateYears: ${profileResult?.analyzedResult.matchDetails.experienceAnalysis.candidateYears} years`
                : `${metric.label}: ${metric.value}%`
            }
          >
            <div key={index} className="chart-bar">
              {/* Bar fill height is based on the value percentage */}
              <div
                className="bar"
                style={{
                  height: `${metric.value}%`,
                  backgroundColor:
                    // metric.value && metric.value >= 80
                    //   ? "#22c55e"
                      // : metric.value && metric.value >= 50
                      // ? 
                      "#3b82f6"
                      // : "#d1d5db",
                }}
                // title={
                //   metric.label === "Experience Match"
                //     ? `${metric.label}: ${metric.value}% `
                //     : `${metric.label}: ${metric.value}%`
                // }
              ></div>
              {/* Metric label and value displayed below the bar */}
            </div>
            <div className="bar-label">
              <span>{metric.label}</span>
            </div>
            <div className="bar-value">
              <span>{metric.value}%</span>
            </div>
          </div>
        ))}
      </div>
      {/* <div className="chart-footer">
                <div>Taken by: 2K people</div>
                <div>Percentile: 80th-90th</div>
            </div> */}
    </div>
  );
};

export default PercentileChart;

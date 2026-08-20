export type JobType = 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'INTERNSHIP' | 'REMOTE';

export interface JobListing {
  id: string;
  title: string;
  companyName: string;
  companyLogoUrl?: string;
  location: string;
  jobType: JobType;
  description: string;
  requirements: string[];
  salaryRange?: string;
  applicantCount: number;
  postedDate: string;
  isSaved: boolean;
  isApplied: boolean;
}

export interface JobApplicationPayload {
  jobId: string;
  resumeUrl?: string;
  coverLetter?: string;
}

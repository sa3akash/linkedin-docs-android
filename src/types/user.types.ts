export interface UserExperience {
  id: string;
  title: string;
  companyName: string;
  location?: string;
  startDate: string;
  endDate?: string;
  isCurrentRole: boolean;
  description?: string;
}

export interface UserEducation {
  id: string;
  schoolName: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate?: string;
}

export interface UserSkill {
  id: string;
  name: string;
  endorsementsCount: number;
}

export interface UserCertificate {
  id: string;
  title: string;
  issuingOrganization: string;
  issueDate: string;
  expirationDate?: string;
  credentialId?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  headline: string;
  avatarUrl?: string;
  bannerUrl?: string;
  about?: string;
  location?: string;
  connectionCount: number;
  experiences: UserExperience[];
  education: UserEducation[];
  skills: UserSkill[];
  certificates: UserCertificate[];
  isBiometricsEnabled?: boolean;
}

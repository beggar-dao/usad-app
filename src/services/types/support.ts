/**
 * Support API Types
 * Types for Contact Us and Bug Bounty API interfaces
 */

import type { ApiResponse } from './common';

/**
 * Contact Us Form Data Interface
 */
export interface ContactUsFormData {
  name: string;
  email: string;
  description: string;
}

/**
 * Contact Us Request Interface
 */
export interface ContactUsRequest {
  name: string;
  email: string;
  description: string;
}

/**
 * Contact Us Response Data Interface
 */
export interface ContactUsResponseData {
  contactId: string;
  submittedAt: string;
}

/**
 * Contact Us Response Interface
 */
export type ContactUsResponse = ApiResponse<ContactUsResponseData>;

/**
 * Bug Bounty Form Data Interface
 */
export interface BugBountyFormData {
  name: string;
  email: string;
  bugFound: string;
  whereFound: string;
  whichProduct: string;
  riskLevel: number;
  bugReportSummary: string;
  stepsToReproduce: string;
  impact: string;
  filePath?: string;
}

/**
 * Bug Bounty Request Interface
 */
export interface BugBountyRequest {
  name: string;
  email: string;
  bugFound: string;
  whereFound: string;
  whichProduct: string;
  riskLevel: number;
  bugReportSummary: string;
  stepsToReproduce: string;
  impact: string;
  filePath?: string;
}

/**
 * Bug Bounty Response Data Interface
 */
export interface BugBountyResponseData {
  reportId: string;
  submittedAt: string;
  status: string;
}

/**
 * Bug Bounty Response Interface
 */
export type BugBountyResponse = ApiResponse<BugBountyResponseData>;

/**
 * File Upload Response Data Interface
 */
export interface FileUploadResponseData {
  filePath: string;
  fileName: string;
  fileSize: number;
  uploadedAt: string;
}

/**
 * File Upload Response Interface
 */
export type FileUploadResponse = ApiResponse<FileUploadResponseData>;

/**
 * Support State Interface
 */
export interface SupportState {
  loading: boolean;
  error: string | null;
  lastSubmission: {
    type: 'contact' | 'bug-bounty' | null;
    id: string | null;
    submittedAt: string | null;
  };
}

/**
 * Support Context Type Interface
 */
export interface SupportContextType {
  supportState: SupportState;
  submitContactUs: (data: ContactUsRequest) => Promise<ContactUsResponse>;
  submitBugBounty: (data: BugBountyRequest) => Promise<BugBountyResponse>;
  clearError: () => void;
}

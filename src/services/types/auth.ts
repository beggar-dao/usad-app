/**
 * Authentication API Types and Interfaces
 * Based on USAD backend API documentation
 */

import type { ApiResponse } from './common';

/**
 * User information interface
 */
export interface UserInfo {
  id: string;
  username: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  avatar: string;
  country: string;
  province: string;
  estimatedAmount: number;
  isBuyRedeem: boolean;
  is2FA: boolean;
  status: number;
}

/**
 * Login request interface
 */
export interface LoginRequest {
  email: string; // email field instead of username
  password: string; // plain text password
}

/**
 * Token Info Interface
 */
export interface TokenInfo {
  tokenName: string;
  tokenValue: string;
  isLogin: boolean;
  loginId: string;
  loginType: string;
  tokenTimeout: number;
  sessionTimeout: number;
  tokenSessionTimeout: number;
  tokenActiveTimeout: number;
  loginDevice: string;
  tag: string | null;
}

/**
 * Login response data interface
 */
export interface LoginResponseData {
  id: string;
  username: string;
  firstname: string | null;
  lastname: string | null;
  email: string;
  avatar: string;
  country: string;
  province: string;
  estimatedAmount: number;
  isBuyRedeem: boolean;
  is2FA: boolean;
  status: number;
  tokenInfo: TokenInfo;
}

/**
 * Login response interface
 */
export type LoginResponse = ApiResponse<LoginResponseData>;

/**
 * Register captcha request interface
 */
export interface RegisterCaptchaRequest {
  email: string;
  templateType: number;
}

/**
 * Register captcha response interface
 */
export type RegisterCaptchaResponse = ApiResponse<{ message: string }>;

/**
 * Register request interface
 */
export interface RegisterRequest {
  email: string;
  captcha: string;
  username: string;
  firstname: string;
  lastname: string;
  avatar?: string;
  password: string;
  country: string;
  province: string;
  estimatedAmount: number;
  isBuyRedeem: boolean;
}

/**
 * Register response data interface
 */
export interface RegisterResponseData {
  loginGUID: string;
  message?: string;
}

/**
 * Register response interface
 */
export type RegisterResponse = ApiResponse<RegisterResponseData>;

/**
 * 2FA Generate response data interface
 */
export interface TwoFAGenerateResponseData {
  secret: string;
  qrCodeContent: string;
  qrCodeImage: string; // base64 encoded image
}

/**
 * 2FA Generate response interface
 */
export type TwoFAGenerateResponse = ApiResponse<TwoFAGenerateResponseData>;

/**
 * 2FA Verify request interface
 */
export interface TwoFAVerifyRequest {
  totp: string; // 6-digit TOTP code
}

/**
 * 2FA Verify response data interface
 */
export interface TwoFAVerifyResponseData {
  data: boolean; // verification result
}

/**
 * 2FA Verify response interface
 */
export type TwoFAVerifyResponse = ApiResponse<TwoFAVerifyResponseData>;

/**
 * Logout response interface
 */
export type LogoutResponse = ApiResponse<{ message: string }>;

/**
 * Refresh token request interface
 */
export interface RefreshTokenRequest {
  refreshToken: string;
}

/**
 * Refresh token response data interface
 */
export interface RefreshTokenResponseData {
  token: string;
  refreshToken?: string;
  expiresIn?: number;
}

/**
 * Refresh token response interface
 */
export type RefreshTokenResponse = ApiResponse<RefreshTokenResponseData>;

/**
 * Reset password request interface
 */
export interface ResetPasswordRequest {
  email: string;
}

/**
 * Reset password response interface
 */
export type ResetPasswordResponse = ApiResponse<{ message: string }>;

/**
 * Change password request interface
 */
export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

/**
 * Change password response interface
 */
export type ChangePasswordResponse = ApiResponse<{ message: string }>;

/**
 * Auth state interface for global state management
 */
export interface AuthState {
  isAuthenticated: boolean;
  user: UserInfo | null;
  token: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
}

/**
 * Auth context interface
 */
export interface AuthContextType {
  authState: AuthState;
  login: (credentials: LoginRequest) => Promise<LoginResponse>;
  sendRegisterCaptcha: (
    data: RegisterCaptchaRequest,
  ) => Promise<RegisterCaptchaResponse>;
  register: (userData: RegisterRequest) => Promise<RegisterResponse>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  generate2FA: () => Promise<TwoFAGenerateResponse>;
  verify2FA: (data: TwoFAVerifyRequest) => Promise<TwoFAVerifyResponse>;
  resetPassword: (data: ResetPasswordRequest) => Promise<ResetPasswordResponse>;
  changePassword: (
    data: ChangePasswordRequest,
  ) => Promise<ChangePasswordResponse>;
  clearError: () => void;
}

/**
 * Form validation interfaces
 */
export interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterCaptchaFormData {
  email: string;
}

export interface RegisterFormData {
  email: string;
  captcha: string;
  username: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  password: string;
  confirmPassword: string;
  country: string;
  province: string;
  estimatedAmount: number;
  isBuyRedeem: boolean;
}

export interface TwoFAFormData {
  code: string;
}

export interface ResetPasswordFormData {
  email: string;
}

export interface ChangePasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

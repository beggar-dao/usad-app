/**
 * Authentication API Service
 * Handles all authentication-related API calls using UmiJS request
 */

import { request } from '@umijs/max';
import { TokenManager } from './token-manager';
import type {
  ChangePasswordRequest,
  ChangePasswordResponse,
  LoginRequest,
  LoginResponse,
  LogoutResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  RegisterCaptchaRequest,
  RegisterCaptchaResponse,
  RegisterRequest,
  RegisterResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  TwoFAGenerateResponse,
  TwoFAVerifyRequest,
  TwoFAVerifyResponse,
} from './types/auth';

/**
 * API Endpoints
 */
export const AUTH_ENDPOINTS = {
  LOGIN: '/user/auth/login',
  REGISTER_CAPTCHA: '/user/auth/captcha',
  REGISTER: '/user/auth/registry',
  LOGOUT: '/user/auth/logout',
  REFRESH_TOKEN: '/auth/refresh',
  RESET_PASSWORD: '/auth/reset-password',
  CHANGE_PASSWORD: '/auth/change-password',
  TWO_FA_GENERATE: '/user/auth/2fa/2fa',
  TWO_FA_VERIFY: '/user/auth/2fa/validation',
} as const;

// Token manager instance
const tokenManager = new TokenManager();

/**
 * Authentication Service Class using UmiJS request
 */
export class AuthService {
  /**
   * User login
   * @param credentials - Login credentials (email and password)
   * @returns Promise<LoginResponse>
   */
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await request<LoginResponse>(AUTH_ENDPOINTS.LOGIN, {
        method: 'POST',
        data: credentials,
        skipAuth: true,
      });

      // Store tokens if login successful
      if (response.success && response.data) {
        const now = Math.floor(Date.now() / 1000);
        const expiresAt = now + response.data.tokenInfo.tokenTimeout;

        tokenManager.setTokens({
          accessToken: response.data.tokenInfo.tokenValue,
          refreshToken: '', // No refresh token in this API
          tokenType: 'Bearer',
          expiresAt: expiresAt,
        });
      }

      return response;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  /**
   * Send registration captcha
   * @param data - Email for captcha
   * @returns Promise<RegisterCaptchaResponse>
   */
  async sendRegisterCaptcha(
    data: RegisterCaptchaRequest,
  ): Promise<RegisterCaptchaResponse> {
    try {
      const response = await request<RegisterCaptchaResponse>(
        AUTH_ENDPOINTS.REGISTER_CAPTCHA,
        {
          method: 'POST',
          data,
          skipAuth: true,
        },
      );

      return response;
    } catch (error) {
      console.error('Send captcha failed:', error);
      throw error;
    }
  }

  /**
   * User registration
   * @param userData - Registration data
   * @returns Promise<RegisterResponse>
   */
  async register(userData: RegisterRequest): Promise<RegisterResponse> {
    try {
      const response = await request<RegisterResponse>(
        AUTH_ENDPOINTS.REGISTER,
        {
          method: 'POST',
          data: userData,
          skipAuth: true,
        },
      );

      return response;
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  }

  /**
   * User logout
   * @returns Promise<LogoutResponse>
   */
  async logout(): Promise<LogoutResponse> {
    try {
      const response = await request<LogoutResponse>(AUTH_ENDPOINTS.LOGOUT, {
        method: 'POST',
      });

      // Clear tokens after successful logout
      tokenManager.clearTokens();

      return response;
    } catch (error) {
      // Clear tokens even if logout request fails
      tokenManager.clearTokens();
      console.error('Logout failed:', error);
      throw error;
    }
  }

  /**
   * Refresh authentication token
   * @param refreshTokenData - Refresh token data
   * @returns Promise<RefreshTokenResponse>
   */
  async refreshToken(
    refreshTokenData: RefreshTokenRequest,
  ): Promise<RefreshTokenResponse> {
    try {
      const response = await request<RefreshTokenResponse>(
        AUTH_ENDPOINTS.REFRESH_TOKEN,
        {
          method: 'POST',
          data: refreshTokenData,
          skipAuth: true,
        },
      );

      // Update tokens if refresh successful
      if (response.success && response.data) {
        tokenManager.setTokens({
          accessToken: response.data.token,
          refreshToken: response.data.refreshToken,
          tokenType: 'Bearer',
        });
      }

      return response;
    } catch (error) {
      console.error('Token refresh failed:', error);
      // Clear tokens if refresh fails
      tokenManager.clearTokens();
      throw error;
    }
  }

  /**
   * Generate 2FA secret and QR code
   * @returns Promise<TwoFAGenerateResponse>
   */
  async generate2FA(): Promise<TwoFAGenerateResponse> {
    try {
      const response = await request<TwoFAGenerateResponse>(
        AUTH_ENDPOINTS.TWO_FA_GENERATE,
        {
          method: 'POST',
        },
      );

      return response;
    } catch (error) {
      console.error('2FA generation failed:', error);
      throw error;
    }
  }

  /**
   * Verify 2FA code
   * @param verificationData - 2FA verification data
   * @returns Promise<TwoFAVerifyResponse>
   */
  async verify2FA(
    verificationData: TwoFAVerifyRequest,
  ): Promise<TwoFAVerifyResponse> {
    try {
      const response = await request<TwoFAVerifyResponse>(
        AUTH_ENDPOINTS.TWO_FA_VERIFY,
        {
          method: 'GET',
          params: { totp: verificationData.totp },
        },
      );

      return response;
    } catch (error) {
      console.error('2FA verification failed:', error);
      throw error;
    }
  }

  /**
   * Reset password
   * @param resetData - Reset password data
   * @returns Promise<ResetPasswordResponse>
   */
  async resetPassword(
    resetData: ResetPasswordRequest,
  ): Promise<ResetPasswordResponse> {
    try {
      const response = await request<ResetPasswordResponse>(
        AUTH_ENDPOINTS.RESET_PASSWORD,
        {
          method: 'POST',
          data: resetData,
          skipAuth: true,
        },
      );

      return response;
    } catch (error) {
      console.error('Password reset failed:', error);
      throw error;
    }
  }

  /**
   * Change password
   * @param changeData - Change password data
   * @returns Promise<ChangePasswordResponse>
   */
  async changePassword(
    changeData: ChangePasswordRequest,
  ): Promise<ChangePasswordResponse> {
    try {
      const response = await request<ChangePasswordResponse>(
        AUTH_ENDPOINTS.CHANGE_PASSWORD,
        {
          method: 'POST',
          data: changeData,
        },
      );

      return response;
    } catch (error) {
      console.error('Password change failed:', error);
      throw error;
    }
  }

  /**
   * Check if user is authenticated
   * @returns boolean
   */
  isAuthenticated(): boolean {
    return tokenManager.isAuthenticated();
  }

  /**
   * Get current authentication status
   * @returns object with authentication details
   */
  getAuthStatus() {
    return {
      isAuthenticated: this.isAuthenticated(),
      hasToken: tokenManager.isAuthenticated(),
    };
  }
}

/**
 * Default auth service instance
 */
export const authService = new AuthService();

/**
 * Export individual functions for convenience
 */
export const {
  login,
  sendRegisterCaptcha,
  register,
  logout,
  refreshToken,
  generate2FA,
  verify2FA,
  resetPassword,
  changePassword,
  isAuthenticated,
  getAuthStatus,
} = authService;

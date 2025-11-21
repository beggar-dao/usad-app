/**
 * Authentication Model - UmiJS Best Practice
 * Manages global authentication state using UmiJS model pattern with useRequest
 */

import { is2FAEnabled } from '@/config/env';
import { AUTH_ENDPOINTS } from '@/services/auth';
import { TokenManager } from '@/services/token-manager';
import type {
  ChangePasswordRequest,
  ChangePasswordResponse,
  LoginRequest,
  LoginResponse,
  RegisterCaptchaRequest,
  RegisterCaptchaResponse,
  RegisterRequest,
  RegisterResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  TwoFAGenerateResponse,
  TwoFAVerifyRequest,
  TwoFAVerifyResponse,
} from '@/services/types/auth';
import { extractAndTranslateError } from '@/utils/errorMessages';
import { history, request, useModel, useRequest } from '@umijs/max';
import { message } from 'antd';
import { useCallback, useEffect, useState } from 'react';

/**
 * Token manager instance
 */
const tokenManager = new TokenManager();

/**
 * Authentication model hook - UmiJS Best Practice
 * Uses useRequest for operations while maintaining global state
 */
export default function useAuthModel() {
  // Global authentication state
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem('userInfo') || '{}');
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return tokenManager.isAuthenticated();
  });
  const [error, setError] = useState<string | null>(null);
  const { setLoginModel, setAlertInfo } = useModel('dialogState');
  /**
   * Fetch current user info
   */
  const fetchUserInfo = useCallback(async () => {
    console.log('🔍 fetchUserInfo called');
    try {
      const tokens = tokenManager.getTokens();
      console.log('🔑 Tokens:', { hasAccessToken: !!tokens?.accessToken });

      if (tokens?.accessToken) {
        // Try to get user info from localStorage first
        const storedUser = localStorage.getItem('user');
        console.log('👤 Stored user:', { hasStoredUser: !!storedUser });

        if (storedUser) {
          try {
            const userInfo = JSON.parse(storedUser);
            console.log('✅ Setting user from localStorage:', userInfo.email);
            setUser(userInfo);
            return;
          } catch (e) {
            console.warn('Failed to parse stored user info');
          }
        }

        // TODO: Implement user info endpoint when available
        // const userResponse = await request('/user/profile');
        // setUser(userResponse.data);
        console.log(
          '⚠️ Token exists, but user info endpoint not implemented yet',
        );
      } else {
        console.log('❌ No access token found');
      }
    } catch (error) {
      console.error('Failed to fetch user info:', error);
      // If fetching user info fails, clear authentication
      tokenManager.clearTokens();
      setIsAuthenticated(false);
      setUser(null);
    }
  }, []);

  /**
   * Initialize authentication state from stored tokens
   */
  useEffect(() => {
    const authenticated = tokenManager.isAuthenticated();
    setIsAuthenticated(authenticated);

    // If authenticated, fetch user info
    if (authenticated) {
      fetchUserInfo();
    } else {
      console.log('❌ User is not authenticated');
    }
  }, [fetchUserInfo]);

  /**
   * Clear error state
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Login operation using useRequest
   */
  const { loading: loginLoading, run: loginRun } = useRequest(
    async (credentials: LoginRequest): Promise<LoginResponse> => {
      const response = await request<LoginResponse>(AUTH_ENDPOINTS.LOGIN, {
        method: 'POST',
        data: credentials,
        skipAuth: true,
      });

      console.log('response', response)

      if (response.success && response.data) {
        // localStorage.setItem('userInfo', JSON.stringify(response.data || {}));
        // Update global state
        setUser(response.data);
        setError(null);
        setLoginModel(true);
      }

      return response;
    },
    {
      manual: true,
      onError: (error: any) => {
        const errorMessage = extractAndTranslateError(error) || 'Login failed';
        setError(errorMessage);
      },
    },
  );

  const login = useCallback(
    (credentials: LoginRequest) => {
      clearError();
      return loginRun(credentials);
    },
    [loginRun, clearError],
  );

  /**
   * Send registration captcha using useRequest
   */
  const { loading: captchaLoading, run: captchaRun } = useRequest(
    async (data: RegisterCaptchaRequest): Promise<RegisterCaptchaResponse> => {
      const response = await request<RegisterCaptchaResponse>(
        AUTH_ENDPOINTS.REGISTER_CAPTCHA,
        {
          method: 'POST',
          data,
          skipAuth: true,
          skipErrorHandler: true,
        },
      );

      if (response.success) {
        setAlertInfo({
          type: 'success',
          message: 'Verification code sent successfully',
          show: true,
        });
      }

      return response;
    },
    {
      manual: true,
      onError: (error: any) => {
        // Translate error message to English and only set error state
        const errorMessage =
          extractAndTranslateError(error) || 'Failed to send verification code';
        setError(errorMessage);
        // Remove message.error to avoid duplicate error messages
      },
    },
  );

  const sendRegisterCaptcha = useCallback(
    (data: RegisterCaptchaRequest) => {
      clearError();
      return captchaRun(data);
    },
    [captchaRun, clearError],
  );

  /**
   * User registration using useRequest
   */
  const { loading: registerLoading, run: registerRun } = useRequest(
    async (userData: RegisterRequest): Promise<RegisterResponse> => {
      const response = await request<RegisterResponse>(
        AUTH_ENDPOINTS.REGISTER,
        {
          method: 'POST',
          data: userData,
          skipAuth: true,
        },
      );

      if (response.success) {
        setAlertInfo({
          type: 'success',
          message: is2FAEnabled()
            ? 'Registration successful! Please set up 2FA authentication.'
            : 'Registration successful! You can now log in to your account.',
          show: true,
        });
      }

      return response;
    },
    {
      manual: true,
      onError: (error: any) => {
        // Translate error message to English and only set error state
        // UI components (like Alert) will handle displaying the error
        const errorMessage =
          extractAndTranslateError(error) || 'Registration failed';
        setError(errorMessage);
        // Remove message.error to avoid duplicate error messages
      },
    },
  );

  const register = useCallback(
    (userData: RegisterRequest) => {
      clearError();
      return registerRun(userData);
    },
    [registerRun, clearError],
  );

  /**
   * User logout using useRequest
   */
  const { loading: logoutLoading, run: logoutRun } = useRequest(
    async (): Promise<void> => {
      try {
        await request(AUTH_ENDPOINTS.LOGOUT, {
          method: 'POST',
          skipErrorHandler: true, // Skip global error handler for logout
        });
      } catch (error) {
        // Continue with logout even if API call fails
        console.warn(
          'Logout API call failed, but continuing with local logout:',
          error,
        );
      }

      localStorage.clear();
      setUser({});
      setIsAuthenticated(false);
      setError(null);

      setAlertInfo({
        message: 'Logged out successfully',
        type: 'success',
        show: true,
      });

      // Redirect to login page
      history.push('/auth/login');
    },
    {
      manual: true,
      onError: (error: any) => {
        // Still clear tokens even on error
        tokenManager.clearTokens();
        localStorage.removeItem('user'); // Clear stored user info
        setUser(null);
        setIsAuthenticated(false);
        console.error('Logout error:', error);
        history.push('/auth/login');
      },
    },
  );

  const logout = useCallback(() => {
    return logoutRun();
  }, [logoutRun]);

  /**
   * Refresh authentication token using useRequest
   */
  const { loading: refreshLoading, run: refreshRun } = useRequest(
    async (): Promise<void> => {
      const currentRefreshToken = tokenManager.getRefreshToken();
      if (!currentRefreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await request(AUTH_ENDPOINTS.REFRESH_TOKEN, {
        method: 'POST',
        data: { refreshToken: currentRefreshToken },
        skipAuth: true,
      });

      if (response.success && response.data) {
        // Update tokens
        tokenManager.setTokens({
          accessToken: response.data.token,
          refreshToken: response.data.refreshToken || currentRefreshToken,
          tokenType: 'Bearer',
        });
        setError(null);
      } else {
        throw new Error('Token refresh failed');
      }
    },
    {
      manual: true,
      onError: async (error: any) => {
        console.error('Token refresh failed:', error);
        // If refresh fails, logout user
        await logout();
      },
    },
  );

  const refreshToken = useCallback(() => {
    return refreshRun();
  }, [refreshRun]);

  /**
   * Generate 2FA secret and QR code using useRequest
   */
  const { loading: generate2FALoading, run: generate2FARun } = useRequest(
    async (): Promise<TwoFAGenerateResponse> => {
      const response = await request<TwoFAGenerateResponse>(
        AUTH_ENDPOINTS.TWO_FA_GENERATE,
        {
          method: 'POST',
        },
      );

      return response;
    },
    {
      manual: true,
      onError: (error: any) => {
        // Translate error message to English and only set error state
        const errorMessage =
          extractAndTranslateError(error) || '2FA generation failed';
        setError(errorMessage);
        // Remove message.error to avoid duplicate error messages
      },
    },
  );

  const generate2FA = useCallback(() => {
    if (!is2FAEnabled()) {
      setAlertInfo({
        type: 'warning',
        message: '2FA is currently disabled.',
        show: true,
      });
      return Promise.reject(new Error('2FA is disabled'));
    }
    clearError();
    return generate2FARun();
  }, [generate2FARun, clearError]);

  /**
   * Verify 2FA code using useRequest
   */
  const { loading: verify2FALoading, run: verify2FARun } = useRequest(
    async (data: TwoFAVerifyRequest): Promise<TwoFAVerifyResponse> => {
      const response = await request<TwoFAVerifyResponse>(
        AUTH_ENDPOINTS.TWO_FA_VERIFY,
        {
          method: 'POST',
          data,
        },
      );

      if (response.success) {
        setAlertInfo({
          type: 'success',
          message: '2FA setup completed successfully!',
          show: true,
        });
        // Redirect to login page after successful 2FA setup
        history.push('/auth/login');
      }

      return response;
    },
    {
      manual: true,
      onError: (error: any) => {
        // Translate error message to English and only set error state
        const errorMessage =
          extractAndTranslateError(error) || '2FA verification failed';
        setError(errorMessage);
        // Remove message.error to avoid duplicate error messages
      },
    },
  );

  const verify2FA = useCallback(
    (data: TwoFAVerifyRequest) => {
      if (!is2FAEnabled()) {
        setAlertInfo({
          type: 'warning',
          message: '2FA is currently disabled.',
          show: true,
        });
        return Promise.reject(new Error('2FA is disabled'));
      }
      clearError();
      return verify2FARun(data);
    },
    [verify2FARun, clearError],
  );

  /**
   * Reset password using useRequest
   */
  const { loading: resetPasswordLoading, run: resetPasswordRun } = useRequest(
    async (data: ResetPasswordRequest): Promise<ResetPasswordResponse> => {
      const response = await request<ResetPasswordResponse>(
        AUTH_ENDPOINTS.RESET_PASSWORD,
        {
          method: 'POST',
          data,
          skipAuth: true,
        },
      );

      clearError();
      if (response.success) {
        setAlertInfo({
          type: 'success',
          message: 'Password reset email sent!',
          show: true,
        });
      }

      return response;
    },
    {
      manual: true,
      onError: (error: any) => {
        // Translate error message to English and only set error state
        const errorMessage =
          extractAndTranslateError(error) || 'Password reset failed';
        setError(errorMessage);
        // Remove message.error to avoid duplicate error messages
      },
    },
  );

  const resetPassword = useCallback(
    (data: ResetPasswordRequest) => {
      clearError();
      return resetPasswordRun(data);
    },
    [resetPasswordRun, clearError],
  );

  /**
   * Change password using useRequest
   */
  const { loading: changePasswordLoading, run: changePasswordRun } = useRequest(
    async (data: ChangePasswordRequest): Promise<ChangePasswordResponse> => {
      const response = await request<ChangePasswordResponse>(
        AUTH_ENDPOINTS.CHANGE_PASSWORD,
        {
          method: 'POST',
          data,
        },
      );

      if (response.success) {
        message.success('Password changed successfully!');
      }

      return response;
    },
    {
      manual: true,
      onError: (error: any) => {
        // Translate error message to English and only set error state
        const errorMessage =
          extractAndTranslateError(error) || 'Password change failed';
        setError(errorMessage);
        // Remove message.error to avoid duplicate error messages
      },
    },
  );

  const changePassword = useCallback(
    (data: ChangePasswordRequest) => {
      clearError();
      return changePasswordRun(data);
    },
    [changePasswordRun, clearError],
  );

  return {
    // State
    user,
    setUser,
    isAuthenticated,
    error,
    setIsAuthenticated,
    // Loading states
    loading:
      loginLoading ||
      captchaLoading ||
      registerLoading ||
      logoutLoading ||
      refreshLoading ||
      generate2FALoading ||
      verify2FALoading,
    loginLoading,
    captchaLoading,
    registerLoading,
    logoutLoading,
    refreshLoading,
    generate2FALoading,
    verify2FALoading,
    resetPasswordLoading,
    changePasswordLoading,

    // Actions
    login,
    sendRegisterCaptcha,
    register,
    logout,
    refreshToken,
    generate2FA,
    verify2FA,
    resetPassword,
    changePassword,
    clearError,

    // Legacy compatibility (for existing components)
    authState: {
      isAuthenticated,
      user,
      token: tokenManager.getAccessToken(),
      refreshToken: tokenManager.getRefreshToken(),
      loading:
        loginLoading ||
        captchaLoading ||
        registerLoading ||
        logoutLoading ||
        refreshLoading ||
        generate2FALoading ||
        verify2FALoading,
      error,
    },
  };
}

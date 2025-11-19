/**
 * Token Manager
 * Handles JWT token storage, validation, and refresh logic
 */

import type { TokenStorage } from './types/common';

/**
 * Storage keys for tokens
 */
const STORAGE_KEYS = {
  ACCESS_TOKEN: 'usad_access_token',
  REFRESH_TOKEN: 'usad_refresh_token',
  EXPIRES_AT: 'usad_token_expires_at',
  TOKEN_TYPE: 'usad_token_type',
} as const;

/**
 * Token Manager class
 */
export class TokenManager {
  /**
   * Check if running in browser environment
   */
  private isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  /**
   * Get item from localStorage safely
   */
  private getStorageItem(key: string): string | null {
    if (!this.isBrowser()) return null;
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.warn('Failed to read from localStorage:', error);
      return null;
    }
  }

  /**
   * Set item to localStorage safely
   */
  private setStorageItem(key: string, value: string): void {
    if (!this.isBrowser()) return;
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.warn('Failed to write to localStorage:', error);
    }
  }

  /**
   * Remove item from localStorage safely
   */
  private removeStorageItem(key: string): void {
    if (!this.isBrowser()) return;
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn('Failed to remove from localStorage:', error);
    }
  }

  /**
   * Set authentication tokens
   */
  setTokens(tokenData: TokenStorage): void {
    if (tokenData.accessToken) {
      this.setStorageItem(STORAGE_KEYS.ACCESS_TOKEN, tokenData.accessToken);
    }

    if (tokenData.refreshToken) {
      this.setStorageItem(STORAGE_KEYS.REFRESH_TOKEN, tokenData.refreshToken);
    }

    if (tokenData.expiresAt) {
      this.setStorageItem(
        STORAGE_KEYS.EXPIRES_AT,
        tokenData.expiresAt.toString(),
      );
    }

    if (tokenData.tokenType) {
      this.setStorageItem(STORAGE_KEYS.TOKEN_TYPE, tokenData.tokenType);
    }
  }

  /**
   * Get access token
   */
  getAccessToken(): string | null {
    return this.getStorageItem('token');
  }

  /**
   * Get refresh token
   */
  getRefreshToken(): string | null {
    return this.getStorageItem(STORAGE_KEYS.REFRESH_TOKEN);
  }

  /**
   * Get token expiration time
   */
  getExpiresAt(): number | null {
    const expiresAt = this.getStorageItem(STORAGE_KEYS.EXPIRES_AT);
    return expiresAt ? parseInt(expiresAt, 10) : null;
  }

  /**
   * Get token type
   */
  getTokenType(): string | null {
    return this.getStorageItem(STORAGE_KEYS.TOKEN_TYPE) || 'Bearer';
  }

  /**
   * Get all token data
   */
  getTokens(): TokenStorage {
    return {
      accessToken: this.getAccessToken() || undefined,
      refreshToken: this.getRefreshToken() || undefined,
      expiresAt: this.getExpiresAt() || undefined,
      tokenType: this.getTokenType() || undefined,
    };
  }

  /**
   * Clear all tokens
   */
  clearTokens(): void {
    this.removeStorageItem(STORAGE_KEYS.ACCESS_TOKEN);
    this.removeStorageItem(STORAGE_KEYS.REFRESH_TOKEN);
    this.removeStorageItem(STORAGE_KEYS.EXPIRES_AT);
    this.removeStorageItem(STORAGE_KEYS.TOKEN_TYPE);
  }

  /**
   * Check if token is expired
   */
  isTokenExpired(): boolean {
    const expiresAt = this.getExpiresAt();
    if (!expiresAt) return true;

    const now = Math.floor(Date.now() / 1000);
    return now >= expiresAt;
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    const accessToken = this.getAccessToken();
    return !!accessToken;
  }

  /**
   * Check if token will expire soon (within 5 minutes)
   */
  willExpireSoon(): boolean {
    const expiresAt = this.getExpiresAt();
    if (!expiresAt) return true;

    const now = Math.floor(Date.now() / 1000);
    const fiveMinutes = 5 * 60; // 5 minutes in seconds
    return expiresAt - now <= fiveMinutes;
  }

  /**
   * Calculate token expiration time from JWT
   */
  calculateExpirationFromJWT(token: string): number | null {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp || null;
    } catch (error) {
      console.warn('Failed to parse JWT token:', error);
      return null;
    }
  }

  /**
   * Set token with automatic expiration calculation
   */
  setTokenWithExpiration(accessToken: string, refreshToken?: string): void {
    const expiresAt = this.calculateExpirationFromJWT(accessToken);

    this.setTokens({
      accessToken,
      refreshToken,
      expiresAt: expiresAt || undefined,
      tokenType: 'Bearer',
    });
  }
}

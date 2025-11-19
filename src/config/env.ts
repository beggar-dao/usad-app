/**
 * Environment Configuration
 * Centralized configuration management for different environments
 */

export interface EnvConfig {
  // API Configuration
  apiBaseUrl: string;
  apiTimeout: number;

  // Authentication Configuration
  jwtSecretKey: string;
  jwtExpiresIn: number;
  refreshTokenExpiresIn: number;

  // Application Configuration
  appEnv: string;
  appName: string;
  appVersion: string;

  // Debug Configuration
  debugMode: boolean;
  logLevel: string;

  // Feature Flags
  enable2FA: boolean;
}

/**
 * Get environment variable with fallback
 */
const getEnvVar = (key: string, defaultValue: string = ''): string => {
  // UmiJS 通过 define 配置注入环境变量到 process.env
  return (process.env as any)[key] || defaultValue;
};

/**
 * Get environment configuration
 */
export const getEnvConfig = (): EnvConfig => {
  return {
    // API Configuration
    apiBaseUrl: getEnvVar('UMI_APP_API_BASE_URL', 'http://localhost:8000'),
    apiTimeout: parseInt(getEnvVar('UMI_APP_API_TIMEOUT', '10000'), 10),

    // Authentication Configuration
    jwtSecretKey: getEnvVar('UMI_APP_JWT_SECRET_KEY', 'default-secret-key'),
    jwtExpiresIn: parseInt(getEnvVar('UMI_APP_JWT_EXPIRES_IN', '3600'), 10),
    refreshTokenExpiresIn: parseInt(
      getEnvVar('UMI_APP_REFRESH_TOKEN_EXPIRES_IN', '604800'),
      10,
    ),

    // Application Configuration
    appEnv: getEnvVar('UMI_APP_APP_ENV', 'development'),
    appName: getEnvVar('UMI_APP_APP_NAME', 'GBPC'),
    appVersion: getEnvVar('UMI_APP_APP_VERSION', '1.0.0'),

    // Debug Configuration
    debugMode: getEnvVar('UMI_APP_DEBUG_MODE', 'true') === 'true',
    logLevel: getEnvVar('UMI_APP_LOG_LEVEL', 'debug'),

    // Feature Flags
    enable2FA: getEnvVar('UMI_APP_ENABLE_2FA', 'true') === 'true',
  };
};

/**
 * Environment configuration instance
 */
export const envConfig = getEnvConfig();

/**
 * Check if running in development mode
 */
export const isDevelopment = () => envConfig.appEnv === 'development';

/**
 * Check if running in production mode
 */
export const isProduction = () => envConfig.appEnv === 'production';

/**
 * Check if running in staging mode
 */
export const isStaging = () => envConfig.appEnv === 'staging';

/**
 * Check if 2FA is enabled
 */
export const is2FAEnabled = () => envConfig.enable2FA;

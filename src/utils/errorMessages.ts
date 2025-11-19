/**
 * Error Message Mapping Utility
 * Maps Chinese error messages from backend to English messages for UI display
 */

// Common error message mappings from Chinese to English
const ERROR_MESSAGE_MAP: Record<string, string> = {
  // Authentication errors
  用户不存在: 'Invalid email or password',
  用户密码错误: 'Invalid email or password',
  用户名或密码错误: 'Invalid email or password',
  邮箱或密码错误: 'Invalid email or password',
  账号已被锁定: 'Account has been locked',
  账号已被禁用: 'Account has been disabled',
  登录失败: 'Login failed',
  认证失败: 'Authentication failed',
  会话已过期: 'Session has expired',
  令牌无效: 'Invalid token',
  令牌已过期: 'Token has expired',

  // Registration errors
  用户已存在: 'User already exists',
  邮箱已被注册: 'Email is already registered',
  用户名已被占用: 'Username is already taken',
  注册失败: 'Registration failed',
  验证码错误: 'Invalid verification code',
  验证码已过期: 'Verification code has expired',
  密码格式不正确: 'Password format is incorrect',
  邮箱格式不正确: 'Email format is incorrect',

  // 2FA errors
  二次验证失败: '2FA verification failed',
  验证器代码错误: 'Authenticator code is incorrect',
  二次验证码错误: '2FA code is incorrect',
  二次验证码已过期: '2FA code has expired',

  // General errors
  请求失败: 'Request failed',
  服务器错误: 'Server error',
  网络错误: 'Network error',
  参数错误: 'Invalid parameters',
  权限不足: 'Insufficient permissions',
  操作失败: 'Operation failed',
  数据不存在: 'Data not found',
  操作超时: 'Operation timeout',

  // Form validation errors
  必填字段不能为空: 'Required fields cannot be empty',
  字段格式不正确: 'Field format is incorrect',
  字段长度超出限制: 'Field length exceeds limit',
  字段值不在允许范围内: 'Field value is not in allowed range',
};

/**
 * Convert Chinese error message to English
 * @param message - The error message (possibly in Chinese)
 * @returns English error message
 */
export const translateErrorMessage = (message: string): string => {
  if (!message) {
    return 'An unexpected error occurred';
  }

  // Check if the message exists in our mapping
  const translatedMessage = ERROR_MESSAGE_MAP[message.trim()];

  if (translatedMessage) {
    return translatedMessage;
  }

  // If no mapping found, check if the message contains Chinese characters
  const containsChinese = /[\u4e00-\u9fff]/.test(message);

  if (containsChinese) {
    // If it contains Chinese but no mapping found, return a generic English message
    console.warn(`Untranslated Chinese error message: "${message}"`);
    return 'An error occurred. Please try again.';
  }

  // If it's already in English or other language, return as is
  return message;
};

/**
 * Extract and translate error message from various error response formats
 * @param error - Error object from API response
 * @returns Translated English error message
 */
export const extractAndTranslateError = (error: any): string => {
  let errorMessage = '';

  // Try to extract error message from different possible locations
  if (error?.response?.data?.message) {
    errorMessage = error.response.data.message;
  } else if (error?.response?.data?.errorMessage) {
    errorMessage = error.response.data.errorMessage;
  } else if (error?.message) {
    errorMessage = error.message;
  } else if (error?.info?.errorMessage) {
    errorMessage = error.info.errorMessage;
  } else if (typeof error === 'string') {
    errorMessage = error;
  }

  return translateErrorMessage(errorMessage);
};

/**
 * Add new error message mapping
 * @param chineseMessage - Chinese error message
 * @param englishMessage - English translation
 */
export const addErrorMessageMapping = (
  chineseMessage: string,
  englishMessage: string,
): void => {
  ERROR_MESSAGE_MAP[chineseMessage] = englishMessage;
};

/**
 * Get all available error message mappings
 * @returns Object containing all error message mappings
 */
export const getErrorMessageMappings = (): Record<string, string> => {
  return { ...ERROR_MESSAGE_MAP };
};

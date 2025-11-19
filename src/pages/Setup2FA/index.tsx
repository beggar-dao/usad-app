import { is2FAEnabled } from '@/config/env';
import type { TwoFAFormData } from '@/services/types/auth';
import { history, useModel } from '@umijs/max';
import { Alert, Button, Form, Input, Result, Spin } from 'antd';
import { useEffect, useState } from 'react';

const Setup2FAForm = () => {
  const [form] = Form.useForm();
  const {
    generate2FA,
    verify2FA,
    generate2FALoading,
    verify2FALoading,
    error,
    clearError,
  } = useModel('auth');
  const [qrData, setQrData] = useState<any>(null);

  // Check if 2FA is enabled, redirect to login if disabled
  useEffect(() => {
    if (!is2FAEnabled()) {
      history.push('/Auth/Login');
      return;
    }
  }, []);

  /**
   * Generate 2FA QR code on component mount
   */
  useEffect(() => {
    const generateQRCode = async () => {
      try {
        clearError(); // Clear any previous errors
        const response = await generate2FA();
        if (response) {
          setQrData(response);
        }
      } catch (error) {
        console.error('Failed to generate 2FA:', error);
        // Error message is handled by the auth model
      }
    };

    generateQRCode();
  }, [generate2FA, clearError]);

  /**
   * Handle 2FA verification
   */
  const handleVerify2FA = async (values: TwoFAFormData) => {
    try {
      clearError(); // Clear any previous errors
      await verify2FA({
        totp: values.code,
      });
      // Success message and redirect are handled in the model
    } catch (error) {
      console.error('2FA verification error:', error);
      // Error message is handled in the model
    }
  };

  /**
   * Handle form validation failure
   */
  const handleSubmitFailed = (errorInfo: any) => {
    console.log('Form validation failed:', errorInfo);
  };

  return (
    <>
      <div className="bg-login">
        <section className="two-column-section">
          <div className="img-side">
            <img src="../images/img_login.png" alt="2FA Setup Illustration" />
          </div>

          <div className="form-side">
            <div className="container card-dataprotection scroll-card">
              {!is2FAEnabled() ? (
                <Result
                  status="info"
                  title="Two-Factor Authentication is Disabled"
                  subTitle="2FA is currently disabled for this application. You will be redirected to the login page."
                  extra={
                    <Button
                      type="primary"
                      onClick={() => history.push('/Auth/Login')}
                    >
                      Go to Login
                    </Button>
                  }
                />
              ) : (
                <>
                  <h2 className="register-title text-center">
                    Set Up Two-Factor Authentication
                  </h2>

                  {/* Show error message if any */}
                  {error && (
                    <Alert
                      message={error}
                      type="error"
                      showIcon
                      closable
                      onClose={clearError}
                      style={{ marginBottom: 16 }}
                    />
                  )}

                  <div
                    className="alert-warning-box"
                    style={{ marginBottom: '20px' }}
                  >
                    <p>
                      <strong>Important:</strong> Two-factor authentication adds
                      an extra layer of security to your account. Please scan
                      the QR code with your authenticator app and enter the
                      verification code below.
                    </p>
                  </div>

                  {generate2FALoading ? (
                    <div style={{ textAlign: 'center', padding: '40px' }}>
                      <Spin size="large" />
                      <p style={{ marginTop: '16px' }}>Generating QR Code...</p>
                    </div>
                  ) : qrData ? (
                    <Form
                      form={form}
                      layout="vertical"
                      onFinish={handleVerify2FA}
                      onFinishFailed={handleSubmitFailed}
                      className="register-form"
                    >
                      {/* QR Code Display */}
                      <div
                        style={{ textAlign: 'center', marginBottom: '24px' }}
                      >
                        <h4 style={{ marginBottom: '16px' }}>
                          Scan this QR code with your authenticator app:
                        </h4>
                        <div
                          style={{
                            display: 'inline-block',
                            padding: '16px',
                            backgroundColor: '#fff',
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                          }}
                        >
                          <img
                            src={qrData.qrCodeImage}
                            alt="2FA QR Code"
                            style={{ maxWidth: '200px', height: 'auto' }}
                          />
                        </div>
                      </div>

                      {/* Secret Key Display */}
                      <div
                        style={{ marginBottom: '24px', textAlign: 'center' }}
                      >
                        <p style={{ marginBottom: '8px' }}>
                          <strong>Or enter this secret key manually:</strong>
                        </p>
                        <div
                          style={{
                            padding: '12px',
                            backgroundColor: '#f5f5f5',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontFamily: 'monospace',
                            fontSize: '14px',
                            wordBreak: 'break-all',
                          }}
                        >
                          {qrData.secret}
                        </div>
                      </div>

                      {/* Verification Code Input */}
                      <Form.Item
                        label="Enter the 6-digit code from your authenticator app:"
                        name="code"
                        rules={[
                          {
                            required: true,
                            message: 'Please enter the verification code!',
                          },
                          {
                            len: 6,
                            message: 'Verification code must be 6 digits!',
                          },
                          {
                            pattern: /^\d{6}$/,
                            message:
                              'Verification code must contain only numbers!',
                          },
                        ]}
                      >
                        <Input
                          placeholder="000000"
                          maxLength={6}
                          style={{
                            fontSize: '18px',
                            textAlign: 'center',
                            letterSpacing: '4px',
                            padding: '12px',
                          }}
                        />
                      </Form.Item>

                      <Button
                        type="primary"
                        htmlType="submit"
                        className="register-button"
                        loading={verify2FALoading}
                        style={{
                          width: '100%',
                          backgroundColor: '#202B4B',
                          borderColor: '#202B4B',
                          marginTop: '16px',
                        }}
                      >
                        Verify and Complete Setup
                      </Button>

                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginTop: '16px',
                        }}
                      >
                        <p className="register-footer">
                          Need help? <a href="/ContactUs">Contact Support</a>
                        </p>
                      </div>
                    </Form>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '40px' }}>
                      <p>
                        Failed to generate QR code. Please refresh the page to
                        try again.
                      </p>
                      <Button
                        onClick={() => window.location.reload()}
                        style={{
                          backgroundColor: '#202B4B',
                          borderColor: '#202B4B',
                        }}
                        type="primary"
                      >
                        Refresh Page
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Setup2FAForm;

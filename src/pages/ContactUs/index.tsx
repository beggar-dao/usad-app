import PageAnimate from '@/components/pageAnimate';
import type { ContactUsFormData } from '@/services/types/support';
import { useModel } from '@umijs/max';
import { Alert, Button, Form, Input, Select } from 'antd';
import { useState } from 'react';
import Section from '@/components/Section.tsx';

const { TextArea } = Input;

export default () => {
  const { isWeb } = useModel('window');
  const [form] = Form.useForm();
  const {
    submitContactUs,
    contactUsLoading,
    error,
    clearError,
    lastSubmission,
  } = useModel('support');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { setAlertInfo } = useModel('dialogState');

  /**
   * Handle form submission
   */
  const handleSubmit = async (values: ContactUsFormData) => {
    try {
      clearError();
      await submitContactUs({
        name: values.name,
        email: values.email,
        subject: values.subject,
        description: values.description,
      });

      // Reset form and show success state
      form.resetFields();
      setIsSubmitted(true);

      // Reset success state after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error('Contact form submission error:', error);
      // Error message is handled by the support model
    }
  };

  /**
   * Handle form validation failure
   */
  const handleSubmitFailed = (errorInfo: any) => {
    console.log('Form validation failed:', errorInfo);
    setAlertInfo({
      type: 'error',
      message: 'Please fill in all required fields correctly.',
      show: true,
    });
  };

  const ContactUsHeader = () => (
    <div>
      <Section
        title={
          <div className="text-[46px]">
            Powering the future of finance, one pound at a time
          </div>
        }
        src="/images/img_contactus.png"
        desc="Trusted by institutions. Built for developers. Ready for the world."
        contact={
          <div className="max-w-[1440px] m-auto">
            <div className="container card-dataprotection p-[48px]">
              <h2 className="contact-title text-[40px] mb-[48px]">
                Contact Us
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

              {/* Show success message */}
              {isSubmitted && lastSubmission.type === 'contact' && (
                <Alert
                  message="Message Sent Successfully!"
                  description={`Your message has been submitted. ${lastSubmission.id
                    ? `Reference ID: ${lastSubmission.id}`
                    : ''
                    } We will get back to you soon.`}
                  type="success"
                  showIcon
                  style={{ marginBottom: 16 }}
                />
              )}

              <Form
                form={form}
                className="contact-form"
                layout="vertical"
                onFinish={handleSubmit}
                onFinishFailed={handleSubmitFailed}
                disabled={contactUsLoading}
              >
                <Form.Item
                  name="name"
                  label="Name"
                  required
                  rules={[
                    { required: true, message: 'Please enter your name!' },
                    { min: 2, message: 'Name must be at least 2 characters!' },
                    {
                      max: 100,
                      message: 'Name must not exceed 100 characters!',
                    },
                  ]}
                >
                  <Input
                    className="contact-input"
                    placeholder="Your Full Name"
                    size="large"
                  />
                </Form.Item>

                <Form.Item
                  name="subject"
                  label="Subject"
                  required
                  rules={[
                    { required: true, message: 'Please select a subject!' },
                  ]}
                >
                  <Select
                    style={{ height: '51px' }}
                    className="subject"
                    placeholder="Please Select"
                    size="large"
                  >
                    <Select.Option value="Account & Verification – KYC/KYB, login, or account setup issues">
                      Account & Verification – KYC/KYB, login, or account setup
                      issues
                    </Select.Option>
                    <Select.Option value="Buying USAD – Questions about purchasing USAD or payment instructions">
                      Buying USAD – Questions about purchasing USAD or payment
                      instructions
                    </Select.Option>
                    <Select.Option value="Deposits & Withdrawals – Fiat or on-chain deposits, burns for USA withdrawals">
                      Deposits & Withdrawals – Fiat or on-chain deposits, burns
                      for USA withdrawals
                    </Select.Option>
                    <Select.Option value="Transfers & Wallets – On-chain transfers, whitelisted addresses, or private key exports">
                      Transfers & Wallets – On-chain transfers, whitelisted
                      addresses, or private key exports
                    </Select.Option>
                    <Select.Option value="Security Issue / Unauthorized Transaction – Report suspected account compromise, fraud, or hacked accounts">
                      Security Issue / Unauthorized Transaction – Report
                      suspected account compromise, fraud, or hacked accounts
                    </Select.Option>
                    <Select.Option value="Technical Support – Website bugs, errors, or transaction issues">
                      Technical Support – Website bugs, errors, or transaction
                      issues
                    </Select.Option>
                    <Select.Option value="Compliance & Regulation – Legal, jurisdictional, or tax-related questions">
                      Compliance & Regulation – Legal, jurisdictional, or
                      tax-related questions
                    </Select.Option>
                    <Select.Option value="Partnerships & Business Inquiries – For businesses, payment providers, or exchanges">
                      Partnerships & Business Inquiries – For businesses,
                      payment providers, or exchanges
                    </Select.Option>
                    <Select.Option value="Feedback & Suggestions – Share your thoughts to improve USAD">
                      Feedback & Suggestions – Share your thoughts to improve
                      USAD
                    </Select.Option>
                    <Select.Option value="Other – Anything else not listed">
                      Other – Anything else not listed
                    </Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="email"
                  label="Email"
                  required
                  rules={[
                    { required: true, message: 'Please enter your email!' },
                    {
                      type: 'email',
                      message: 'Please enter a valid email address!',
                    },
                  ]}
                >
                  <Input
                    className="contact-input"
                    placeholder="Your Email Address"
                    size="large"
                  />
                </Form.Item>

                <Form.Item
                  name="description"
                  label="Description"
                  required
                  rules={[
                    { required: true, message: 'Please enter your message!' },
                    {
                      min: 10,
                      message: 'Description must be at least 10 characters!',
                    },
                    {
                      max: 2000,
                      message: 'Description must not exceed 2000 characters!',
                    },
                  ]}
                >
                  <TextArea
                    className="contact-textarea"
                    placeholder="Please provide details about your issue"
                    rows={5}
                    showCount
                    maxLength={2000}
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="contact-button max-w-[244px]"
                    loading={contactUsLoading}
                    disabled={contactUsLoading}
                    size="large"
                    block
                  >
                    {contactUsLoading ? 'Sending...' : 'Contact us'}
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        }
      />
    </div>
  );
  if (!isWeb) {
    return (
      <div>
        <div
          className="py=[70px]"
          style={{
            background:
              'linear-gradient(180deg, rgba(255, 255, 255, 0.51) 4.8%, rgba(157, 203, 255, 0.95) 51.46%, rgba(171, 210, 255, 0.95) 64.78%, rgba(255, 255, 255, 0.00) 90.8%)',
          }}
        >
          <img
            className="w-[80%] block mx-auto"
            src="/images/img_contactus.png"
          />
          <h1 className="text-[32px] font-inter font-[700] mx-[20px] text-center leading-[40px] mb-[10px]">
            Powering the future of finance, one pound at a time
          </h1>
          <p className="px-[20px] text-[14px] font-inter font-[400] leading-[22px] text-[#4F5155] mb-0">
            Trusted by institutions. Built for developers. Ready for the world.
          </p>
        </div>
        <div>
          <div className="p-[20px] pt-[36px]">
            <h2 className="contact-title text-[24px] !mb-[12px]">Contact Us</h2>

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

            {/* Show success message */}
            {isSubmitted && lastSubmission.type === 'contact' && (
              <Alert
                message="Message Sent Successfully!"
                description={`Your message has been submitted. ${lastSubmission.id ? `Reference ID: ${lastSubmission.id}` : ''
                  } We will get back to you soon.`}
                type="success"
                showIcon
                style={{ marginBottom: 16 }}
              />
            )}

            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              onFinishFailed={handleSubmitFailed}
              disabled={contactUsLoading}
            >
              <Form.Item
                name="name"
                className="!mb-[12px]"
                label="Name"
                required
                rules={[
                  { required: true, message: 'Please enter your name!' },
                  { min: 2, message: 'Name must be at least 2 characters!' },
                  {
                    max: 100,
                    message: 'Name must not exceed 100 characters!',
                  },
                ]}
              >
                <Input
                  className={`${isWeb ? 'contact-input' : 'mobile-contact-input'}`}
                  placeholder="Your Full Name"
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="subject"
                label="Subject"
                required
                className="!mb-[12px]"
                rules={[
                  { required: true, message: 'Please select a subject!' },
                ]}
              >
                <Select
                  style={{ height: '51px' }}
                  className="subject no-border-select"
                  placeholder="Please Select"
                  size="large"
                >
                  <Select.Option value="Account & Verification – KYC/KYB, login, or account setup issues">
                    Account & Verification – KYC/KYB, login, or account setup
                    issues
                  </Select.Option>
                  <Select.Option value="Buying USAD – Questions about purchasing USAD or payment instructions">
                    Buying USAD – Questions about purchasing USAD or payment
                    instructions
                  </Select.Option>
                  <Select.Option value="Deposits & Withdrawals – Fiat or on-chain deposits, burns for USA withdrawals">
                    Deposits & Withdrawals – Fiat or on-chain deposits, burns
                    for USA withdrawals
                  </Select.Option>
                  <Select.Option value="Transfers & Wallets – On-chain transfers, whitelisted addresses, or private key exports">
                    Transfers & Wallets – On-chain transfers, whitelisted
                    addresses, or private key exports
                  </Select.Option>
                  <Select.Option value="Security Issue / Unauthorized Transaction – Report suspected account compromise, fraud, or hacked accounts">
                    Security Issue / Unauthorized Transaction – Report suspected
                    account compromise, fraud, or hacked accounts
                  </Select.Option>
                  <Select.Option value="Technical Support – Website bugs, errors, or transaction issues">
                    Technical Support – Website bugs, errors, or transaction
                    issues
                  </Select.Option>
                  <Select.Option value="Compliance & Regulation – Legal, jurisdictional, or tax-related questions">
                    Compliance & Regulation – Legal, jurisdictional, or
                    tax-related questions
                  </Select.Option>
                  <Select.Option value="Partnerships & Business Inquiries – For businesses, payment providers, or exchanges">
                    Partnerships & Business Inquiries – For businesses, payment
                    providers, or exchanges
                  </Select.Option>
                  <Select.Option value="Feedback & Suggestions – Share your thoughts to improve USAD">
                    Feedback & Suggestions – Share your thoughts to improve USAD
                  </Select.Option>
                  <Select.Option value="Other – Anything else not listed">
                    Other – Anything else not listed
                  </Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="email"
                label="Email"
                className="!mb-[12px]"
                required
                rules={[
                  { required: true, message: 'Please enter your email!' },
                  {
                    type: 'email',
                    message: 'Please enter a valid email address!',
                  },
                ]}
              >
                <Input
                  className={`${isWeb ? 'contact-input' : 'mobile-contact-input'}`}
                  placeholder="Your Email Address"
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="description"
                label="Description"
                className="!mb-[28px]"
                required
                rules={[
                  { required: true, message: 'Please enter your message!' },
                  {
                    min: 10,
                    message: 'Description must be at least 10 characters!',
                  },
                  {
                    max: 2000,
                    message: 'Description must not exceed 2000 characters!',
                  },
                ]}
              >
                <TextArea
                  className={`${isWeb ? 'contact-textarea' : 'mobile-contact-textarea'}`}
                  placeholder="Please provide details about your issue"
                  rows={5}
                  showCount
                  maxLength={2000}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="contact-button h-[48px]"
                  loading={contactUsLoading}
                  disabled={contactUsLoading}
                  size="large"
                  block
                >
                  {contactUsLoading ? 'Sending...' : 'Contact us'}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    );
  }
  return (
    <PageAnimate>
      <div className="bg-section">
        <div className="footer_bg !pb-[80px]">
          <ContactUsHeader />
        </div>
      </div>
    </PageAnimate>
  );
};

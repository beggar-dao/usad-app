import { history, matchRoutes, type RequestConfig } from '@umijs/max';
import 'animate.css';
import { message } from 'antd';
import React from 'react';
import { envConfig } from './config/env';

/**
 * Request configuration for UmiJS following best practices
 */
export const request: RequestConfig = {
  // Base configuration
  baseURL: envConfig.apiBaseUrl,
  timeout: envConfig.apiTimeout,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },

  // Error handling configuration
  errorConfig: {
    // Error throwing - processes backend response and throws custom errors
  },

  // Request interceptors
  requestInterceptors: [
    (config: any) => {
      // Add authentication token
      const token = localStorage.getItem('token');
      config.headers = {
        'Content-Type': 'application/json',
        ...config.headers,
        satoken: `${token}`,
      };
      return config;
    },
  ],

  // Response interceptors
  responseInterceptors: [
    (response: any) => {
      let data = response.data;

      if (data.code === 'A10005') {
        history.push('/Auth/Login');
      }

      if (data.code !== '00000') {
        message.error(data.message || 'An unexpected error occurred.');
        return Promise.reject(response);
      }

      return response;
    },
  ],
};

export function rootContainer(container: React.ReactNode) {
  return container;
}

export function onRouteChange({ clientRoutes, location }) {
  const metas = [
    {
      path: '/',
      title: 'USAD: Trusted USA-Pegged Stablecoin',
      description:
        'USAD is a fully-backed digital British Pound designed for institutions, fintechs, and individuals—fast, secure, and transparent.',
    },
    {
      path: '/Auth/Login',
      title: 'USAD Login: Secure Account Access',
      description:
        'Log in to your USAD account with secure two-factor authentication and manage your digital Pound holdings.',
    },
    {
      path: '/CreateAccount',
      title: 'Create Your USAD Account',
      description:
        'Sign up for a USAD account to buy, redeem, and manage USA-backed digital tokens securely and easily.',
    },
    {
      path: '/ResetPassword',
      title: 'Reset Your USAD Password',
      description:
        'Forgot your password? Securely reset your USAD login credentials and regain access to your account.',
    },
  ];

  const route = matchRoutes(clientRoutes, location.pathname)?.pop()?.route;

  if (route) {
    const meta = metas.find((item) => item.path === route.path);
    if (meta) {
      document.title = meta.title;
      const descriptionMetaTag = document.querySelector(
        "meta[name='description']",
      );
      if (descriptionMetaTag) {
        descriptionMetaTag.setAttribute('content', meta.description);
      } else {
        const newMetaTag = document.createElement('meta');
        newMetaTag.name = 'description';
        newMetaTag.content = meta.description;
        document.head.appendChild(newMetaTag);
      }
    }
  }
}

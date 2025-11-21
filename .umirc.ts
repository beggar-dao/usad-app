import { defineConfig } from '@umijs/max';

export default defineConfig({
  helmet: true,
  antd: {
    dark: true,
    configProvider: {
      theme: {
        token: {
          borderRadius: 4,
          colorPrimary: '#FFD58E',
          colorBorder: '#272831',
        },
        components: {
          Tabs: {
            colorText: '#ADB1B8',
            colorTextActive: '#fff',
            titleFontSize: 16,
          },
          Form: {
            labelColor: '#ADB1B8',
          },
          Input: {
            colorBorder: '#1E2023',
            colorBgContainer: '#1E2023',
            colorTextPlaceholder: '#666',
            paddingInlineLG: 16,
            paddingBlockLG: 13,
            inputFontSizeLG: 14,
          },
          Select: {
            colorBorder: '#1E2023',
            colorBgContainer: '#1E2023',
            colorTextPlaceholder: '#666',
            controlHeightLG: 48,
            fontSizeLG: 14,
          },
          Button: {
            primaryShadow: 'none',
          },
          Radio: {
            colorBorder: '#5B6276',
            radioSize: 20,
            dotSize: 6,
            colorPrimary: '#5B6276',
          },
          Checkbox: {
            colorBorder: '#ADB1B8',
          },
        },
      },
    },
  },
  access: {},
  model: {},
  initialState: {},
  request: {
    dataField: 'data', // Configure dataField for useRequest to directly consume response.data
  },
  title: 'USAD by Pathenom',
  favicons: ['/favicon.png'],
  // Define environment variables that should be available in the browser
  define: {
    'process.env.UMI_APP_API_BASE_URL': process.env.UMI_APP_API_BASE_URL || '',
    'process.env.UMI_APP_API_TIMEOUT':
      process.env.UMI_APP_API_TIMEOUT || '10000',
    'process.env.UMI_APP_APP_ENV': process.env.UMI_APP_APP_ENV || 'development',
    'process.env.UMI_APP_DEBUG_MODE': process.env.UMI_APP_DEBUG_MODE || 'true',
  },
  // 添加 Google Analytics 脚本
  scripts: [
    {
      src: 'https://www.googletagmanager.com/gtag/js?id=G-W7429VYYMS',
      async: true,
    },
    {
      content: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-W7429VYYMS');
      `,
    },
    {
      type: 'application/ld+json',
      content: `
        {
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": "https://pathenom.com/#organization",
              "name": "Pathenom",
              "url": "https://pathenom.com/"
            },
            {
              "@type": "WebSite",
              "@id": "https://pathenom.com/#website",
              "url": "https://pathenom.com/",
              "name": "Pathenom",
              "inLanguage": "en"
            },
            {
              "@type": "WebPage",
              "@id": "https://pathenom.com/#webpage",
              "url": "https://pathenom.com/",
              "name": "USAD on Pathenom | Get USAD, Redeem USAD, History",
              "description": "The new global currency for the Web4 era. USAD is a decentralized, asset backed stablecoin on TOK Chain with transparent governance.",
              "isPartOf": { "@id": "https://pathenom.com/#website" },
              "inLanguage": "en"
            },
            {
              "@type": "BreadcrumbList",
              "@id": "https://pathenom.com/#breadcrumb",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://pathenom.com/" }
              ]
            },
            {
              "@type": "FAQPage",
              "@id": "https://pathenom.com/#faq",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What is USAD?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "USAD is a decentralized, asset backed stablecoin built on TOK Chain. It is designed to keep a stable value near one US dollar through over collateralization and transparent governance."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How is USAD different from other stablecoins?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "USAD uses a fixed total supply, diversified asset backing, and decentralized governance through a DAO. This makes it transparent, resilient, and community driven compared to traditional stablecoins."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How is the value of USAD maintained?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "USAD targets one dollar by using over collateralization with a basket of assets and an automated system that can adjust supply based on market demand."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can I redeem USAD for fiat currency?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "USAD can be redeemed for its collateral assets through authorized partners. The protocol is designed so each USAD token is backed by at least one dollar worth of assets."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How can I participate in the USAD ecosystem?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "You can hold USAD, provide liquidity, stake for rewards, or join governance votes through the DAO. See the documentation for step by step guides."
                  }
                }
              ]
            }
          ]
        }
      `,
    },
  ],

  metas: [
    {
      name: 'description',
      content:
        'Pathenom is the home of USAD. Learn how to mint USAD, redeem USAD, and view verified history. Start fast with clear steps, fees, and safety notes for new users',
    },
    {
      name: 'google-site-verification',
      content: 'w4G4ZzQaX5I0UnWTFgi12qq5X2yjBvllf0jlShLfKwY',
    },
  ],
  links: [
    {
      rel: 'stylesheet',
      href: '/font-awesome.min.css',
    },
    {
      rel: 'stylesheet',
      href: '/css2.css',
    },
  ],

  routes: [
    {
      path: '/',
      component: './user/index',
    },
    {
      path: '/auth',
      component: './auth/index',
      footer: false,
      routes: [
        { path: '/auth/login', component: './Login' },
        { path: '/auth/createAccount', component: './CreateAccount' },
        { path: '/auth/resetPassword', component: './ResetPassword' },
        { path: '/auth/setup2FA', component: './Setup2FA' },
      ],
    },
    {
      path: '/user',
      component: './user/index',
      footer: false,
      routes: [
        { path: '/user', redirect: '/user/profile' },
        { path: '/user/profile', component: './user/profile' },
        { path: '/user/verification', component: './user/verification' },
        {
          path: '/user/addressWhitelist',
          component: './user/addressWhitelist',
        },
        {
          path: '/user/history',
          component: './user/history',
        },
        {
          path: '/user/payment',
          component: './user/payment',
        },
        {
          path: '/user/wallet',
          component: './user/wallet',
        },
        {
          path: '/user/usad',
          component: './user/usad',
        },
        {
          path: '/user/usad/transfer',
          component: './user/usad/transfer',
        },
        {
          path: '/user/usad/deposit',
          component: './user/usad/deposit',
        },
        {
          path: '/user/usad/withdraw',
          component: './user/usad/withdraw',
        },
        {
          path: '/user/usad/buy',
          component: './user/usad/buy',
        },
        {
          path: '/user/usad/buy',
          component: './user/usad/buy',
        },
        {
          path: '/user/usad/buy',
          component: './user/usad/buy',
        },
        {
          path: '/user/usad/buy',
          component: './user/usad/buy',
        },
        {
          path: '/user/payment/addBank',
          component: './user/addBank',
        },
        {
          path: '/user/verification/start',
          component: './user/start',
        },
        {
          path: '/user/verification/individual',
          component: './user/individual',
        },
        {
          path: '/user/verification/corporate',
          component: './user/corporate',
        },
        {
          path: '/user/verification/individual/step1_1',
          component: './user/individual/step1_1',
        },
        {
          path: '/user/verification/individual/step1_2',
          component: './user/individual/step1_2',
        },
        {
          path: '/user/verification/individual/step1_3',
          component: './user/individual/step1_3',
        },
        {
          path: '/user/verification/individual/step2',
          component: './user/individual/step2',
        },
        {
          path: '/user/verification/individual/step3',
          component: './user/individual/step3',
        },
        {
          path: '/user/verification/complete',
          component: './user/complete',
        },
        {
          path: '/user/verification/corporate/step1',
          component: './user/corporate/step1',
        },
        {
          path: '/user/verification/corporate/step2_1',
          component: './user/corporate/step2_1',
        },
        {
          path: '/user/verification/corporate/step2_2',
          component: './user/corporate/step2_2',
        },
        {
          path: '/user/verification/corporate/step3',
          component: './user/corporate/step3',
        },
        {
          path: '/user/verification/corporate/step3_1',
          component: './user/corporate/step3_1',
        },
      ],
    },
  ],

  npmClient: 'pnpm',
  tailwindcss: {},
  esbuildMinifyIIFE: true,
});

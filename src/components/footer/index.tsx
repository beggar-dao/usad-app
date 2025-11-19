const primarySections = [
  {
    title: 'Platform',
    links: [
      'USAD',
      'Pathenom Payments Network',
      'Arc',
      'Mint',
      'Pathenom StableFX',
      'Wallets',
      'Contracts',
      'Paymaster',
      'CCTP',
    ],
  },
  {
    title: 'Use Cases',
    links: ['Payments', 'Dollar Access', 'Trading Services', 'Case Studies'],
  },
  {
    title: 'Developer',
    links: [
      'Developer Hub',
      'Documentation',
      'API Reference',
      'Sample Projects',
      'Testnet Faucet',
      'Developer Blog',
      'Pathenom Research',
      'Uptime Status',
    ],
  },
  {
    title: 'Company',
    links: [
      'About Pathenom',
      'Careers',
      'Alliance Program',
      'Pathenom Partner',
      'Stablecoins',
      'Pathenom Impact',
      'Pathenom Ventures',
      'Investor Relations',
      'Brand Kit',
    ],
  },
];

const secondarySections = [
  {
    title: 'USAD',
    links: [
      'Transparency',
      'Supported Blockchains',
      'Bridged USD Standard',
      'USAD.com',
    ],
  },
  {
    title: 'Insights',
    links: ['Executive Insights', 'Policy Hub', 'Pressroom', 'Blog'],
  },
  {
    title: 'Support',
    links: ['Help Center', 'Contact Us', 'Legal & Privacy'],
  },
];

export default function Footer() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <footer className="bg-[#101010] text-white">
      <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[repeat(4,minmax(0,1fr))_1.15fr]">
          {primarySections.map((section) => (
            <div key={section.title}>
              <p className="text-xs text-white/60">
                {section.title}
              </p>
              <ul className="mt-4 space-y-2 text-sm text-white/80">
                {section.links.map((link) => (
                  <li
                    key={link}
                    className="flex items-center justify-between text-white/70 transition-colors hover:text-white"
                  >
                    <a href="#">{link}</a>
                    {link === 'Careers' && (
                      <span className="rounded-full bg-[#2663FF]/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#8CF2FF]">
                        We're hiring
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="text-xs text-white/60">
              Subscribe to the Pathenom Newsletter
            </p>
            <p className="mt-3 text-sm text-white/70">
              Stay up to date with the latest Pathenom product releases and
              announcements.
            </p>
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div className="flex rounded-full border border-white/15 bg-white/5 p-1">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 rounded-full bg-transparent px-4 py-2.5 text-sm text-white placeholder:text-white/50 focus:outline-none"
                />
                <button
                  type="submit"
                  className="rounded-full gold-gradient-bg px-5 py-2 text-sm font-semibold"
                >
                  Subscribe
                </button>
              </div>
              <p className="text-[11px] leading-5 text-white/50">
                By submitting this form, you agree to receive marketing and other
                communications from Pathenom. You can unsubscribe at any time. See
                our{' '}
                <a href="#" className="text-white underline">
                  Privacy Policy
                </a>
                .
              </p>
            </form>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-10">
          <div className="grid gap-8 md:grid-cols-3">
            {secondarySections.map((section) => (
              <div key={section.title}>
                <p className="text-xs text-white/60">
                  {section.title}
                </p>
                <ul className="mt-4 space-y-2 text-sm text-white/70">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="transition-colors hover:text-white">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="self-start">
              <button className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold tracking-wide text-white/80">
                Your Privacy Choices
              </button>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} USAD. All rights reserved.</p>
            <div className="flex flex-wrap gap-4">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(
                (item) => (
                  <a key={item} href="#" className="transition-colors hover:text-white">
                    {item}
                  </a>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

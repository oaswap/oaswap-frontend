import { FooterLinkType } from '@oaswap/uikit'
import { ContextApi } from 'contexts/Localization/types'

export const footerLinks: (t: ContextApi['t']) => FooterLinkType[] = (t) => [
  {
    label: t('About'),
    items: [
      {
        label: t('Contact'),
        href: 'https://docs.oaswap.xyz/contact-us',
      },
      // {
      //   label: t('Brand'),
      //   href: 'https://docs.oaswap.xyz/brand',
      // },
      {
        label: t('Blog'),
        href: 'https://medium.com/oaswap',
      },
      {
        label: t('Community'),
        href: 'https://docs.oaswap.xyz/contact-us/telegram',
      },
      {
        label: t('OAS Token'),
        href: 'https://docs.oaswap.xyz/tokenomics/cake',
      },
      // {
      //   label: '—',
      // },
      // {
      //   label: t('Online Store'),
      //   href: 'https://oaswap.creator-spring.com/',
      //   isHighlighted: true,
      // },
    ],
  },
  {
    label: t('Help'),
    items: [
      {
        label: t('Customer Support'),
        href: 'https://docs.oaswap.xyz/contact-us/customer-support',
      },
      {
        label: t('Troubleshooting'),
        href: 'https://docs.oaswap.xyz/help/troubleshooting',
      },
      {
        label: t('Guides'),
        href: 'https://docs.oaswap.xyz/get-started',
      },
    ],
  },
  {
    label: t('Developers'),
    items: [
      {
        label: 'Github',
        href: 'https://github.com/oaswap',
      },
      {
        label: t('Documentation'),
        href: 'https://docs.oaswap.xyz',
      },
      // {
      //   label: t('Bug Bounty'),
      //   href: 'https://docs.oaswap.xyz/code/bug-bounty',
      // },
      {
        label: t('Audits'),
        href: 'https://docs.oaswap.xyz/help/faq#is-oaswap-safe-has-oaswap-been-audited',
      },
      // {
      //   label: t('Careers'),
      //   href: 'https://docs.oaswap.xyz/hiring/become-a-chef',
      // },
    ],
  },
]

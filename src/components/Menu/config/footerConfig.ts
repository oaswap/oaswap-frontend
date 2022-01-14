import { FooterLinkType } from '@oaswap/uikit'
import { ContextApi } from 'contexts/Localization/types'

export const footerLinks: (t: ContextApi['t']) => FooterLinkType[] = (t) => [
  {
    label: t('About'),
    items: [
      {
        label: t('Contact'),
        href: 'https://docs.oaswap.finance/links',
      },
      // {
      //   label: t('Brand'),
      //   href: 'https://docs.oaswap.finance/brand',
      // },
      {
        label: t('Blog'),
        href: 'https://oaswap.medium.com',
      },
      {
        label: t('Community'),
        href: 'https://docs.oaswap.finance/links',
      },
      {
        label: t('OAS Token'),
        href: 'https://docs.oaswap.finance/tokenomics/the-oas-token',
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
        href: 'https://docs.oaswap.finance/links',
      },
      {
        label: t('Troubleshooting'),
        href: 'https://docs.oaswap.finance',
      },
      {
        label: t('Guides'),
        href: 'https://docs.oaswap.finance',
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
        href: 'https://docs.oaswap.finance',
      },
      // {
      //   label: t('Bug Bounty'),
      //   href: 'https://docs.oaswap.finance/code/bug-bounty',
      // },
      {
        label: t('Audits (Coming Soon)'),
        href: 'https://docs.oaswap.finance',
      },
      // {
      //   label: t('Careers'),
      //   href: 'https://docs.oaswap.finance/hiring/become-a-chef',
      // },
    ],
  },
]

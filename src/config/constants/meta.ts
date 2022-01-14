import { ContextApi } from 'contexts/Localization/types'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'Oaswap',
  description:
    'Earn OAS tokens through yield farming, then stake them in pool vaults to earn even more on a DEX platform you can trust.',
  image: 'https://oaswap.finance/images/hero.png',
}

export const getCustomMeta = (path: string, t: ContextApi['t']): PageMeta => {
  let basePath
  if (path.startsWith('/swap')) {
    basePath = '/swap'
  } else if (path.startsWith('/add')) {
    basePath = '/add'
  } else if (path.startsWith('/remove')) {
    basePath = '/remove'
  } else if (path.startsWith('/teams')) {
    basePath = '/teams'
  } else if (path.startsWith('/voting/proposal') && path !== '/voting/proposal/create') {
    basePath = '/voting/proposal'
  } else if (path.startsWith('/nfts/collections')) {
    basePath = '/nfts/collections'
  } else if (path.startsWith('/nfts/profile')) {
    basePath = '/nfts/profile'
  } else if (path.startsWith('/pancake-squad')) {
    basePath = '/pancake-squad'
  } else {
    basePath = path
  }

  switch (basePath) {
    case '/':
      return {
        title: `${t('Home')} | ${t('Oaswap')}`,
      }
    case '/swap':
      return {
        title: `${t('Exchange')} | ${t('Oaswap')}`,
      }
    case '/add':
      return {
        title: `${t('Add Liquidity')} | ${t('Oaswap')}`,
      }
    case '/remove':
      return {
        title: `${t('Remove Liquidity')} | ${t('Oaswap')}`,
      }
    case '/liquidity':
      return {
        title: `${t('Liquidity')} | ${t('Oaswap')}`,
      }
    case '/find':
      return {
        title: `${t('Import Pool')} | ${t('Oaswap')}`,
      }
    case '/competition':
      return {
        title: `${t('Trading Battle')} | ${t('Oaswap')}`,
      }
    case '/prediction':
      return {
        title: `${t('Prediction')} | ${t('Oaswap')}`,
      }
    case '/prediction/leaderboard':
      return {
        title: `${t('Leaderboard')} | ${t('Oaswap')}`,
      }
    case '/farms':
      return {
        title: `${t('Farms')} | ${t('Oaswap')}`,
      }
    case '/farms/auction':
      return {
        title: `${t('Farm Auctions')} | ${t('Oaswap')}`,
      }
    case '/pools':
      return {
        title: `${t('Pools')} | ${t('Oaswap')}`,
      }
    case '/lottery':
      return {
        title: `${t('Lottery')} | ${t('Oaswap')}`,
      }
    case '/ifo':
      return {
        title: `${t('Initial Farm Offering')} | ${t('Oaswap')}`,
      }
    case '/teams':
      return {
        title: `${t('Leaderboard')} | ${t('Oaswap')}`,
      }
    case '/voting':
      return {
        title: `${t('Voting')} | ${t('Oaswap')}`,
      }
    case '/voting/proposal':
      return {
        title: `${t('Proposals')} | ${t('Oaswap')}`,
      }
    case '/voting/proposal/create':
      return {
        title: `${t('Make a Proposal')} | ${t('Oaswap')}`,
      }
    case '/info':
      return {
        title: `${t('Overview')} | ${t('Oaswap Info & Analytics')}`,
        description: 'View statistics for Oaswap exchanges.',
      }
    case '/info/pools':
      return {
        title: `${t('Pools')} | ${t('Oaswap Info & Analytics')}`,
        description: 'View statistics for Oaswap exchanges.',
      }
    case '/info/tokens':
      return {
        title: `${t('Tokens')} | ${t('Oaswap Info & Analytics')}`,
        description: 'View statistics for Oaswap exchanges.',
      }
    case '/nfts':
      return {
        title: `${t('Overview')} | ${t('Oaswap')}`,
      }
    case '/nfts/collections':
      return {
        title: `${t('Collections')} | ${t('Oaswap')}`,
      }
    case '/nfts/activity':
      return {
        title: `${t('Activity')} | ${t('Oaswap')}`,
      }
    case '/nfts/profile':
      return {
        title: `${t('Profile')} | ${t('Oaswap')}`,
      }
    case '/pancake-squad':
      return {
        title: `${t('Pancake Squad')} | ${t('Oaswap')}`,
      }
    default:
      return null
  }
}

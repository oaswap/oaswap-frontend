import React from 'react'
import styled from 'styled-components'
import {
  Box,
  CardBody,
  Flex,
  Text,
  CardProps,
  HelpIcon,
  useTooltip,
  LinkExternal,
  Link,
  TokenPairImage,
} from '@oaswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { useWeb3React } from '@web3-react/core'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { useIfoPoolCreditBlock, useVaultPoolByKey } from 'state/pools/hooks'
import { DeserializedPool, VaultKey } from 'state/types'
import { convertSharesToCake } from 'views/Pools/helpers'
import { FlexGap } from 'components/Layout/Flex'
import { vaultPoolConfig } from 'config/constants/pools'
import { getBscScanLink } from 'utils'
import AprRow from '../PoolCard/AprRow'
import { StyledCard } from '../PoolCard/StyledCard'
import CardFooter from '../PoolCard/CardFooter'
import PoolCardHeader, { PoolCardHeaderTitle } from '../PoolCard/PoolCardHeader'
import VaultCardActions from './VaultCardActions'
import UnstakingFeeCountdownRow from './UnstakingFeeCountdownRow'
import RecentCakeProfitRow from './RecentCakeProfitRow'

const StyledCardBody = styled(CardBody)<{ isLoading: boolean }>`
  min-height: ${({ isLoading }) => (isLoading ? '0' : '254px')};
`

interface CakeVaultProps extends CardProps {}

const FaucetDesktopCard: React.FC<CakeVaultProps> = ({ ...props }) => {
  const { t } = useTranslation()

  return (
    <StyledCard isActive {...props}>
      <PoolCardHeader isStaking={accountHasSharesStaked}>
        <PoolCardHeaderTitle title={t('card header title')} subTitle={t('card subtitle')} />
        <TokenPairImage {...vaultPoolConfig[VaultKey.CakeVault].tokenImage} width={64} height={64} />
      </PoolCardHeader>
      <StyledCardBody isLoading={isLoading}>
        <AprRow pool={pool} stakedBalance={cakeAsBigNumber} performanceFee={performanceFeeAsDecimal} />
        {pool.vaultKey === VaultKey.IfoPool && <CreditCalcBlock />}
        <FlexGap mt="16px" gap="24px" flexDirection={accountHasSharesStaked ? 'column-reverse' : 'column'}>
          <Box>
            <Box mt="24px">
              <RecentCakeProfitRow vaultKey={pool.vaultKey} />
            </Box>
            <Box mt="8px">
              <UnstakingFeeCountdownRow vaultKey={pool.vaultKey} />
            </Box>
          </Box>
          <Flex flexDirection="column">
            <Text mb="10px" textTransform="uppercase" fontSize="12px" color="textSubtle" bold>
              {t('Start earning')}
            </Text>
            <ConnectWalletButton />
          </Flex>
        </FlexGap>
      </StyledCardBody>
      <CardFooter defaultExpanded={defaultFooterExpanded} pool={pool} account={account} />
    </StyledCard>
  )
}

export default FaucetDesktopCard

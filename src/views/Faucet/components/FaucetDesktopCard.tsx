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
import ConnectWalletButton from 'components/ConnectWalletButton'
import { VaultKey } from 'state/types'
import { FlexGap } from 'components/Layout/Flex'
import { vaultPoolConfig } from 'config/constants/pools'
import { FaucetStyledCard } from './FaucetPoolCard/FaucetStyledCard'
// import CardFooter from '../PoolCard/CardFooter'
import FaucetPoolCardHeader, { FaucetPoolCardHeaderTitle } from './FaucetPoolCard/FaucetPoolCardHeader'

const StyledCardBody = styled(CardBody)<{ isLoading: boolean }>`
  min-height: ${({ isLoading }) => (isLoading ? '0' : '254px')};
`

const FaucetDesktopCard: React.FC<CardProps> = ({ ...props }) => {
  const { t } = useTranslation()

  return (
    <FaucetStyledCard isActive {...props}>
      <FaucetPoolCardHeader isStaking={false}>
        <FaucetPoolCardHeaderTitle title={t('card header title')} subTitle={t('card subtitle')} />
        <TokenPairImage {...vaultPoolConfig[VaultKey.CakeVault].tokenImage} width={64} height={64} />
      </FaucetPoolCardHeader>
      <StyledCardBody isLoading={false}>
        <FlexGap mt="16px" gap="24px" flexDirection={false ? 'column-reverse' : 'column'}>
          <Box>
            <Box mt="24px">24px box</Box>
            <Box mt="8px">8px box</Box>
          </Box>
          <Flex flexDirection="column">
            <Text mb="10px" textTransform="uppercase" fontSize="12px" color="textSubtle" bold>
              {t('Start earning')}
            </Text>
            <ConnectWalletButton />
          </Flex>
        </FlexGap>
      </StyledCardBody>
      {/* <CardFooter defaultExpanded={defaultFooterExpanded} pool={pool} account={account} /> */}
    </FaucetStyledCard>
  )
}

export default FaucetDesktopCard

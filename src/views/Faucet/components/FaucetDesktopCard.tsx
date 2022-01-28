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
  TokenImage,
} from '@oaswap/uikit'
import { useTranslation } from 'contexts/Localization'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { VaultKey } from 'state/types'
import { FlexGap } from 'components/Layout/Flex'
import { vaultPoolConfig } from 'config/constants/pools'
import { RowBetween } from 'components/Layout/Row'
import { FaucetStyledCard } from './FaucetPoolCard/FaucetStyledCard'
// import CardFooter from '../PoolCard/CardFooter'
import FaucetPoolCardHeader, { FaucetPoolCardHeaderTitle } from './FaucetPoolCard/FaucetPoolCardHeader'
import { FaucetAddressInput as AddressInput } from './FaucetAddressInput'

const StyledCardBody = styled(CardBody)<{ isLoading: boolean }>`
  min-height: ${({ isLoading }) => (isLoading ? '0' : '254px')};
`

const InputRow = styled.div<{ selected?: boolean }>`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-end;
  padding: ${({ selected }) => (selected ? '0.75rem 0.5rem 0.75rem 1rem' : '0.75rem 0.75rem 0.75rem 1rem')};
`

const LabelRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.75rem;
  line-height: 1rem;
  padding: 0.75rem 1rem 0 1rem;
`

const InputPanel = styled.div`
  display: flex;
  flex-flow: column nowrap;
  position: relative;
  border-radius: '20px';
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  z-index: 1;
`

const Container = styled.div`
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.input};
  box-shadow: ${({ theme }) => theme.shadows.inset};
`

const FaucetDesktopCard: React.FC<CardProps> = ({ ...props }) => {
  const { t } = useTranslation()

  return (
    <FaucetStyledCard isActive {...props}>
      <FaucetPoolCardHeader isStaking={false}>
        <FaucetPoolCardHeaderTitle title={t('card header title')} subTitle={t('card subtitle')} />
        <TokenImage
          src="https://secureservercdn.net/160.153.137.210/mbu.abb.myftpupload.com/wp-content/uploads/2021/07/52803776.png"
          width={64}
          height={64}
        />
      </FaucetPoolCardHeader>
      <StyledCardBody isLoading={false}>
        <FlexGap mt="16px" gap="24px" flexDirection={false ? 'column-reverse' : 'column'}>
          <Box>
            <Box mt="24px">24px box</Box>
            <Box mt="8px">8px box</Box>
          </Box>
          <Box>
            <InputPanel>
              <Container>
                <LabelRow>
                  <RowBetween>
                    <AddressInput className="token-amount-input" />
                  </RowBetween>
                </LabelRow>
                <InputRow>input row</InputRow>
              </Container>
            </InputPanel>
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

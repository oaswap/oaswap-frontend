import React, { useCallback, useRef, useState } from 'react'
import { utils } from 'ethers'
import styled from 'styled-components'
import {
  Box,
  Button,
  CardBody,
  Flex,
  Text,
  CardProps,
  HelpIcon,
  useTooltip,
  LinkExternal,
  Link,
  TokenImage,
  useModal,
} from '@oaswap/uikit'
import { CurrencyLogo } from 'components/Logo'
import { useTranslation } from 'contexts/Localization'
import useToast from 'hooks/useToast'
import { FlexGap } from 'components/Layout/Flex'
import { Row, RowBetween, RowFixed } from 'components/Layout/Row'
import { AutoColumn } from 'components/Layout/Column'
import TransactionConfirmationModal, { ConfirmationModalContent } from 'components/TransactionConfirmationModal'

import { FaucetStyledCard } from './FaucetPoolCard/FaucetStyledCard'
// import CardFooter from '../PoolCard/CardFooter'
import FaucetPoolCardHeader, { FaucetPoolCardHeaderTitle } from './FaucetPoolCard/FaucetPoolCardHeader'
import { FaucetAddressInput as AddressInput } from './FaucetAddressInput'
import { callRelayer } from '../helpers'
import { ETHER } from '@oaswap/sdk'

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
  const { toastError } = useToast()
  const walletInput = useRef<HTMLInputElement>(null)
  const [submitting, setSubmitting] = useState(false)
  const [badAddress, setBadAddress] = useState('none')
  const [attemptingTxn, setAttemptingTxn] = useState<boolean>(false)
  const [txHash, setTxHash] = useState<string>('')

  const callFaucetRelay = async (event) => {
    console.log(walletInput.current.value)
    event.preventDefault()
    const walletAddress = walletInput.current.value

    if (utils.isAddress(walletAddress)) {
      setSubmitting(true)

      try {
        const response = await callRelayer(walletAddress)
        console.log(response)

        // const hash = response.hash
        // toast('Transaction sent!', { type: 'info', onClick })
        walletInput.current.value = ''
      } catch (err) {
        // toast(err.message || err, { type: 'error' })
        console.log('err', err)
      } finally {
        setSubmitting(false)
      }
    } else {
      //   setBadAddress('block')
      toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
    }
  }

  const modalHeader = () => {
    return (
      <AutoColumn>
        <Flex alignItems="center">
          <Text fontSize="48px" marginRight="10px">
            text component
          </Text>
          <CurrencyLogo currency={ETHER} />
        </Flex>
        <Row>
          <Text fontSize="24px">{`currency symbol Pool Tokens`}</Text>
        </Row>
        <Text small textAlign="left" my="24px">
          {t('Output is estimated. If the price changes by more than %slippage%% your transaction will revert.')}
        </Text>
      </AutoColumn>
    )
  }

  const modalBottom = () => {
    return (
      <>
        <RowBetween>
          <Text>{t('%asset% Deposited')}</Text>
          <RowFixed>
            <CurrencyLogo currency={ETHER} style={{ marginRight: '8px' }} />
            <Text>{t('text field')}</Text>
          </RowFixed>
        </RowBetween>
        <RowBetween>
          <Text>{t('%asset% Deposited', { asset: ETHER?.symbol })}</Text>
          <RowFixed>
            <CurrencyLogo currency={ETHER} style={{ marginRight: '8px' }} />
            <Text>{t('text here')}</Text>
          </RowFixed>
        </RowBetween>
        <RowBetween>
          <Text>{t('Rates')}</Text>
        </RowBetween>
        <RowBetween style={{ justifyContent: 'flex-end' }}>
          <Text>{t('more text')}</Text>
        </RowBetween>
        <RowBetween>
          <Text>{t('Share of Pool')}:</Text>
          <Text>100%</Text>
        </RowBetween>
        <Button mt="20px">{t('Create Pool & Supply')}</Button>
      </>
    )
  }

  const handleDismissConfirmation = useCallback(() => {
    // if (txHash) {
    //   onFieldAInput('')
    // }
    setTxHash('')
    //   }, [onFieldAInput, txHash])
  }, [txHash])

  const [onPresentFaucetModal] = useModal(
    <TransactionConfirmationModal
      title={t('You are creating a pool')}
      customOnDismiss={handleDismissConfirmation}
      attemptingTxn={attemptingTxn}
      hash={txHash}
      content={() => <ConfirmationModalContent topContent={modalHeader} bottomContent={modalBottom} />}
      pendingText={t('Pending text here...')}
    />,
    true,
    true,
    'addLiquidityModal',
  )

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
                    <AddressInput className="token-amount-input" walletInput={walletInput} />
                  </RowBetween>
                </LabelRow>
                <InputRow>input row</InputRow>
              </Container>
            </InputPanel>
          </Box>
          <Flex flexDirection="column" alignItems="center">
            {/* <Text mb="10px" textTransform="uppercase" fontSize="12px" color="textSubtle" bold>
              {t('Start earning')}
            </Text> */}
            <Button onClick={callFaucetRelay}>{t('Send Request')}</Button>
          </Flex>
        </FlexGap>
      </StyledCardBody>
      {/* <CardFooter defaultExpanded={defaultFooterExpanded} pool={pool} account={account} /> */}
    </FaucetStyledCard>
  )
}

export default FaucetDesktopCard

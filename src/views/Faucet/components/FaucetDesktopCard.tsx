import React, { useCallback, useEffect, useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
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
  Spinner,
  TokenImage,
  useModal,
} from '@oaswap/uikit'
import { ETHER } from '@oaswap/sdk'
import { CurrencyLogo } from 'components/Logo'
import { useTranslation } from 'contexts/Localization'
import useToast from 'hooks/useToast'
import { FlexGap } from 'components/Layout/Flex'
import Row, { RowBetween, RowFixed } from 'components/Layout/Row'
import { AutoColumn } from 'components/Layout/Column'
import FaucetModal, { FaucetConfirmationModalContent } from './FaucetModal'
import { FaucetStyledCard } from './FaucetPoolCard/FaucetStyledCard'
// import CardFooter from '../PoolCard/CardFooter'
import FaucetPoolCardHeader, { FaucetPoolCardHeaderTitle } from './FaucetPoolCard/FaucetPoolCardHeader'
import { FaucetAddressInput as AddressInput } from './FaucetAddressInput'
import { callRelayer, checkFaucetSent, verifyToken } from '../helpers'

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
  const [attemptingTxn, setAttemptingTxn] = useState<boolean>(false)
  const [txHash, setTxHash] = useState<string>('')
  const [unverifiedToken, setUnverifiedToken] = useState<boolean>(true)
  const [emptyToken, setEmptyToken] = useState<string>(null)

  useEffect(() => {
    if (emptyToken === null && unverifiedToken === false) {
      setUnverifiedToken(true)
    }
  }, [emptyToken, unverifiedToken])

  const callFaucetRelay = async (event) => {
    console.log(walletInput.current.value)
    event.preventDefault()
    const walletAddress = walletInput.current.value

    if (utils.isAddress(walletAddress)) {
      if (checkFaucetSent(walletAddress)) {
        toastError(t('Error'), t('ROSE already sent to this address.'))
      } else {
        setAttemptingTxn(true)

        try {
          onPresentFaucetModal()
          const response = await callRelayer(walletAddress)
          console.log(response)
          setTxHash(response.hash)
          // toast('Transaction sent!', { type: 'info', onClick })
          walletInput.current.value = ''
        } catch (err: any) {
          // toast(err.message || err, { type: 'error' })
          toastError(t('Error'), err.message || err)
          console.log('err', err)
        } finally {
          setAttemptingTxn(false)
        }
      }
    } else {
      toastError(t('Error'), t('Invalid wallet address. Please try again.'))
    }
  }

  const modalHeader = () => {
    return (
      <AutoColumn>
        <Flex alignItems="center">
          <Text fontSize="48px" marginRight="10px">
            {!attemptingTxn ? <>Faucet request complete</> : <>Waiting for confirmation</>}
          </Text>
          {/* <CurrencyLogo currency={ETHER} /> */}
        </Flex>
        {/* <Row>
          <Text fontSize="24px">Transactions have been initiated.</Text>
        </Row> */}
        <Text small textAlign="left" mb="32px">
          {!attemptingTxn ? (
            <span style={{ color: '#1fc7d4' }}>Congratulations, 0.1 ROSE was sent to your account.</span>
          ) : (
            <span style={{ color: '#B8ADD2' }}>{t('Transactions have been initiated, waiting to confirm...')}</span>
          )}
        </Text>
      </AutoColumn>
    )
  }

  const modalBottom = () => {
    return (
      <>
        <RowBetween>
          <Text color="#B8ADD2">{t('Amount Requested')}</Text>
          <Text style={{ display: 'flex', alignItems: 'center' }}>
            {t('0.01')}{' '}
            <CurrencyLogo currency={ETHER} size="18px" style={{ marginLeft: 5, position: 'relative', top: 1 }} />
          </Text>
        </RowBetween>
        <RowBetween>
          <Text color="#B8ADD2">{t('Total Deposited')}</Text>
          <RowFixed>
            {attemptingTxn ? (
              <Text>...</Text>
            ) : (
              <>
                <Text style={{ display: 'flex', alignItems: 'center' }}>
                  {t('0.01')}{' '}
                  <CurrencyLogo currency={ETHER} size="18px" style={{ marginLeft: 5, position: 'relative', top: 1 }} />
                </Text>
              </>
            )}
          </RowFixed>
        </RowBetween>
        <RowBetween>
          <Text color="#B8ADD2">{t('Transaction Hash')}</Text>
          {attemptingTxn ? (
            <>
              <Text>...</Text>
            </>
          ) : (
            <>
              <Text>
                <a
                  href={`https://explorer.emerald.oasis.dev/tx/${txHash}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: '#0092f6', textDecoration: 'underline' }}
                >
                  {txHash.substring(0, 12)}...
                </a>
              </Text>
            </>
          )}
        </RowBetween>
      </>
    )
  }

  const handleDismissConfirmation = useCallback(() => {
    // if (txHash) {
    //   onFieldAInput('')
    // }
    setTxHash('')
    //   }, [onFieldAInput, txHash])
  }, [])

  const [onPresentFaucetModal] = useModal(
    <FaucetModal
      title={t('You are requesting ROSE')}
      customOnDismiss={handleDismissConfirmation}
      attemptingTxn={attemptingTxn}
      hash={txHash}
      content={() => <FaucetConfirmationModalContent topContent={modalHeader} bottomContent={modalBottom} />}
      pendingText={t('Pending text here...')}
    />,
    false,
    true,
    'faucetConfirmationModal',
  )

  const onRecaptchaChange = async (value: any) => {
    setEmptyToken(value)

    if (value !== null) {
      const tokenVerify = await verifyToken(value)

      if (tokenVerify.success === true) {
        setUnverifiedToken(false)
      }
    }
  }

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
          <Flex flexDirection="row" alignItems="center" justifyContent="space-around">
            <ReCAPTCHA sitekey="6LexakkeAAAAACW2wyy3apJrXp-TLRONZeo324uw" onChange={onRecaptchaChange} />
            {/* <Text mb="10px" textTransform="uppercase" fontSize="12px" color="textSubtle" bold>
              {t('Start earning')}
            </Text> */}
            <Button onClick={callFaucetRelay} disabled={emptyToken === null || unverifiedToken || attemptingTxn}>
              {t('Send Request')}
            </Button>
          </Flex>
        </FlexGap>
      </StyledCardBody>
      {/* <CardFooter defaultExpanded={defaultFooterExpanded} pool={pool} account={account} /> */}
    </FaucetStyledCard>
  )
}

export default FaucetDesktopCard

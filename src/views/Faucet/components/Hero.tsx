import React from 'react'
import { Box, Button, Flex, Heading, ResourcesIcon } from '@oaswap/uikit'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useTranslation } from 'contexts/Localization'
import Container from 'components/Layout/Container'
import FaucetImage from './FaucetImage'

const StyledHero = styled(Box)`
  background: ${({ theme }) => theme.colors.gradients.bubblegum};
  padding-bottom: 32px;
  padding-top: 32px;
`

const Hero = () => {
  const { t } = useTranslation()

  return (
    <StyledHero>
      <Container>
        <Flex alignItems="center" justifyContent="space-between">
          <Box pr="32px">
            <Heading as="h1" scale="xxl" color="secondary" mb="10px">
              {t('Rose Faucet')}
            </Heading>
            <Heading as="h3" scale="lg" mb="18px">
              {t('Request ROSE for an account on the Oasis Emerald ParaTime')}
            </Heading>
            <Button
              startIcon={<ResourcesIcon color="currentColor" width="24px" />}
              as="a"
              target="_blank"
              href="https://docs.oaswap.finance/products/faucet"
            >
              {t('Learn More')}
            </Button>
          </Box>
          <FaucetImage src="/images/voting/voting-presents.png" width={361} height={214} />
        </Flex>
      </Container>
    </StyledHero>
  )
}

export default Hero

import { Flex } from '@oaswap/uikit'
import { PageMeta } from 'components/Layout/Page'
import React from 'react'
import styled from 'styled-components'
import Footer from './components/Footer'
import Hero from './components/Hero'
import FaucetRequest from './components/FaucetRequest'

const Chrome = styled.div`
  flex: none;
`

const Content = styled.div`
  flex: 1;
  height: 100%;
`

const Faucet = () => {
  return (
    <>
      <PageMeta />
      <Flex flexDirection="column" minHeight="calc(100vh - 64px)">
        <Chrome>
          <Hero />
        </Chrome>
        <Content>
          <FaucetRequest />
        </Content>
        <Chrome>
          <Footer />
        </Chrome>
      </Flex>
    </>
  )
}

export default Faucet

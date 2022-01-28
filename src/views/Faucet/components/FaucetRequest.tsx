import React from 'react'
import FaucetLayout, { FaucetLayoutWrapper } from './FaucetLayout'
import FaucetCard from './FaucetCard'

const FaucetRequest = () => {
  return (
    <FaucetLayout id="current-ifo" py={['24px', '24px', '40px']}>
      <FaucetLayoutWrapper>
        <FaucetCard />
      </FaucetLayoutWrapper>
    </FaucetLayout>
  )
}

export default FaucetRequest

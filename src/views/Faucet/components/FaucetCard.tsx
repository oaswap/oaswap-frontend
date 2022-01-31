import React from 'react'
import { useMatchBreakpoints } from '@oaswap/uikit'
import FaucetDesktopCard from './FaucetDesktopCard'

const FaucetCard = () => {
  const { isMd, isXs, isSm } = useMatchBreakpoints()
  const isSmallerThanTablet = isMd || isXs || isSm

  // if (isSmallerThanTablet) {
  // }

  return <FaucetDesktopCard m="auto" />
}

export default FaucetCard

import styled from 'styled-components'
import { Card } from '@oaswap/uikit'

export const FaucetStyledCard = styled(Card)<{ isFinished?: boolean }>`
  max-width: 800px;
  margin: 0 8px 24px;
  width: 100%;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  align-self: baseline;
  position: relative;
  color: ${({ isFinished, theme }) => theme.colors[isFinished ? 'textDisabled' : 'secondary']};

  ${({ theme }) => theme.mediaQueries.sm} {
    margin: 0 12px 46px;
  }
`

export default FaucetStyledCard

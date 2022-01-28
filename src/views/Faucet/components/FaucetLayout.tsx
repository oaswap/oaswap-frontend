import { Box } from '@oaswap/uikit'
import styled from 'styled-components'

const FaucetLayout = styled(Box)``

export const FaucetLayoutWrapper = styled.div`
  display: flex;
  justify-content: center;

  ${({ theme }) => theme.mediaQueries.md} {
  }
`

export default FaucetLayout

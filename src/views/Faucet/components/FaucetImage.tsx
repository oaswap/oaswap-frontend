import { Image } from '@oaswap/uikit'
import styled from 'styled-components'

const FaucetImage = styled(Image)`
  display: none;

  ${({ theme }) => theme.mediaQueries.lg} {
    display: block;
  }
`

export default FaucetImage

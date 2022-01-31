import { getFaucetContract } from 'utils/contractHelpers'

export async function callRelayer(walletAddress: string) {
  if (!walletAddress) throw new Error(`Address cannot be empty`)
  const url = process.env.REACT_APP_RELAYER_URL
  const request = { address: walletAddress }

  const handleErrors = (response) => {
    // if (!response.ok) {
    //   throw Error(response.statusText)
    // }
    return response
  }

  const fetchFaucet = fetch(url, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(request),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => response.text())
    .then((response) => {
      const jsonRes = JSON.parse(response)
      return jsonRes
    })
    // .then(handleErrors)
    .catch((error) => console.log(error))

  return fetchFaucet
}

export async function checkFaucetSent(walletAddress: string) {
  const faucetContract = getFaucetContract()
  const faucetSent = await faucetContract.sent(walletAddress)
  return faucetSent
}

export async function verifyToken(tokenString: string) {
  if (!tokenString) throw new Error(`Token cannot be empty`)
  const url = process.env.REACT_APP_VERIFY_RECAPTCHA
  const request = { token: tokenString }

  const fetchTokenVerify = fetch(url, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(request),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => response.text())
    .then((response) => {
      const jsonRes = JSON.parse(response)
      return jsonRes
    })
    .catch((error) => console.log(error))

  return fetchTokenVerify
}

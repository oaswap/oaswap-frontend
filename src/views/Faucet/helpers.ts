import { simpleRpcProvider } from 'utils/providers'

export async function callRelayer(walletAddress) {
  if (!walletAddress) throw new Error(`Address cannot be empty`)
  const url = process.env.REACT_APP_RELAYER_URL
  const request = { address: walletAddress }

  const handleErrors = (response) => {
    console.log('wtffffffffff', response)
    // if (!response.ok) {
    //   throw Error(response.statusText)
    // }
    return response
  }

  const thefetch = fetch(url, {
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

  return thefetch
}

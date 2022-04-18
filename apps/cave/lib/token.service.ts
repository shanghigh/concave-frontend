import { CandleStickIntervalTypes } from 'components/AMM/CandleStickCard/useCandleStickChart'
import { chain } from 'wagmi'
import { coingeckoApi } from './coingecko.api'

class TokenService {
  constructor(private networkName: string = chain.mainnet.name) {}

  async getTokenPrice(symbol: string) {
    if (this.networkName === chain.ropsten.name) {
      const values = {
        DAI: 1,
        WETH: 3402,
        MATIC: 1.68,
        FRAX: 1,
        Tether: 1.2,
      }
      return {
        token: symbol,
        currency: 'usd',
        value: values[symbol],
      }
    }

    const coingecko = symbol?.toLowerCase()
    return Promise.resolve(
      coingeckoApi.tokenPrice({
        currency: 'usd',
        ids: coingecko,
      }),
    )
  }

  async fetchCandleStickData({
    token,
    interval,
  }: {
    token: string
    interval: CandleStickIntervalTypes
  }) {
    const coingecko = token?.toLowerCase() === 'cnv' ? 'concave' : token?.toLowerCase()
    const days = daysOptions[interval]
    return coingeckoApi.fetchCandleStickData({ id: coingecko, days })
  }
}

const daysOptions = {
  '5m': '1',
  '15m': '7',
  '1H': '14',
  '4H': '30',
  '1D': '365',
} as const
export const tokenService = new TokenService(chain.ropsten.name)

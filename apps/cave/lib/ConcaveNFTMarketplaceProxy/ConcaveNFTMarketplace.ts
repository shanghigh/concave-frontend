import { BigNumber, BigNumberish, ethers } from 'ethers'
import { MulticallProvider } from '@0xsequence/multicall/dist/declarations/src/providers'
import { concaveProvider } from 'lib/providers'
import { ConcaveNFTMarketplaceProxy } from './Address'
import { ContractABI } from './ConcaveNFTMarketplaceABI'
import { MarketItem } from './MarketItem'
import { Auction } from './Auction'
import { Signer } from 'ethers'

export class ConcaveNFTMarketplace {
  private readonly contract: ethers.Contract
  private readonly provider: MulticallProvider

  constructor(chainId: number) {
    this.provider = concaveProvider(chainId)
    this.contract = new ethers.Contract(
      ConcaveNFTMarketplaceProxy[chainId],
      ContractABI,
      this.provider,
    )
  }

  public async createMarketItem(marketItem: MarketItem): Promise<ethers.Transaction> {
    return this.contract.createMarketItem(marketItem.tokenID, marketItem.price, {})
  }

  public async nftContractAuctions(index: string): Promise<Auction> {
    const info = await this.contract.nftContractAuctions(index)
    return Auction.fromObject(info)
  }

  public async withdrawAuction(signer: Signer, tokenId: string | BigNumberish) {
    return this.contract.connect(signer).withdrawAuction(tokenId.toString())
  }

  public async createDefaultNftAuction(
    signer: Signer,
    tokenId: BigNumberish,
    erc20Token: string,
    minPrice: BigNumberish,
    buyNowPrice: BigNumberish,
    feeRecipients: string[],
    feePercentages: number[], //max 10000
  ): Promise<ethers.Transaction> {
    if (feeRecipients.length !== feePercentages.length) {
      throw 'Check recipients and percentages'
    }
    return this.contract
      .connect(signer)
      .createDefaultNftAuction(
        tokenId,
        erc20Token,
        minPrice,
        buyNowPrice,
        feeRecipients,
        feePercentages,
      )
  }

  public async createNewNftAuction(
    tokenId: BigNumber,
    erc20Token: string,
    minPrice: BigNumber,
    buyNowPrice: BigNumber,
    auctionBidPeriod: BigNumber,
    bidIncreasePercentage: BigNumber,
    feeRecipients: string[],
    feePercentages: string[],
  ): Promise<ethers.Transaction> {
    if (feeRecipients.length !== feePercentages.length) {
      throw 'Check recipients and percentages'
    }
    return this.contract.createNewNftAuction(
      tokenId,
      erc20Token,
      minPrice,
      buyNowPrice,
      auctionBidPeriod,
      bidIncreasePercentage,
      feeRecipients,
      feePercentages,
    )
  }
}

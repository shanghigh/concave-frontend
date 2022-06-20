import { BigNumber, BigNumberish } from '@ethersproject/bignumber'

type OfferConstructorArgs = {
  readonly bidIncreasePercentage: number
  readonly auctionBidPeriod: number
  readonly auctionEnd: BigNumberish
  readonly minPrice?: BigNumberish
  readonly buyNowPrice: BigNumberish
  readonly nftHighestBid: BigNumberish
  readonly nftHighestBidder: string
  readonly nftSeller: string
  readonly whitelistedBuyer: string
  readonly nftRecipient: string
  readonly ERC20Token: string
  readonly feePercentages?: number[]
  readonly feeRecipients?: string[]
}

export class Offer {
  public readonly bidIncreasePercentage: number
  public readonly auctionBidPeriod: number
  public readonly auctionEnd: BigNumber
  public minPrice?: BigNumber
  public buyNowPrice: BigNumber
  public readonly nftHighestBid: BigNumber
  public readonly nftHighestBidder: string
  public readonly nftSeller: string
  public readonly whitelistedBuyer: string
  public readonly nftRecipient: string
  public readonly ERC20Token: string
  public readonly feePercentages?: number[]
  public readonly feeRecipients?: string[]

  constructor(args: OfferConstructorArgs) {
    this.ERC20Token = args.ERC20Token
    this.bidIncreasePercentage = args.bidIncreasePercentage
    this.auctionBidPeriod = args.auctionBidPeriod
    this.nftHighestBidder = args.nftHighestBidder
    this.nftSeller = args.nftSeller
    this.whitelistedBuyer = args.whitelistedBuyer
    this.nftRecipient = args.nftRecipient
    this.auctionEnd = BigNumber.from(args.auctionEnd)
    this.buyNowPrice = BigNumber.from(args.buyNowPrice)
    this.nftHighestBid = BigNumber.from(args.nftHighestBid)
    this.minPrice = BigNumber.from(args.minPrice || '0')
    this.feePercentages = args.feePercentages
    this.feeRecipients = args.feeRecipients
  }

  public setMinPrice(minPrice: BigNumberish) {
    this.minPrice = BigNumber.from(minPrice.toString())
    return new Offer(this)
  }
  public setBuyNowPrice(buyNowPrice: BigNumberish) {
    this.buyNowPrice = BigNumber.from(buyNowPrice.toString())
    return new Offer(this)
  }

  get isValid() {
    if (this.buyNowPrice.eq(0)) return false
    if (this.isSale) return true
    const difference = this.minPrice.mul(100).div(this.buyNowPrice)
    if (difference.gt(80)) return false
    return true
  }

  get isSale() {
    return this.minPrice.eq(0) && this.buyNowPrice.gt(0)
  }
  get isAuction() {
    return this.minPrice.gt(0) && this.buyNowPrice.gt(0)
  }
  get listPrice() {
    return this.isSale ? this.buyNowPrice : this.minPrice
  }
}
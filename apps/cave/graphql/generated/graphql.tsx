import { RQ_HASURA_ENDPOINT, RQ_HASURA_PARAMS } from 'lib/hasura.rq'
import { useQuery, UseQueryOptions } from 'react-query'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }

function fetcher<TData, TVariables>(query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch(RQ_HASURA_ENDPOINT as string, {
      method: 'POST',
      ...RQ_HASURA_PARAMS,
      body: JSON.stringify({ query, variables }),
    })

    const json = await res.json()

    if (json.errors) {
      const { message } = json.errors[0]

      throw new Error(message)
    }

    return json.data
  }
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  numeric: any
  timestamptz: any
}

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Boolean']>
  _gt?: InputMaybe<Scalars['Boolean']>
  _gte?: InputMaybe<Scalars['Boolean']>
  _in?: InputMaybe<Array<Scalars['Boolean']>>
  _is_null?: InputMaybe<Scalars['Boolean']>
  _lt?: InputMaybe<Scalars['Boolean']>
  _lte?: InputMaybe<Scalars['Boolean']>
  _neq?: InputMaybe<Scalars['Boolean']>
  _nin?: InputMaybe<Array<Scalars['Boolean']>>
}

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']>
  _gt?: InputMaybe<Scalars['String']>
  _gte?: InputMaybe<Scalars['String']>
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']>
  _in?: InputMaybe<Array<Scalars['String']>>
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']>
  _is_null?: InputMaybe<Scalars['Boolean']>
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']>
  _lt?: InputMaybe<Scalars['String']>
  _lte?: InputMaybe<Scalars['String']>
  _neq?: InputMaybe<Scalars['String']>
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']>
  _nin?: InputMaybe<Array<Scalars['String']>>
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']>
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']>
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']>
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']>
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']>
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']>
}

export type CnvData = {
  __typename?: 'cnvData'
  baseVolume?: Maybe<Scalars['String']>
  blockchain?: Maybe<Scalars['String']>
  circulatingSupply?: Maybe<Scalars['Float']>
  high24hr?: Maybe<Scalars['String']>
  highestBid?: Maybe<Scalars['String']>
  isFrozen?: Maybe<Scalars['String']>
  last?: Maybe<Scalars['Float']>
  low24hr?: Maybe<Scalars['String']>
  lowestAsk?: Maybe<Scalars['String']>
  marketCap?: Maybe<Scalars['Float']>
  name?: Maybe<Scalars['String']>
  percentChange?: Maybe<Scalars['String']>
  quoteVolume?: Maybe<Scalars['String']>
  removedTokens?: Maybe<Scalars['Float']>
  ticker?: Maybe<Scalars['String']>
  totalSupply?: Maybe<Scalars['Float']>
}

export type CnvDataOutput = {
  __typename?: 'cnvDataOutput'
  code?: Maybe<Scalars['Int']>
  data?: Maybe<CnvData>
  msg?: Maybe<Scalars['String']>
}

/** history of block with events */
export type LogStakingV1 = {
  __typename?: 'logStakingV1'
  amountLocked: Scalars['numeric']
  blockNumber?: Maybe<Scalars['numeric']>
  from?: Maybe<Scalars['String']>
  lockedUntil?: Maybe<Scalars['numeric']>
  poolID: Scalars['numeric']
  sold?: Maybe<Scalars['Boolean']>
  to?: Maybe<Scalars['String']>
  tokenID: Scalars['numeric']
  txHash: Scalars['String']
}

/** Boolean expression to filter rows from the table "logStakingV1". All fields are combined with a logical 'AND'. */
export type LogStakingV1_Bool_Exp = {
  _and?: InputMaybe<Array<LogStakingV1_Bool_Exp>>
  _not?: InputMaybe<LogStakingV1_Bool_Exp>
  _or?: InputMaybe<Array<LogStakingV1_Bool_Exp>>
  amountLocked?: InputMaybe<Numeric_Comparison_Exp>
  blockNumber?: InputMaybe<Numeric_Comparison_Exp>
  from?: InputMaybe<String_Comparison_Exp>
  lockedUntil?: InputMaybe<Numeric_Comparison_Exp>
  poolID?: InputMaybe<Numeric_Comparison_Exp>
  sold?: InputMaybe<Boolean_Comparison_Exp>
  to?: InputMaybe<String_Comparison_Exp>
  tokenID?: InputMaybe<Numeric_Comparison_Exp>
  txHash?: InputMaybe<String_Comparison_Exp>
}

/** Ordering options when selecting data from "logStakingV1". */
export type LogStakingV1_Order_By = {
  amountLocked?: InputMaybe<Order_By>
  blockNumber?: InputMaybe<Order_By>
  from?: InputMaybe<Order_By>
  lockedUntil?: InputMaybe<Order_By>
  poolID?: InputMaybe<Order_By>
  sold?: InputMaybe<Order_By>
  to?: InputMaybe<Order_By>
  tokenID?: InputMaybe<Order_By>
  txHash?: InputMaybe<Order_By>
}

/** select columns of table "logStakingV1" */
export enum LogStakingV1_Select_Column {
  /** column name */
  AmountLocked = 'amountLocked',
  /** column name */
  BlockNumber = 'blockNumber',
  /** column name */
  From = 'from',
  /** column name */
  LockedUntil = 'lockedUntil',
  /** column name */
  PoolId = 'poolID',
  /** column name */
  Sold = 'sold',
  /** column name */
  To = 'to',
  /** column name */
  TokenId = 'tokenID',
  /** column name */
  TxHash = 'txHash',
}

/** Boolean expression to compare columns of type "numeric". All fields are combined with logical 'AND'. */
export type Numeric_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['numeric']>
  _gt?: InputMaybe<Scalars['numeric']>
  _gte?: InputMaybe<Scalars['numeric']>
  _in?: InputMaybe<Array<Scalars['numeric']>>
  _is_null?: InputMaybe<Scalars['Boolean']>
  _lt?: InputMaybe<Scalars['numeric']>
  _lte?: InputMaybe<Scalars['numeric']>
  _neq?: InputMaybe<Scalars['numeric']>
  _nin?: InputMaybe<Array<Scalars['numeric']>>
}

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last',
}

export type Query_Root = {
  __typename?: 'query_root'
  cnvData?: Maybe<CnvDataOutput>
  /** fetch data from the table: "logStakingV1" */
  logStakingV1: Array<LogStakingV1>
  /** fetch data from the table: "logStakingV1" using primary key columns */
  logStakingV1_by_pk?: Maybe<LogStakingV1>
  /** fetch data from the table: "treasury" */
  treasury: Array<Treasury>
}

export type Query_RootLogStakingV1Args = {
  distinct_on?: InputMaybe<Array<LogStakingV1_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<LogStakingV1_Order_By>>
  where?: InputMaybe<LogStakingV1_Bool_Exp>
}

export type Query_RootLogStakingV1_By_PkArgs = {
  txHash: Scalars['String']
}

export type Query_RootTreasuryArgs = {
  distinct_on?: InputMaybe<Array<Treasury_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Treasury_Order_By>>
  where?: InputMaybe<Treasury_Bool_Exp>
}

export type Subscription_Root = {
  __typename?: 'subscription_root'
  /** fetch data from the table: "logStakingV1" */
  logStakingV1: Array<LogStakingV1>
  /** fetch data from the table: "logStakingV1" using primary key columns */
  logStakingV1_by_pk?: Maybe<LogStakingV1>
  /** fetch data from the table: "treasury" */
  treasury: Array<Treasury>
}

export type Subscription_RootLogStakingV1Args = {
  distinct_on?: InputMaybe<Array<LogStakingV1_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<LogStakingV1_Order_By>>
  where?: InputMaybe<LogStakingV1_Bool_Exp>
}

export type Subscription_RootLogStakingV1_By_PkArgs = {
  txHash: Scalars['String']
}

export type Subscription_RootTreasuryArgs = {
  distinct_on?: InputMaybe<Array<Treasury_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Treasury_Order_By>>
  where?: InputMaybe<Treasury_Bool_Exp>
}

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']>
  _gt?: InputMaybe<Scalars['timestamptz']>
  _gte?: InputMaybe<Scalars['timestamptz']>
  _in?: InputMaybe<Array<Scalars['timestamptz']>>
  _is_null?: InputMaybe<Scalars['Boolean']>
  _lt?: InputMaybe<Scalars['timestamptz']>
  _lte?: InputMaybe<Scalars['timestamptz']>
  _neq?: InputMaybe<Scalars['timestamptz']>
  _nin?: InputMaybe<Array<Scalars['timestamptz']>>
}

/** concave treasury assets */
export type Treasury = {
  __typename?: 'treasury'
  amount?: Maybe<Scalars['numeric']>
  chainId: Scalars['String']
  contract: Scalars['String']
  name: Scalars['String']
  rewards?: Maybe<Scalars['numeric']>
  total?: Maybe<Scalars['numeric']>
  updated_at: Scalars['timestamptz']
  value?: Maybe<Scalars['numeric']>
}

/** Boolean expression to filter rows from the table "treasury". All fields are combined with a logical 'AND'. */
export type Treasury_Bool_Exp = {
  _and?: InputMaybe<Array<Treasury_Bool_Exp>>
  _not?: InputMaybe<Treasury_Bool_Exp>
  _or?: InputMaybe<Array<Treasury_Bool_Exp>>
  amount?: InputMaybe<Numeric_Comparison_Exp>
  chainId?: InputMaybe<String_Comparison_Exp>
  contract?: InputMaybe<String_Comparison_Exp>
  name?: InputMaybe<String_Comparison_Exp>
  rewards?: InputMaybe<Numeric_Comparison_Exp>
  total?: InputMaybe<Numeric_Comparison_Exp>
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>
  value?: InputMaybe<Numeric_Comparison_Exp>
}

/** Ordering options when selecting data from "treasury". */
export type Treasury_Order_By = {
  amount?: InputMaybe<Order_By>
  chainId?: InputMaybe<Order_By>
  contract?: InputMaybe<Order_By>
  name?: InputMaybe<Order_By>
  rewards?: InputMaybe<Order_By>
  total?: InputMaybe<Order_By>
  updated_at?: InputMaybe<Order_By>
  value?: InputMaybe<Order_By>
}

/** select columns of table "treasury" */
export enum Treasury_Select_Column {
  /** column name */
  Amount = 'amount',
  /** column name */
  ChainId = 'chainId',
  /** column name */
  Contract = 'contract',
  /** column name */
  Name = 'name',
  /** column name */
  Rewards = 'rewards',
  /** column name */
  Total = 'total',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Value = 'value',
}

export type Get_Amm_Cnv_PriceQueryVariables = Exact<{ [key: string]: never }>

export type Get_Amm_Cnv_PriceQuery = {
  __typename?: 'query_root'
  cnvData?: {
    __typename?: 'cnvDataOutput'
    data?: { __typename?: 'cnvData'; last?: number | null; ticker?: string | null } | null
  } | null
}

export type Get_Stackingv1_Last100_EventsQueryVariables = Exact<{ [key: string]: never }>

export type Get_Stackingv1_Last100_EventsQuery = {
  __typename?: 'query_root'
  logStakingV1: Array<{
    __typename?: 'logStakingV1'
    blockNumber?: any | null
    txHash: string
    poolID: any
    tokenID: any
    sold?: boolean | null
    from?: string | null
    to?: string | null
    amountLocked: any
    lockedUntil?: any | null
  }>
}

export type Get_Stackingv1_By_Pool_IdQueryVariables = Exact<{
  poolID?: InputMaybe<Numeric_Comparison_Exp>
}>

export type Get_Stackingv1_By_Pool_IdQuery = {
  __typename?: 'query_root'
  logStakingV1: Array<{
    __typename?: 'logStakingV1'
    blockNumber?: any | null
    txHash: string
    poolID: any
    tokenID: any
    sold?: boolean | null
    from?: string | null
    to?: string | null
    amountLocked: any
    lockedUntil?: any | null
  }>
}

export type Get_TreasuryQueryVariables = Exact<{ [key: string]: never }>

export type Get_TreasuryQuery = {
  __typename?: 'query_root'
  treasury: Array<{
    __typename?: 'treasury'
    updated_at: any
    contract: string
    chainId: string
    name: string
    amount?: any | null
    value?: any | null
    total?: any | null
  }>
}

export const Get_Amm_Cnv_PriceDocument = `
    query GET_AMM_CNV_PRICE {
  cnvData {
    data {
      last
      ticker
    }
  }
}
    `
export const useGet_Amm_Cnv_PriceQuery = <TData = Get_Amm_Cnv_PriceQuery, TError = unknown>(
  variables?: Get_Amm_Cnv_PriceQueryVariables,
  options?: UseQueryOptions<Get_Amm_Cnv_PriceQuery, TError, TData>,
) =>
  useQuery<Get_Amm_Cnv_PriceQuery, TError, TData>(
    variables === undefined ? ['GET_AMM_CNV_PRICE'] : ['GET_AMM_CNV_PRICE', variables],
    fetcher<Get_Amm_Cnv_PriceQuery, Get_Amm_Cnv_PriceQueryVariables>(
      Get_Amm_Cnv_PriceDocument,
      variables,
    ),
    options,
  )
export const Get_Stackingv1_Last100_EventsDocument = `
    query GET_STACKINGV1_LAST100_EVENTS {
  logStakingV1(order_by: {blockNumber: desc}, limit: 100) {
    blockNumber
    txHash
    poolID
    tokenID
    sold
    from
    to
    amountLocked
    lockedUntil
  }
}
    `
export const useGet_Stackingv1_Last100_EventsQuery = <
  TData = Get_Stackingv1_Last100_EventsQuery,
  TError = unknown,
>(
  variables?: Get_Stackingv1_Last100_EventsQueryVariables,
  options?: UseQueryOptions<Get_Stackingv1_Last100_EventsQuery, TError, TData>,
) =>
  useQuery<Get_Stackingv1_Last100_EventsQuery, TError, TData>(
    variables === undefined
      ? ['GET_STACKINGV1_LAST100_EVENTS']
      : ['GET_STACKINGV1_LAST100_EVENTS', variables],
    fetcher<Get_Stackingv1_Last100_EventsQuery, Get_Stackingv1_Last100_EventsQueryVariables>(
      Get_Stackingv1_Last100_EventsDocument,
      variables,
    ),
    options,
  )
export const Get_Stackingv1_By_Pool_IdDocument = `
    query GET_STACKINGV1_BY_POOL_ID($poolID: numeric_comparison_exp) {
  logStakingV1(order_by: {blockNumber: desc}, where: {poolID: $poolID}, limit: 10) {
    blockNumber
    txHash
    poolID
    tokenID
    sold
    from
    to
    amountLocked
    lockedUntil
  }
}
    `
export const useGet_Stackingv1_By_Pool_IdQuery = <
  TData = Get_Stackingv1_By_Pool_IdQuery,
  TError = unknown,
>(
  variables?: Get_Stackingv1_By_Pool_IdQueryVariables,
  options?: UseQueryOptions<Get_Stackingv1_By_Pool_IdQuery, TError, TData>,
) =>
  useQuery<Get_Stackingv1_By_Pool_IdQuery, TError, TData>(
    variables === undefined
      ? ['GET_STACKINGV1_BY_POOL_ID']
      : ['GET_STACKINGV1_BY_POOL_ID', variables],
    fetcher<Get_Stackingv1_By_Pool_IdQuery, Get_Stackingv1_By_Pool_IdQueryVariables>(
      Get_Stackingv1_By_Pool_IdDocument,
      variables,
    ),
    options,
  )
export const Get_TreasuryDocument = `
    query GET_TREASURY {
  treasury {
    updated_at
    contract
    chainId
    name
    amount
    value
    total
  }
}
    `
export const useGet_TreasuryQuery = <TData = Get_TreasuryQuery, TError = unknown>(
  variables?: Get_TreasuryQueryVariables,
  options?: UseQueryOptions<Get_TreasuryQuery, TError, TData>,
) =>
  useQuery<Get_TreasuryQuery, TError, TData>(
    variables === undefined ? ['GET_TREASURY'] : ['GET_TREASURY', variables],
    fetcher<Get_TreasuryQuery, Get_TreasuryQueryVariables>(Get_TreasuryDocument, variables),
    options,
  )
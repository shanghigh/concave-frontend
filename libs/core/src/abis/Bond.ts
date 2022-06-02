import { Interface } from '@ethersproject/abi'

export const BondAbi = new Interface([
  'event BeneficiarySet(address indexed caller, address beneficiary)',
  'event BondRedeemed(address indexed bonder, uint256 indexed bondId, uint256 output)',
  'event BondSold(address indexed bonder, address indexed token, uint256 input, uint256 output)',
  'event BondTransfered(address indexed sender, address indexed recipient, uint256 senderBondId, uint256 recipientBondId)',
  'event InputAssetAdded(address indexed caller, address indexed token, uint256 virtualReserves, uint256 halfLife, uint256 levelBips)',
  'event InputAssetRemoved(address indexed caller, address indexed token)',
  'event Paused(address account)',
  'event PolicyMintAllowanceSet(address indexed caller, uint256 mintAllowance)',
  'event PolicyUpdate(address indexed caller, uint256 supplyDelta, bool indexed positiveDelta, uint256 newVirtualOutputReserves, address[] tokens, uint256[] virtualReserves, uint256[] halfLives, uint256[] levelBips, bool[] updateElapsed)',
  'event RoleAdminChanged(bytes32 indexed role, bytes32 indexed previousAdminRole, bytes32 indexed newAdminRole)',
  'event RoleGranted(bytes32 indexed role, address indexed account, address indexed sender)',
  'event RoleRevoked(bytes32 indexed role, address indexed account, address indexed sender)',
  'event Unpaused(address account)',
  'event Vebase(uint256 outputTokensEmitted)',

  'function DEFAULT_ADMIN_ROLE() view returns (bytes32)',
  'function POLICY_ROLE() view returns (bytes32)',
  'function STAKING_ROLE() view returns (bytes32)',
  'function TREASURY_ROLE() view returns (bytes32)',
  'function addQuoteAsset(address token, uint256 virtualReserves, uint256 halfLife, uint256 levelBips)',
  'function beneficiary() view returns (address)',
  'function cnvEmitted() view returns (uint256)',
  'function getAmountOut(address token, uint256 input) view returns (uint256 output)',
  'function getAvailableSupply() view returns (uint256)',
  'function getQuoteReserves(address token) view returns (uint256)',
  'function getRoleAdmin(bytes32 role) view returns (bytes32)',
  'function getSpotPrice(address token) view returns (uint256)',
  'function getUserPositionCount(address account) view returns (uint256)',
  'function grantRole(bytes32 role, address account)',
  'function hasRole(bytes32 role, address account) view returns (bool)',
  'function initialize(uint256 _term, uint256 _virtualOutputReserves, address _outputToken, address _beneficiary, address _treasury, address _policy, address _staking)',
  'function outputToken() view returns (address)',
  'function pause()',
  'function paused() view returns (bool)',
  'function policyMintAllowance() view returns (uint256)',
  'function policyUpdate(uint256 supplyDelta, bool positiveDelta, uint256 newVirtualOutputReserves, address[] tokens, uint256[] virtualReserves, uint256[] halfLives, uint256[] levelBips, bool[] updateElapsed)',
  'function positions(address, uint256) view returns (uint256 owed, uint256 redeemed, uint256 creation)',
  'function purchaseBond(address recipient, address token, uint256 input, uint256 minOutput) returns (uint256 output)',
  'function purchaseBondUsingPermit(address recipient, address token, uint256 input, uint256 minOutput, uint256 deadline, uint8 v, bytes32 r, bytes32 s) returns (uint256 output)',
  'function quoteInfo(address) view returns (uint256 virtualReserves, uint256 lastUpdate, uint256 halfLife, uint256 levelBips)',
  'function redeemBond(address recipient, uint256 bondId) returns (uint256 output)',
  'function redeemBondBatch(address recipient, uint256[] bondIds) returns (uint256 output)',
  'function removeQuoteAsset(address token)',
  'function renounceRole(bytes32 role, address account)',
  'function revokeRole(bytes32 role, address account)',
  'function setBeneficiary(address accrualTo)',
  'function setPolicyMintAllowance(uint256 mintAllowance)',
  'function supportsInterface(bytes4 interfaceId) view returns (bool)',
  'function term() view returns (uint256)',
  'function totalAssets() view returns (uint256)',
  'function totalDebt() view returns (uint256)',
  'function transferBond(address recipient, uint256 bondId)',
  'function unpause()',
  'function vebase() returns (bool)',
  'function virtualOutputReserves() view returns (uint256)',
])

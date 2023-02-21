import {
  FlashLoan as FlashLoanEvent,
  NewDefaultInterestRateAddress as NewDefaultInterestRateAddressEvent,
  NewDefaultMarketConfig as NewDefaultMarketConfigEvent,
  NewGovernorAddress as NewGovernorAddressEvent,
  NewOracleAddress as NewOracleAddressEvent,
  NewPositionAddress as NewPositionAddressEvent,
  PoolCreated as PoolCreatedEvent,
} from '../../generated/Core/Core';
import {
  FlashLoan,
  NewDefaultInterestRateAddress,
  NewDefaultMarketConfig,
  NewGovernorAddress,
  NewOracleAddress,
  NewPositionAddress,
  Pool,
  Token,
} from '../../generated/schema';
import { Pool as PoolTemplate } from '../../generated/templates';
import { BI_18, ONE_BI, ZERO_BD, ZERO_BI } from '../utils/constants';
import { getPoolData, setToken } from '../utils/helper';
import { getTokenSymbol } from '../utils/token';

export function handleFlashLoan(event: FlashLoanEvent): void {
  let entity = new FlashLoan(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity._target = event.params._target;
  entity._reserve = event.params._reserve;
  entity._amount = event.params._amount;
  entity._totalFee = event.params._totalFee;
  entity._protocolFee = event.params._protocolFee;
  entity._timestamp = event.params._timestamp;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleNewDefaultInterestRateAddress(
  event: NewDefaultInterestRateAddressEvent
): void {
  let entity = new NewDefaultInterestRateAddress(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity._address = event.params._address;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleNewDefaultMarketConfig(
  event: NewDefaultMarketConfigEvent
): void {
  let entity = new NewDefaultMarketConfig(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity._ltv = event.params._ltv;
  entity._lb = event.params._lb;
  entity._rf = event.params._rf;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleNewGovernorAddress(event: NewGovernorAddressEvent): void {
  let entity = new NewGovernorAddress(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity._address = event.params._address;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleNewOracleAddress(event: NewOracleAddressEvent): void {
  let entity = new NewOracleAddress(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity._address = event.params._address;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleNewPositionAddress(event: NewPositionAddressEvent): void {
  let entity = new NewPositionAddress(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity._address = event.params._address;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handlePoolCreated(event: PoolCreatedEvent): void {
  let poolAddress = event.params.pool;
  let entity = new Pool(poolAddress);
  // setting pools here
  const token0 = setToken(event.params.token0);
  const token1 = setToken(event.params.token1);
  // const poolData = setPoolData(event.params.pool);
  entity.liquidity0 = ZERO_BD;
  entity.liquidity1 = ZERO_BD;
  entity.maxLTV = ZERO_BI;
  entity.lB = ZERO_BI;
  entity.rf = ZERO_BI;
  entity.token0 = event.params.token0;
  entity.token1 = event.params.token1;
  entity.pool = event.params.pool;
  entity.param3 = event.params.param3;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  // entity.liquidity0 = poolData._token0Liquidity.toBigDecimal();
  // entity.liquidity1 = poolData._token1Liquidity.toBigDecimal();
  // entity.maxLTV = poolData.ltv;
  // entity.lB = poolData.lb;
  // entity.rf = poolData.rf;

  // to be set during transactions;
  entity.txCount = ZERO_BI;
  entity.positionCount = 0;
  entity.openPositionCount = 0;
  entity.closedPositionCount = 0;
  entity.lendingPositionCount = 0;
  entity.borrowingPositionCount = 0;
  entity.token0Apy = ZERO_BD;
  entity.token1Apy = ZERO_BD;
  // poolData.positions = [];
  // poolData.lends = [];
  // poolData.redeem = [];
  // poolData.repays = [];
  // poolData.borrows = [];

  PoolTemplate.create(poolAddress);
  entity.save();
  // entity.save();
}

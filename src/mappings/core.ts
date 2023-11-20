import { Address } from '@graphprotocol/graph-ts';
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
  Protocol,
  Token,
} from '../../generated/schema';
import { Pool as PoolTemplate } from '../../generated/templates';
import { coreAddress, ONE_BD, ZERO_BD, ZERO_BI } from '../utils/constants';
import { setProtocol, setToken } from '../utils/helper';

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
  let protocol = Protocol.load(Address.fromHexString(coreAddress));
  // setting pools here
  const token0 = setToken(event.params.token0);
  const token1 = setToken(event.params.token1);

  entity.liquidity0 = ZERO_BD;
  entity.liquidity1 = ZERO_BD;
  entity.maxLTV = ZERO_BI;
  entity.lB = ZERO_BI;
  entity.rf = ZERO_BI;
  entity.token0 = event.params.token0;
  entity.token1 = event.params.token1;
  entity.pool = event.params.pool;
  entity.poolNo = event.params.param3;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  // to be set during transactions;
  entity.txCount = ZERO_BI;
  entity.positionCount = 0;
  entity.openPositionCount = 0;
  entity.closedPositionCount = 0;
  entity.lendingPositionCount = 0;
  entity.borrowingPositionCount = 0;
  entity.lendApy0 = ZERO_BD;
  entity.lendApy1 = ZERO_BD;
  entity.borrowApy0 = ZERO_BD;
  entity.borrowApy1 = ZERO_BD;
  entity.totalBorrow0 = ZERO_BD;
  entity.totalBorrow1 = ZERO_BD;
  entity.interest0 = ZERO_BD;
  entity.interest1 = ZERO_BD;
  entity.UtilizationRate0 = ZERO_BD;
  entity.UtilizationRate1 = ZERO_BD;
  entity.totalValueLockedUSD = ZERO_BD;
  entity.cumulativeSupplySideRevenueUSD = ZERO_BD;
  entity.totalLendBalanceUSD = ZERO_BD;
  entity.cumulativeLendUSD = ZERO_BD;
  entity.totalBorrowBalanceUSD = ZERO_BD;
  entity.cumulativeBorrowUSD = ZERO_BD;
  entity.cumulativeLiquidateUSD = ZERO_BD;
  entity.relativeToken0Price = ONE_BD;
  entity.relativeToken1Price = ONE_BD;

  // entity = setPoolData(poolAddress, entity);

  if (protocol == null) {
    protocol = setProtocol();
  }
  protocol.totalPoolCount = protocol.totalPoolCount + 1;

  protocol.save();
  entity.save();
  PoolTemplate.create(poolAddress);
}

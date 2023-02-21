import {
  Borrow,
  Lend,
  Redeem,
  Repay,
  InterestUpdate,
  Pool,
} from '../../generated/schema';
import {
  Lend as LendEvent,
  RepayBorrow as RepayEvent,
  Borrow as BorrowEvent,
  Redeem as RedeemEvent,
  InterestUpdate as InterestUpdateEvent,
} from '../../generated/templates/Pool/Pool';
import { setPoolData } from '../utils/helper';

export function handleLend(event: LendEvent): void {
  let entity = new Lend(event.transaction.hash);
  let pool = Pool.load(event.address);
  entity.amount = event.params._amount.toBigDecimal();
  entity.token = event.params._asset;
  entity.sender = event.transaction.from;
  entity.pool = event.address;
  entity.positionId = event.params._positionID;
  entity.blockTimestamp = event.block.timestamp;
  entity.blockNumber = event.block.number;
  entity.tokenAmount = event.params._token_amount.toBigDecimal();
  entity.transactionHash = event.transaction.hash;
  if (pool != null) {
    pool = setPoolData(event.address, pool);
    pool.save();
  }
  entity.save();
}

export function handleBorrow(event: BorrowEvent): void {
  let entity = new Borrow(event.transaction.hash);
  let pool = Pool.load(event.address);
  entity.amount = event.params._amount.toBigDecimal();
  entity.token = event.params._asset;
  entity.sender = event.transaction.from;
  entity.pool = event.address;
  entity.positionId = event.params._positionID;
  entity.blockTimestamp = event.block.timestamp;
  entity.blockNumber = event.block.number;
  entity.totalBorrows = event.params.totalBorrows.toBigDecimal();
  entity.transactionHash = event.transaction.hash;
  if (pool != null) {
    pool = setPoolData(event.address, pool);
    pool.save();
  }
  entity.save();
}

export function handleRepay(event: RepayEvent): void {
  let entity = new Repay(event.transaction.hash);
  let pool = Pool.load(event.address);
  entity.amount = event.params._amount.toBigDecimal();
  entity.token = event.params._asset;
  entity.sender = event.transaction.from;
  entity.pool = event.address;
  entity.positionId = event.params._positionID;
  entity.blockTimestamp = event.block.timestamp;
  entity.blockNumber = event.block.number;
  entity.totalBorrows = event.params.totalBorrows.toBigDecimal();
  entity.transactionHash = event.transaction.hash;
  if (pool != null) {
    pool = setPoolData(event.address, pool);
    pool.save();
  }
  entity.save();
}

export function handleRedeem(event: RedeemEvent): void {
  let entity = new Redeem(event.transaction.hash);
  let pool = Pool.load(event.address);
  entity.amount = event.params._amount.toBigDecimal();
  entity.token = event.params._asset;
  entity.sender = event.transaction.from;
  entity.pool = event.address;
  entity.positionId = event.params._positionID;
  entity.blockTimestamp = event.block.timestamp;
  entity.blockNumber = event.block.number;
  entity.tokenAmount = event.params._token_amount.toBigDecimal();
  entity.transactionHash = event.transaction.hash;
  if (pool != null) {
    pool = setPoolData(event.address, pool);
    pool.save();
  }
  entity.save();
}

export function handleInterestUpdate(event: InterestUpdateEvent): void {
  let entity = new InterestUpdate(event.transaction.hash);
  entity.interestRate0 = event.params._newRate0.toBigDecimal();
  entity.interestRate1 = event.params._newRate1.toBigDecimal();
  entity.totalBorrows0 = event.params.totalBorrows0.toBigDecimal();
  entity.totalBorrows1 = event.params.totalBorrows1.toBigDecimal();
  entity.save();
}

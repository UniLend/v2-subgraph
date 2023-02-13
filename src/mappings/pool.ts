import { Borrow, Lend, Redeem, Repay } from '../../generated/schema';
import { Lend as LendEvent, RepayBorrow as RepayEvent, Borrow as BorrowEvent, Redeem as RedeemEvent } from '../../generated/templates/Pool/Pool';

export function handleLend(event: LendEvent): void {
  let entity = new Lend(event.transaction.hash);
  entity.amount = event.params._amount.toBigDecimal();
  entity.token = event.params._asset;
  entity.sender = event.transaction.from;
  entity.pool = event.address;
  entity.positionId = event.params._positionID;
  entity.blockTimestamp = event.block.timestamp;
  entity.blockNumber = event.block.number;
  entity.tokenAmount = event.params._token_amount.toBigDecimal();
  entity.transactionHash = event.transaction.hash;
  entity.save();
}

export function handleBorrow(event: BorrowEvent): void {
  let entity = new Borrow(event.transaction.hash);
  entity.amount = event.params._amount.toBigDecimal();
  entity.token = event.params._asset;
  entity.sender = event.transaction.from;
  entity.pool = event.address;
  entity.positionId = event.params._positionID;
  entity.blockTimestamp = event.block.timestamp;
  entity.blockNumber = event.block.number;
  entity.totalBorrows = event.params.totalBorrows.toBigDecimal();
  entity.transactionHash = event.transaction.hash;
  entity.save();
}

export function handleRepay(event: RepayEvent): void {
  let entity = new Repay(event.transaction.hash);
  entity.amount = event.params._amount.toBigDecimal();
  entity.token = event.params._asset;
  entity.sender = event.transaction.from;
  entity.pool = event.address;
  entity.positionId = event.params._positionID;
  entity.blockTimestamp = event.block.timestamp;
  entity.blockNumber = event.block.number;
  entity.totalBorrows = event.params.totalBorrows.toBigDecimal();
  entity.transactionHash = event.transaction.hash;
  entity.save();
}

export function handleRedeem(event: RedeemEvent): void {
  let entity = new Redeem(event.transaction.hash);
  entity.amount = event.params._amount.toBigDecimal();
  entity.token = event.params._asset;
  entity.sender = event.transaction.from;
  entity.pool = event.address;
  entity.positionId = event.params._positionID;
  entity.blockTimestamp = event.block.timestamp;
  entity.blockNumber = event.block.number;
  entity.tokenAmount = event.params._token_amount.toBigDecimal();
  entity.transactionHash = event.transaction.hash;
  entity.save();
}
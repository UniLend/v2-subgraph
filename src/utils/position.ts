import { ethereum } from '@graphprotocol/graph-ts';
import { Position } from '../../generated/schema';
import { Lend as LendEvent } from '../../generated/templates/Pool/Pool';
import { ADDRESS_ZERO, ONE_BI, ZERO_BD, ZERO_BI } from './constants';

export function setPosition(entity: Position): Position {
  entity.owner = ADDRESS_ZERO;
  entity.pool = ADDRESS_ZERO;
  entity.hashOpened = ADDRESS_ZERO;
  entity.hashClosed = ADDRESS_ZERO;
  entity.blockNumberOpened = ZERO_BI;
  entity.timestampOpened = ZERO_BI;
  entity.blockNumberClosed = ZERO_BI;
  entity.timestampClosed = ZERO_BI;
  entity.lendBalance0 = ZERO_BD;
  entity.lendBalance1 = ZERO_BD;
  entity.borrowBalance0 = ZERO_BD;
  entity.borrowBalance1 = ZERO_BD;
  entity.lendCount = ZERO_BI;
  entity.redeemCount = ZERO_BI;
  entity.repayCount = ZERO_BI;
  entity.borrowCount = ZERO_BI;
  entity.liquidationCount = ZERO_BI;

  return entity;
}

export function updateLendPosition(
  position: Position,
  event: LendEvent
): Position {
  position.owner = event.transaction.from;
  position.pool = event.address;
  if (position.hashOpened == ADDRESS_ZERO) {
    position.hashOpened = event.transaction.hash;
  }
  if (position.blockNumberOpened == ZERO_BI) {
    position.blockNumberOpened = event.block.number;
  }
  if (position.timestampOpened == ZERO_BI) {
    position.timestampOpened = event.block.timestamp;
  }
  position.lendCount = position.lendCount.plus(ONE_BI);

  position.lendBalance0 = ZERO_BD;
  position.lendBalance1 = ZERO_BD;
  position.liquidationCount = ZERO_BI;

  return position;
}

export function updateBorrowPosition(
  event: ethereum.Event,
  position: Position
): Position {
  position.borrowCount = position.borrowCount.plus(ONE_BI);
  position.borrowBalance0 = ZERO_BD;
  position.borrowBalance1 = ZERO_BD;

  return position;
}

export function updateRedeemPosition(
  event: ethereum.Event,
  position: Position
): Position {
  
  position.redeemCount = position.redeemCount.plus(ONE_BI);
  // if lendbalance of 0 and 1 is zero then the position have closed;
  return position;
}

export function updateRepayPosition(
  event: ethereum.Event,
  position: Position
): Position {
  
  position.repayCount = position.repayCount.plus(ONE_BI);
  // borrow position will close here if borrow balance is zero for token 0 and 1
  return position;
}

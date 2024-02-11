import { Address, BigDecimal, BigInt, ethereum } from '@graphprotocol/graph-ts';
import { Position as PositionSchema, Token } from '../../generated/schema';
import {
  Borrow as BorrowEvent,
  Lend as LendEvent,
  LiquidateBorrow as LiquidateBorrowEvent,
  Pool,
  Pool__userHealthFactorResult,
  Redeem as RedeemEvent,
  RepayBorrow as RepayEvent,
} from '../../generated/templates/Pool/Pool';
import {
  ADDRESS_ZERO,
  positionAddress,
  ONE_BI,
  ONE_BD,
  ZERO_BD,
  ZERO_BI,
  exponentToBigDecimal,
  BI_10,
} from './constants';
import {
  Position,
  Position__positionResult_positionDataStruct,
} from '../../generated/Position/Position';
import { getUserShare } from './pool';
// import { getAssetOracle } from './oracle';

export function setPosition(
  entity: PositionSchema,
  event: ethereum.Event
): PositionSchema {
  entity.owner = event.transaction.from;
  entity.pool = event.address;
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
  entity.lendShare0 = ZERO_BD;
  entity.lendShare1 = ZERO_BD;
  entity.borrowShare0 = ZERO_BD;
  entity.borrowShare1 = ZERO_BD;
  entity.lendCount = ZERO_BI;
  entity.redeemCount = ZERO_BI;
  entity.repayCount = ZERO_BI;
  entity.borrowCount = ZERO_BI;
  entity.liquidationCount = ZERO_BI;
  entity.currentLTV = ZERO_BD;
  entity.interestEarned0 = ZERO_BD;
  entity.interestEarned1 = ZERO_BD;
  entity.intersetPaid0 = ZERO_BD;
  entity.intersetPaid1 = ZERO_BD;
  // entity.relativeToken0Price = ZERO_BD;
  // entity.relativeToken1Price = ZERO_BD;
  entity.healthFactor0 = BigDecimal.fromString(
    '115792089237316195423570985008687900000000000000000000000000000000000000000000'
  );
  entity.healthFactor1 = BigDecimal.fromString(
    '115792089237316195423570985008687900000000000000000000000000000000000000000000'
  );
  return entity;
}

export function updateLendPosition(
  position: PositionSchema,
  event: LendEvent
): PositionSchema {
  const positionData = getPositionData(event.params._positionID);
  const healthFactor = getUserHealthFactor(
    event.params._positionID,
    event.address
  );
  const userShare = getUserShare(event.params._positionID, event.address);
  let token0 = Token.load(positionData.token0);
  let token1 = Token.load(positionData.token1);

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

  if (token0 != null && token1 != null) {
    position.token0 = positionData.token0;
    position.token1 = positionData.token1;
  }

  position.liquidationCount = ZERO_BI;
  position.healthFactor0 = healthFactor.get_healthFactor0().toBigDecimal();
  position.healthFactor1 = healthFactor.get_healthFactor1().toBigDecimal();
  position.lendBalance0 = positionData.lendBalance0.toBigDecimal();
  position.lendBalance1 = positionData.lendBalance1.toBigDecimal();
  position.lendShare0 = userShare.get_lendShare0().toBigDecimal();
  position.lendShare1 = userShare.get_lendShare1().toBigDecimal();
  if (positionData.lendBalance0 > ZERO_BI) {
    position.interestEarned0 = positionData.lendBalance0
      .toBigDecimal()
      .minus(userShare.get_lendShare0().toBigDecimal());
  }
  if (positionData.lendBalance1 > ZERO_BI) {
    position.interestEarned1 = positionData.lendBalance1
      .toBigDecimal()
      .minus(userShare.get_lendShare1().toBigDecimal());
  }
  return position;
}

export function updateBorrowPosition(
  event: BorrowEvent,
  position: PositionSchema
): PositionSchema {
  position.borrowCount = position.borrowCount.plus(ONE_BI);
  const positionData = getPositionData(event.params._positionID);
  const healthFactor = getUserHealthFactor(
    event.params._positionID,
    event.address
  );
  const userShare = getUserShare(event.params._positionID, event.address);

  let token0 = Token.load(positionData.token0);
  let token1 = Token.load(positionData.token1);
  position.borrowBalance0 = positionData.borrowBalance0.toBigDecimal();
  position.borrowBalance1 = positionData.borrowBalance1.toBigDecimal();
  position.healthFactor0 = healthFactor.get_healthFactor0().toBigDecimal();
  position.healthFactor1 = healthFactor.get_healthFactor1().toBigDecimal();
  position.borrowShare0 = userShare.get_borrowShare0().toBigDecimal();
  position.borrowShare1 = userShare.get_borrowShare1().toBigDecimal();

  if (positionData.borrowBalance0 > ZERO_BI) {
    position.intersetPaid0 = positionData.borrowBalance0
      .toBigDecimal()
      .minus(userShare.get_borrowShare0().toBigDecimal());
  }
  if (positionData.borrowBalance1 > ZERO_BI) {
    position.intersetPaid1 = positionData.borrowBalance1
      .toBigDecimal()
      .minus(userShare.get_borrowShare1().toBigDecimal());
  }
  return position;
}

export function updateRedeemPosition(
  event: RedeemEvent,
  position: PositionSchema
): PositionSchema {
  position.redeemCount = position.redeemCount.plus(ONE_BI);
  const positionData = getPositionData(event.params._positionID);
  const healthFactor = getUserHealthFactor(
    event.params._positionID,
    event.address
  );
  const userShare = getUserShare(event.params._positionID, event.address);

  let token0 = Token.load(positionData.token0);
  let token1 = Token.load(positionData.token1);
  position.lendBalance0 = positionData.lendBalance0.toBigDecimal();
  position.lendBalance1 = positionData.lendBalance1.toBigDecimal();
  position.healthFactor0 = healthFactor.get_healthFactor0().toBigDecimal();
  position.healthFactor1 = healthFactor.get_healthFactor1().toBigDecimal();
  position.lendShare0 = userShare.get_lendShare0().toBigDecimal();
  position.lendShare1 = userShare.get_lendShare1().toBigDecimal();

  if (positionData.lendBalance0 > ZERO_BI) {
    position.interestEarned0 = positionData.lendBalance0
      .toBigDecimal()
      .minus(userShare.get_lendShare0().toBigDecimal());
  }
  if (positionData.lendBalance1 > ZERO_BI) {
    position.interestEarned1 = positionData.lendBalance1
      .toBigDecimal()
      .minus(userShare.get_lendShare1().toBigDecimal());
  }

  return position;
}

export function updateRepayPosition(
  event: RepayEvent,
  position: PositionSchema
): PositionSchema {
  position.repayCount = position.repayCount.plus(ONE_BI);
  const positionData = getPositionData(event.params._positionID);
  const healthFactor = getUserHealthFactor(
    event.params._positionID,
    event.address
  );
  const userShare = getUserShare(event.params._positionID, event.address);

  let token0 = Token.load(positionData.token0);
  let token1 = Token.load(positionData.token1);
  position.borrowBalance0 = positionData.borrowBalance0.toBigDecimal();
  position.borrowBalance1 = positionData.borrowBalance1.toBigDecimal();
  position.healthFactor0 = healthFactor.get_healthFactor0().toBigDecimal();
  position.healthFactor1 = healthFactor.get_healthFactor1().toBigDecimal();
  position.borrowShare0 = userShare.get_borrowShare0().toBigDecimal();
  position.borrowShare1 = userShare.get_borrowShare1().toBigDecimal();

  if (positionData.borrowBalance0 > ZERO_BI) {
    position.intersetPaid0 = positionData.borrowBalance0
      .toBigDecimal()
      .minus(userShare.get_borrowShare0().toBigDecimal());
  }
  if (positionData.borrowBalance1 > ZERO_BI) {
    position.intersetPaid1 = positionData.borrowBalance1
      .toBigDecimal()
      .minus(userShare.get_borrowShare1().toBigDecimal());
  }
  return position;
}

export function liquidatePositionUpdate(
  event: LiquidateBorrowEvent,
  position: PositionSchema
): PositionSchema {
  const positionData = getPositionData(event.params._positionID);
  const healthFactor = getUserHealthFactor(
    event.params._positionID,
    event.address
  );
  position.borrowBalance0 = positionData.borrowBalance0.toBigDecimal();
  position.borrowBalance1 = positionData.borrowBalance1.toBigDecimal();
  position.healthFactor0 = healthFactor.get_healthFactor0().toBigDecimal();
  position.healthFactor1 = healthFactor.get_healthFactor1().toBigDecimal();
  return position;
}

export function getPositionData(
  nftId: BigInt
): Position__positionResult_positionDataStruct {
  let contract = Position.bind(Address.fromString(positionAddress));
  let position = contract.position(nftId);
  return position;
}

export function getUserHealthFactor(
  nftId: BigInt,
  poolAddress: Address
): Pool__userHealthFactorResult {
  let contract = Pool.bind(poolAddress);
  const healthFactor = contract.userHealthFactor(nftId);

  return healthFactor;
}

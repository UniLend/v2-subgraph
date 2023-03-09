import { Address, BigDecimal, BigInt, ethereum } from '@graphprotocol/graph-ts';
import { Position as PositionSchema, Token } from '../../generated/schema';
import {
  Borrow as BorrowEvent,
  Lend as LendEvent,
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

export function setPosition(entity: PositionSchema, event: ethereum.Event): PositionSchema {
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
  entity.lendCount = ZERO_BI;
  entity.redeemCount = ZERO_BI;
  entity.repayCount = ZERO_BI;
  entity.borrowCount = ZERO_BI;
  entity.liquidationCount = ZERO_BI;
  entity.currentLTV = ZERO_BD;
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

  position.liquidationCount = ZERO_BI;
  position.healthFactor0 = healthFactor.get_healthFactor0().toBigDecimal();
  position.healthFactor1 = healthFactor.get_healthFactor1().toBigDecimal();
  position.lendBalance0 = positionData.lendBalance0.toBigDecimal();
  position.lendBalance1 = positionData.lendBalance1.toBigDecimal();

  if (event.params._asset == positionData.token0 && token0 != null) {
    position.currentLTV = getCurrentLTV(
      positionData.lendBalance0,
      positionData.borrowBalance1,
      token0.priceUSD
    );
  } else {
    if (token1 != null) {
      position.currentLTV = getCurrentLTV(
        positionData.lendBalance1,
        positionData.borrowBalance0,
        token1.priceUSD
      );
    }
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

  let token0 = Token.load(positionData.token0);
  let token1 = Token.load(positionData.token1);
  position.borrowBalance0 = positionData.borrowBalance0.toBigDecimal();
  position.borrowBalance1 = positionData.borrowBalance1.toBigDecimal();
  position.healthFactor0 = healthFactor.get_healthFactor0().toBigDecimal();
  position.healthFactor1 = healthFactor.get_healthFactor1().toBigDecimal();

  if (event.params._asset == positionData.token0 && token1 != null) {
    position.currentLTV = getCurrentLTV(
      positionData.lendBalance1,
      positionData.borrowBalance0,
      token1.priceUSD
    );
  } else {
    if (token0 != null) {
      position.currentLTV = getCurrentLTV(
        positionData.lendBalance0,
        positionData.borrowBalance1,
        token0.priceUSD
      );
    }
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

  let token0 = Token.load(positionData.token0);
  let token1 = Token.load(positionData.token1);
  position.lendBalance0 = positionData.lendBalance0.toBigDecimal();
  position.lendBalance1 = positionData.lendBalance1.toBigDecimal();
  position.healthFactor0 = healthFactor.get_healthFactor0().toBigDecimal();
  position.healthFactor1 = healthFactor.get_healthFactor1().toBigDecimal();
  // if lendbalance of 0 and 1 is zero then the position have closed;
  if (event.params._asset == positionData.token0 && token0 != null) {
    position.currentLTV = getCurrentLTV(
      positionData.lendBalance0,
      positionData.borrowBalance1,
      token0.priceUSD
    );
  } else {
    if (token1 != null) {
      position.currentLTV = getCurrentLTV(
        positionData.lendBalance1,
        positionData.borrowBalance0,
        token1.priceUSD
      );
    }
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

  let token0 = Token.load(positionData.token0);
  let token1 = Token.load(positionData.token1);
  position.borrowBalance0 = positionData.borrowBalance0.toBigDecimal();
  position.borrowBalance1 = positionData.borrowBalance1.toBigDecimal();
  position.healthFactor0 = healthFactor.get_healthFactor0().toBigDecimal();
  position.healthFactor1 = healthFactor.get_healthFactor1().toBigDecimal();
  // borrow position will close here if borrow balance is zero for token 0 and 1
  if (event.params._asset == positionData.token0 && token1 != null) {
    position.currentLTV = getCurrentLTV(
      positionData.lendBalance1,
      positionData.borrowBalance0,
      token1.priceUSD
    );
  } else {
    if (token0 != null) {
      position.currentLTV = getCurrentLTV(
        positionData.lendBalance0,
        positionData.borrowBalance1,
        token0.priceUSD
      );
    }
  }

  return position;
}

export function getCurrentLTV(
  lendValue: BigInt,
  borrowValue: BigInt,
  price: BigInt
): BigDecimal {
  const currentLTV = borrowValue.toBigDecimal().gt(ZERO_BD)
    ? borrowValue
        .toBigDecimal()
        .div(
          lendValue
            .toBigDecimal()
            .times(price.toBigDecimal().times(exponentToBigDecimal(BI_10)))
        )
    : ZERO_BD;
  return currentLTV;
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

import { Address, BigDecimal, BigInt } from '@graphprotocol/graph-ts';
import {
  Pool,
  Pool__userSharesOftokensResult,
} from '../../generated/templates/Pool/Pool';
import {
  BD_100,
  BD_18,
  BI_18,
  exponentToBigDecimal,
  ZERO_BD,
} from './constants';

export function fullLiquidity(
  liquidity: BigInt,
  rf: BigInt,
  totalBorrow: BigInt
): BigDecimal {
  const liquidityBD = liquidity.toBigDecimal();
  const rfBD = rf.toBigDecimal();
  const totalBorrowBD = totalBorrow.toBigDecimal();
  if (liquidityBD == ZERO_BD) {
    return totalBorrowBD;
  }
  return liquidityBD
    .times(BD_100)
    .div(rfBD)
    .plus(totalBorrowBD);
}

export function utilizationRate(
  liquidity: BigInt,
  rf: BigInt,
  totalBorrow: BigInt
): BigDecimal {
  const liquidityBD = liquidity.toBigDecimal();
  const rfBD = rf.toBigDecimal();
  const totalBorrowBD = totalBorrow.toBigDecimal();

  if (totalBorrowBD == ZERO_BD) {
    return ZERO_BD;
  }
  let fullLiq = fullLiquidity(liquidity, rf, totalBorrow);
  return totalBorrowBD.div(fullLiq).times(BD_100);
}

export function numToBD(n: string): BigDecimal {
  return BigDecimal.fromString(n);
}

export function getBorrowApy(interest: BigInt): BigDecimal {
  if (interest.toBigDecimal() == ZERO_BD) {
    return ZERO_BD;
  }
  const intereatFixed = interest
    .toBigDecimal()
    .div(exponentToBigDecimal(BI_18));
  return intereatFixed.times(
    numToBD('4')
      .times(numToBD('60'))
      .times(numToBD('24'))
      .times(numToBD('365'))
  );
  // return interest.toBigDecimal();
}

export function getLendApy(
  interest: BigInt,
  fullLiquidity: BigDecimal,
  totalBorrow: BigInt
): BigDecimal {
  let borrowApy = getBorrowApy(interest);
  if (borrowApy == ZERO_BD) {
    return ZERO_BD;
  }
  let result = borrowApy.div(fullLiquidity.div(totalBorrow.toBigDecimal()));
  return result;
}

export function getUserShare(
  nftId: BigInt,
  poolAddress: Address
): Pool__userSharesOftokensResult {
  const contract = Pool.bind(poolAddress);
  let share = contract.userSharesOftokens(nftId);
  return share;
}

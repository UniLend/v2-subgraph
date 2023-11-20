import { Address, BigDecimal, BigInt } from '@graphprotocol/graph-ts';
import { Oracle } from '../../generated/Oracle/Oracle';
import {
  BI_18,
  BI_8,
  exponentToBigDecimal,
  exponentToBigInt,
  ONE_BD,
  ONE_BI,
  oracleAddress,
  ZERO_BD,
  ZERO_BI,
} from './constants';

export function getOraclePrice(
  oracleAddress: Address,
  asset: Address
): BigDecimal {
  let contract = Oracle.bind(oracleAddress);
  let price = ONE_BD;
  if (contract != null) {
    price = contract.try_getChainLinkAssetPrice(asset).value.toBigDecimal();
    if (price != ZERO_BD) {
      return price;
    } else {
      return ONE_BD.times(exponentToBigDecimal(BI_8));
    }
  }
  return price;
}

export function getAssetOracle(
  token0: Address,
  token1: Address,
): BigDecimal {
  const contract = Oracle.bind(Address.fromString(oracleAddress));
  const amount = BigInt.fromI64(1000000000000000000);
  return contract.getAssetPrice(token0, token1, amount).toBigDecimal();
}

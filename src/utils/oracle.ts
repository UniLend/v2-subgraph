import { Address, BigDecimal, BigInt } from '@graphprotocol/graph-ts';
import { Oracle } from '../../generated/Oracle/Oracle';
import { ONE_BD, ONE_BI, ZERO_BD, ZERO_BI } from './constants';

export function getOraclePrice(oracleAddress: Address, asset: Address): BigInt {
  let contract = Oracle.bind(oracleAddress);
  let price = ONE_BI;
  if (contract != null) {
    price = contract.getChainLinkAssetPrice(asset);
    if (price != ZERO_BI) {
      return price;
    } else {
      return ONE_BI;
    }
  }
  return price;
}

import { Address, BigDecimal, BigInt } from '@graphprotocol/graph-ts';

export const positionAddress = '0x62f5be0da0302665dc39f3386b8e3e60ade4bf7b';
export const oracleAddress = '0x7F1455c727e58A51dFA168fd711b8B664E1E48BA';
export const ADDRESS_ZERO = Address.fromString(
  '0x0000000000000000000000000000000000000000'
);

export let ZERO_BI = BigInt.fromI32(0);
export let ONE_BI = BigInt.fromI32(1);
export let ZERO_BD = BigDecimal.fromString('0');
export let ONE_BD = BigDecimal.fromString('1');
export let TEN_BD = BigDecimal.fromString('10');
export let BI_18 = BigInt.fromI32(18);
export let BI_10 = BigInt.fromI32(10);
export let BD_100 = BigDecimal.fromString('100');

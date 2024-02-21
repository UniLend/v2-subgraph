import { Address, BigDecimal, BigInt, ethereum } from '@graphprotocol/graph-ts';

export const positionAddress = '0x55da4F6C98B1217095004F69e304F853663D1C11';
export const oracleAddress = '0x4ae8a7d2C2A0fB7C98f8af49Bd2f8A5523fed35d';
export const coreAddress = '0xBBDF4e0E4FDa0842599921Be429faA3d4faa3956';
export const ADDRESS_ZERO = Address.fromString(
  '0x0000000000000000000000000000000000000000'
);
export const helperAddress = Address.fromString(
  '0xF757745E7781642804A3d333506b57BE8adea256'
);

export function readValue<T>(
  callResult: ethereum.CallResult<T>,
  defaultValue: T
): T {
  return callResult.reverted ? defaultValue : callResult.value;
}

export function exponentToBigDecimal(decimals: BigInt): BigDecimal {
  let bd = BigDecimal.fromString('1');
  for (let i = ZERO_BI; i.lt(decimals as BigInt); i = i.plus(ONE_BI)) {
    bd = bd.times(BigDecimal.fromString('10'));
  }
  return bd;
}

export function exponentToBigInt(decimals: BigInt): BigInt {
  let bi = BigInt.fromString('1');
  for (let i = ZERO_BI; i.lt(decimals as BigInt); i = i.plus(ONE_BI)) {
    bi = bi.times(BigInt.fromString('10'));
  }
  return bi;
}

export let ZERO_BI = BigInt.fromI32(0);
export let ONE_BI = BigInt.fromI32(1);
export let ZERO_BD = BigDecimal.fromString('0');
export let ONE_BD = BigDecimal.fromString('1');
export let TEN_BD = BigDecimal.fromString('10');
export let BD_18 = BigDecimal.fromString("18");
export let BI_18 = BigInt.fromI32(18);
export let BI_8 = BigInt.fromI32(8);
export let BI_10 = BigInt.fromI32(10);
export let BD_100 = BigDecimal.fromString('100');
export let BI_100 = BigInt.fromI32(100);

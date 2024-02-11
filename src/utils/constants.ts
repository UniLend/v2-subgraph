import { Address, BigDecimal, BigInt, ethereum } from '@graphprotocol/graph-ts';

export const positionAddress = '0x77B6569F0dbC4F265a575a84540c2A0Cae116a90';
export const oracleAddress = '0x4C6E05732b84907B6FE4228EcCa926B557BB9C27';
export const coreAddress = '0x17dad892347803551CeEE2D377d010034df64347';
export const ADDRESS_ZERO = Address.fromString(
  '0x0000000000000000000000000000000000000000'
);
export const helperAddress = Address.fromString(
  '0x4F57c40D3dAA7BF2EC970Dd157B1268982158720'
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

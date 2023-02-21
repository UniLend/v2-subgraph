import {
  Address,
  BigDecimal,
  BigInt,
  ethereum,
  log,
} from '@graphprotocol/graph-ts';
import { Token } from '../../generated/schema';
import {
  Pool,
  Pool__poolDataResult,
} from '../../generated/templates/Pool/Pool';
import { Pool as PoolSchema } from '../../generated/schema';
import {
  BI_18,
  helperAddress,
  ONE_BD,
  ONE_BI,
  oracleAddress,
  readValue,
  ZERO_BD,
  ZERO_BI,
} from './constants';
import { getTokenSymbol } from './token';
import { getOraclePrice } from './oracle';
import {
  Helper,
  Helper__getPoolDataResult_outStruct,
} from '../../generated/templates/Pool/Helper';

export function setToken(address: Address): Token {
  let token = Token.load(address);
  if (token == null) {
    token = new Token(address);
    token.symbol = getTokenSymbol(address);
    token.decimals = BI_18;
    token.poolCount = ONE_BI;
    token.txCount = ZERO_BI;
    token.totalPoolsLiquidity = ZERO_BD;
    token.totalPoolsLiquidityUSD = ZERO_BD;
    token.poolCount = ZERO_BI;
    token.lentCount = ZERO_BI;
    token.borrowCount = ZERO_BI;
    token.priceUSD = getOraclePrice(Address.fromString(oracleAddress), address);
  }
  token.poolCount = token.poolCount.plus(ONE_BI);
  token.save();
  return token;
}

// export function setPoolData(poolAddress: Address): PoolSchema {
//   let contract = Pool.bind(poolAddress);
//   let pool = PoolSchema.load(poolAddress);
//   // if (contract != null) {
//   let liquidity0 = readValue<BigInt>(
//     contract.try_getAvailableLiquidity0(),
//     ZERO_BI
//   );
//   let liquidity1 = readValue<BigInt>(
//     contract.try_getAvailableLiquidity1(),
//     ZERO_BI
//   );
//   // let liquidity1 = contract.getAvailableLiquidity1();
//   let ltv = readValue<BigInt>(
//     // contract.try_getAvailableLiquidity1(),
//     contract.try_getLTV(),
//     ZERO_BI
//   );
//   let lb = readValue<BigInt>(
//     // contract.try_getAvailableLiquidity1(),
//     contract.try_getLB(),
//     ZERO_BI
//   );
//   let rf = readValue<BigInt>(
//     // contract.try_getAvailableLiquidity1(),
//     contract.try_getRF(),
//     ZERO_BI
//   );
//   // let lb = contract.getLB();
//   // let rf = contract.getRF();
//   if (pool == null) {
//     pool = new PoolSchema(poolAddress);
//     pool.liquidity0 = ZERO_BD;
//     pool.liquidity1 = ZERO_BD;
//     pool.maxLTV = ZERO_BI;
//     pool.lB = ZERO_BI;
//     pool.rf = ZERO_BI;
//   }
//   pool.liquidity0 = liquidity0.toBigDecimal();
//   pool.liquidity1 = liquidity1.toBigDecimal();
//   pool.newLiqui0 = ONE_BD;
//   if (contract != null) {
//     pool.newLiqui0 = contract.getAvailableLiquidity0().toBigDecimal();
//   }
//   pool.maxLTV = ltv;
//   pool.lB = lb;
//   pool.rf = rf;
//   // pool.save();
//   // }
//   return pool;
// }

export function getPoolData(poolAddress: Address): Pool__poolDataResult {
  let contract = Pool.bind(poolAddress);
  if (contract != null) {
    log.debug("my debug the poolcontract is null", []);
  }
  let callResult =
    // readValue<BigInt>(
    contract.poolData();
  // ZERO_BI
  // );
  if (callResult != null) {
    log.debug("my debug the poolcontract is null", []);
  }
  return callResult;
}

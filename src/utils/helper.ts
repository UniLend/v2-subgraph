import { Address, log } from '@graphprotocol/graph-ts';
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
import { PoolCreated as PoolCreatedEvent } from '../../generated/Core/Core';

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

export function setPoolData(
  poolAddress: Address,
  entity: PoolSchema
): PoolSchema {
  let helper = Helper.bind(helperAddress);

  // let data = readValue<Helper__getPoolDataResult_outStruct>(
  //   poolData.try_getPoolData(poolAddress),
  //   ZERO_BI
  // );

  let poolData = helper.try_getPoolData(poolAddress);
  if (!poolData.reverted) {
    entity.liquidity0 = poolData.value._token0Liquidity.toBigDecimal();
    entity.liquidity1 = poolData.value._token1Liquidity.toBigDecimal();
    entity.maxLTV = poolData.value.ltv;
    entity.lB = poolData.value.lb;
    entity.rf = poolData.value.rf;
  }

  return entity;
}

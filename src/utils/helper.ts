import { Address, BigInt, log } from '@graphprotocol/graph-ts';
import {
  Protocol as ProtocolSchema,
  Token,
  Pool as PoolSchema,
} from '../../generated/schema';
import { Pool } from '../../generated/templates/Pool/Pool';
import {
  BI_18,
  coreAddress,
  helperAddress,
  ONE_BD,
  ONE_BI,
  oracleAddress,
  readValue,
  ZERO_BD,
  ZERO_BI,
} from './constants';
import { getTokenName, getTokenSymbol } from './token';
import { getOraclePrice } from './oracle';
import { Helper } from '../../generated/templates/Pool/Helper';
import {
  fullLiquidity,
  getBorrowApy,
  getLendApy,
  utilizationRate,
} from './pool';

export function setToken(address: Address): Token {
  let token = Token.load(address);
  if (token == null) {
    token = new Token(address);
    token.symbol = getTokenSymbol(address);
    token.name = getTokenName(address);
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
  let pool = Pool.bind(poolAddress);

  // let data = readValue<Helper__getPoolDataResult_outStruct>(
  //   poolData.try_getPoolData(poolAddress),
  //   ZERO_BI
  // );

  const token0Data = pool.token0Data();
  const token1Data = pool.token1Data();
  let poolData = helper.try_getPoolData(poolAddress);
  if (!poolData.reverted) {
    const liquidity0 = poolData.value._token0Liquidity;
    const liquidity1 = poolData.value._token1Liquidity;
    const totalBorrow0 = token0Data.getTotalBorrow();
    const totalBorrow1 = token1Data.getTotalBorrow();
    const fullLiquidity0 = fullLiquidity(
      liquidity0,
      poolData.value.rf,
      totalBorrow0
    );
    const fullLiquidity1 = fullLiquidity(
      liquidity1,
      poolData.value.rf,
      totalBorrow1
    );
    const interest0 = pool.getInterestRate(
      token0Data.getTotalBorrow(),
      liquidity0
    );
    const interest1 = pool.getInterestRate(
      token1Data.getTotalBorrow(),
      liquidity1
    );
    entity.liquidity0 = liquidity0.toBigDecimal();
    entity.liquidity1 = liquidity1.toBigDecimal();
    entity.maxLTV = poolData.value.ltv;
    entity.lB = poolData.value.lb;
    entity.rf = poolData.value.rf;
    entity.totalValueLockedUSD = poolData.value._token0Liquidity
      .plus(poolData.value._token1Liquidity)
      .toBigDecimal();
    entity.totalBorrow0 = totalBorrow0.toBigDecimal();
    entity.totalBorrow1 = totalBorrow1.toBigDecimal();
    entity.interest0 = interest0.toBigDecimal();
    entity.interest1 = interest1.toBigDecimal();
    entity.UtilizationRate0 = utilizationRate(
      liquidity0,
      poolData.value.rf,
      totalBorrow0
    );
    entity.UtilizationRate1 = utilizationRate(
      liquidity1,
      poolData.value.rf,
      totalBorrow1
    );
    entity.borrowApy0 = getBorrowApy(interest0);
    entity.borrowApy1 = getBorrowApy(interest1);
    entity.lendApy0 = getLendApy(interest0, fullLiquidity0, totalBorrow0);
    entity.lendApy1 = getLendApy(interest1, fullLiquidity1, totalBorrow1);
    // logger
    log.debug('borrowApy0: {}, lendApy0: {}', [
      getBorrowApy(interest0).toString(),
      getLendApy(interest0, fullLiquidity0, totalBorrow0).toString(),
    ]);
  }
  entity.save();
  return entity;
}

export function setProtocol(): ProtocolSchema {
  let protocol = new ProtocolSchema(Address.fromHexString(coreAddress));

  protocol.cumulativeUniqueUsers = 0;
  protocol.cumulativeUniqueDepositors = 0;
  protocol.cumulativeUniqueBorrowers = 0;
  protocol.cumulativeUniqueLiquidators = 0;
  protocol.cumulativeUniqueLiquidatees = 0;
  protocol.totalValueLockedUSD = ZERO_BD;
  protocol.cumulativeLendSideRevenueUSD = ZERO_BD;
  protocol.cumulativeLendUSD = ZERO_BD;
  protocol.cumulativeBorrowUSD = ZERO_BD;
  protocol.cumulativeLiquidateUSD = ZERO_BD;
  protocol.totalPoolCount = 0;
  protocol.openPositionCount = 0;
  protocol.cumulativePositionCount = 0;
  protocol.save();
  return protocol;
}

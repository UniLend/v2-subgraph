import { Address } from '@graphprotocol/graph-ts';
import { Token } from '../../generated/schema';
import { BI_18, ONE_BI, oracleAddress, ZERO_BD, ZERO_BI } from './constants';
import { getTokenSymbol } from './token';
import { getOraclePrice } from './oracle';

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
    token.priceUSD = getOraclePrice(Address.fromString(oracleAddress), address);
  }
  token.poolCount = token.poolCount.plus(ONE_BI);
  token.save();
  return token;
}

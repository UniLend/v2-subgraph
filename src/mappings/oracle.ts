import { Address } from '@graphprotocol/graph-ts';
import { AssetOracleUpdated as AssetOracleUpdatedEvent } from '../../generated/Oracle/Oracle';
import { AssetOracle, Token } from '../../generated/schema';
import { oracleAddress } from '../utils/constants';
import { getOraclePrice } from '../utils/oracle';

export function handleAssetOracleUpdate(event: AssetOracleUpdatedEvent): void {
  let entity = new AssetOracle(event.transaction.hash);
  let asset = event.params.asset;
  let token = Token.load(event.params.asset);
  const price = getOraclePrice(Address.fromString(oracleAddress), asset);
  entity.tokenPrice = price;
  if (token != null) {
    token.priceUSD = price;
    token.save();
  }
  entity.asset = asset;
  entity.save();
}

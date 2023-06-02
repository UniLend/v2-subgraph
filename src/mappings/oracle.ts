import { Address } from '@graphprotocol/graph-ts';
import { AssetOracleUpdated as AssetOracleUpdatedEvent } from '../../generated/Oracle/Oracle';
import { AssetOracle, Pool, Token } from '../../generated/schema';
import { oracleAddress } from '../utils/constants';
import { getAssetOracle, getOraclePrice } from '../utils/oracle';

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
  entity.relativeTokenPrice0 = getAssetOracle(
    Address.fromString("0x8dfc548696d2faf0fb54f0f6e4fa36d9295fc4a2"),
    Address.fromString("0xbcc80ccbde188d34d35018602dc3f56766ba377d")
  );

  entity.save();
}

import { Address } from '@graphprotocol/graph-ts';
import { AssetOracleUpdated as AssetOracleUpdatedEvent } from '../../generated/Oracle/Oracle';
import { AssetOracle } from '../../generated/schema';
import { oracleAddress } from '../utils/constants';
import { getOraclePrice } from '../utils/oracle';

export function handleAssetOracleUpdate(event: AssetOracleUpdatedEvent): void {
  let entity = new AssetOracle(event.transaction.hash);
  let asset = event.params.asset;
  entity.asset = asset;
  entity.tokenPrice = getOraclePrice(Address.fromString(oracleAddress), asset);
  entity.save();
}

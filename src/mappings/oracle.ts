import { Address } from '@graphprotocol/graph-ts';
import { AssetOracleUpdated as AssetOracleUpdatedEvent } from '../../generated/Oracle/Oracle';
import { AssetOracle, Pool, Token } from '../../generated/schema';
import { oracleAddress } from '../utils/constants';
import { getAssetOracle, getOraclePrice } from '../utils/oracle';

export function handleAssetOracleUpdate(event: AssetOracleUpdatedEvent): void {
  let entity = new AssetOracle(event.params.asset);
  let asset = event.params.asset;
  let source = event.params.source;
  let token = Token.load(event.params.asset);
  const price = getOraclePrice(Address.fromString(oracleAddress), asset);
  entity.tokenPrice = price;
  if (token != null) {
    // token.priceUSD = price;
    token.oracleSource = source;
    token.save();
  }
  entity.asset = asset;
  entity.source = source;
  // entity.relativeTokenPrice0 = getAssetOracle(
  //   Address.fromString('0x53E0bca35eC356BD5ddDFebbD1Fc0fD03FaBad39'),
  //   Address.fromString('0xc2132D05D31c914a87C6611C10748AEb04B58e8F')
  // );
  entity.save();
}

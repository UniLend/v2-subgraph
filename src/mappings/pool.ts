import { Lend } from '../../generated/schema';
import { Lend as LendEvent } from '../../generated/templates/Pool/Pool';

export function handleLend(event: LendEvent): void {
  let entity = new Lend(event.transaction.hash);
  entity.amount = event.params._amount.toBigDecimal();
  entity.token = event.params._asset;
  entity.sender = event.transaction.from;
  entity.pool = event.address;
  entity.positionId = event.params._positionID;
  entity.blockTimestamp = event.block.timestamp;
  entity.blockNumber = event.block.number;
  entity.tokenAmount = event.params._token_amount.toBigDecimal();
  entity.transactionHash = event.transaction.hash;
  entity.save();
}

import { Transfer as TransferEvent } from '../../generated/Position/Position';
import { Transfer } from '../../generated/schema';

export function handleTransfer(event: TransferEvent): void {
  let id = event.transaction.hash.concatI32(event.params.tokenId.toI32());
  let entity = new Transfer(id);
  entity.from = event.params.from;
  entity.to = event.params.to;
  entity.tokenId = event.params.tokenId;
  entity.save();
}

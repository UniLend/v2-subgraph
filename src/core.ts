import {
  FlashLoan as FlashLoanEvent,
  NewDefaultInterestRateAddress as NewDefaultInterestRateAddressEvent,
  NewDefaultMarketConfig as NewDefaultMarketConfigEvent,
  NewGovernorAddress as NewGovernorAddressEvent,
  NewOracleAddress as NewOracleAddressEvent,
  NewPositionAddress as NewPositionAddressEvent,
  PoolCreated as PoolCreatedEvent
} from "../generated/Core/Core"
import {
  FlashLoan,
  NewDefaultInterestRateAddress,
  NewDefaultMarketConfig,
  NewGovernorAddress,
  NewOracleAddress,
  NewPositionAddress,
  PoolCreated
} from "../generated/schema"

export function handleFlashLoan(event: FlashLoanEvent): void {
  let entity = new FlashLoan(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._target = event.params._target
  entity._reserve = event.params._reserve
  entity._amount = event.params._amount
  entity._totalFee = event.params._totalFee
  entity._protocolFee = event.params._protocolFee
  entity._timestamp = event.params._timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNewDefaultInterestRateAddress(
  event: NewDefaultInterestRateAddressEvent
): void {
  let entity = new NewDefaultInterestRateAddress(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._address = event.params._address

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNewDefaultMarketConfig(
  event: NewDefaultMarketConfigEvent
): void {
  let entity = new NewDefaultMarketConfig(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._ltv = event.params._ltv
  entity._lb = event.params._lb
  entity._rf = event.params._rf

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNewGovernorAddress(event: NewGovernorAddressEvent): void {
  let entity = new NewGovernorAddress(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._address = event.params._address

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNewOracleAddress(event: NewOracleAddressEvent): void {
  let entity = new NewOracleAddress(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._address = event.params._address

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNewPositionAddress(event: NewPositionAddressEvent): void {
  let entity = new NewPositionAddress(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._address = event.params._address

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePoolCreated(event: PoolCreatedEvent): void {
  let entity = new PoolCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.token0 = event.params.token0
  entity.token1 = event.params.token1
  entity.pool = event.params.pool
  entity.param3 = event.params.param3

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

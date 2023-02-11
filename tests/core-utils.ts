import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  FlashLoan,
  NewDefaultInterestRateAddress,
  NewDefaultMarketConfig,
  NewGovernorAddress,
  NewOracleAddress,
  NewPositionAddress,
  PoolCreated
} from "../generated/Core/Core"

export function createFlashLoanEvent(
  _target: Address,
  _reserve: Address,
  _amount: BigInt,
  _totalFee: BigInt,
  _protocolFee: BigInt,
  _timestamp: BigInt
): FlashLoan {
  let flashLoanEvent = changetype<FlashLoan>(newMockEvent())

  flashLoanEvent.parameters = new Array()

  flashLoanEvent.parameters.push(
    new ethereum.EventParam("_target", ethereum.Value.fromAddress(_target))
  )
  flashLoanEvent.parameters.push(
    new ethereum.EventParam("_reserve", ethereum.Value.fromAddress(_reserve))
  )
  flashLoanEvent.parameters.push(
    new ethereum.EventParam("_amount", ethereum.Value.fromSignedBigInt(_amount))
  )
  flashLoanEvent.parameters.push(
    new ethereum.EventParam(
      "_totalFee",
      ethereum.Value.fromUnsignedBigInt(_totalFee)
    )
  )
  flashLoanEvent.parameters.push(
    new ethereum.EventParam(
      "_protocolFee",
      ethereum.Value.fromUnsignedBigInt(_protocolFee)
    )
  )
  flashLoanEvent.parameters.push(
    new ethereum.EventParam(
      "_timestamp",
      ethereum.Value.fromUnsignedBigInt(_timestamp)
    )
  )

  return flashLoanEvent
}

export function createNewDefaultInterestRateAddressEvent(
  _address: Address
): NewDefaultInterestRateAddress {
  let newDefaultInterestRateAddressEvent = changetype<
    NewDefaultInterestRateAddress
  >(newMockEvent())

  newDefaultInterestRateAddressEvent.parameters = new Array()

  newDefaultInterestRateAddressEvent.parameters.push(
    new ethereum.EventParam("_address", ethereum.Value.fromAddress(_address))
  )

  return newDefaultInterestRateAddressEvent
}

export function createNewDefaultMarketConfigEvent(
  _ltv: i32,
  _lb: i32,
  _rf: i32
): NewDefaultMarketConfig {
  let newDefaultMarketConfigEvent = changetype<NewDefaultMarketConfig>(
    newMockEvent()
  )

  newDefaultMarketConfigEvent.parameters = new Array()

  newDefaultMarketConfigEvent.parameters.push(
    new ethereum.EventParam(
      "_ltv",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_ltv))
    )
  )
  newDefaultMarketConfigEvent.parameters.push(
    new ethereum.EventParam(
      "_lb",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_lb))
    )
  )
  newDefaultMarketConfigEvent.parameters.push(
    new ethereum.EventParam(
      "_rf",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_rf))
    )
  )

  return newDefaultMarketConfigEvent
}

export function createNewGovernorAddressEvent(
  _address: Address
): NewGovernorAddress {
  let newGovernorAddressEvent = changetype<NewGovernorAddress>(newMockEvent())

  newGovernorAddressEvent.parameters = new Array()

  newGovernorAddressEvent.parameters.push(
    new ethereum.EventParam("_address", ethereum.Value.fromAddress(_address))
  )

  return newGovernorAddressEvent
}

export function createNewOracleAddressEvent(
  _address: Address
): NewOracleAddress {
  let newOracleAddressEvent = changetype<NewOracleAddress>(newMockEvent())

  newOracleAddressEvent.parameters = new Array()

  newOracleAddressEvent.parameters.push(
    new ethereum.EventParam("_address", ethereum.Value.fromAddress(_address))
  )

  return newOracleAddressEvent
}

export function createNewPositionAddressEvent(
  _address: Address
): NewPositionAddress {
  let newPositionAddressEvent = changetype<NewPositionAddress>(newMockEvent())

  newPositionAddressEvent.parameters = new Array()

  newPositionAddressEvent.parameters.push(
    new ethereum.EventParam("_address", ethereum.Value.fromAddress(_address))
  )

  return newPositionAddressEvent
}

export function createPoolCreatedEvent(
  token0: Address,
  token1: Address,
  pool: Address,
  param3: BigInt
): PoolCreated {
  let poolCreatedEvent = changetype<PoolCreated>(newMockEvent())

  poolCreatedEvent.parameters = new Array()

  poolCreatedEvent.parameters.push(
    new ethereum.EventParam("token0", ethereum.Value.fromAddress(token0))
  )
  poolCreatedEvent.parameters.push(
    new ethereum.EventParam("token1", ethereum.Value.fromAddress(token1))
  )
  poolCreatedEvent.parameters.push(
    new ethereum.EventParam("pool", ethereum.Value.fromAddress(pool))
  )
  poolCreatedEvent.parameters.push(
    new ethereum.EventParam("param3", ethereum.Value.fromUnsignedBigInt(param3))
  )

  return poolCreatedEvent
}

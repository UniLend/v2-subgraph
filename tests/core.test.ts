import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { FlashLoan } from "../generated/schema"
import { FlashLoan as FlashLoanEvent } from "../generated/Core/Core"
import { handleFlashLoan } from "../src/core"
import { createFlashLoanEvent } from "./core-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let _target = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let _reserve = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let _amount = BigInt.fromI32(234)
    let _totalFee = BigInt.fromI32(234)
    let _protocolFee = BigInt.fromI32(234)
    let _timestamp = BigInt.fromI32(234)
    let newFlashLoanEvent = createFlashLoanEvent(
      _target,
      _reserve,
      _amount,
      _totalFee,
      _protocolFee,
      _timestamp
    )
    handleFlashLoan(newFlashLoanEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("FlashLoan created and stored", () => {
    assert.entityCount("FlashLoan", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "FlashLoan",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_target",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "FlashLoan",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_reserve",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "FlashLoan",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_amount",
      "234"
    )
    assert.fieldEquals(
      "FlashLoan",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_totalFee",
      "234"
    )
    assert.fieldEquals(
      "FlashLoan",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_protocolFee",
      "234"
    )
    assert.fieldEquals(
      "FlashLoan",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_timestamp",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})

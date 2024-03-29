// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class AssetOracleUpdated extends ethereum.Event {
  get params(): AssetOracleUpdated__Params {
    return new AssetOracleUpdated__Params(this);
  }
}

export class AssetOracleUpdated__Params {
  _event: AssetOracleUpdated;

  constructor(event: AssetOracleUpdated) {
    this._event = event;
  }

  get asset(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get source(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class OwnershipTransferred extends ethereum.Event {
  get params(): OwnershipTransferred__Params {
    return new OwnershipTransferred__Params(this);
  }
}

export class OwnershipTransferred__Params {
  _event: OwnershipTransferred;

  constructor(event: OwnershipTransferred) {
    this._event = event;
  }

  get previousOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class Oracle extends ethereum.SmartContract {
  static bind(address: Address): Oracle {
    return new Oracle("Oracle", address);
  }

  WETH(): Address {
    let result = super.call("WETH", "WETH():(address)", []);

    return result[0].toAddress();
  }

  try_WETH(): ethereum.CallResult<Address> {
    let result = super.tryCall("WETH", "WETH():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getAssetPrice(token1: Address, token0: Address, amount: BigInt): BigInt {
    let result = super.call(
      "getAssetPrice",
      "getAssetPrice(address,address,uint256):(uint256)",
      [
        ethereum.Value.fromAddress(token1),
        ethereum.Value.fromAddress(token0),
        ethereum.Value.fromUnsignedBigInt(amount)
      ]
    );

    return result[0].toBigInt();
  }

  try_getAssetPrice(
    token1: Address,
    token0: Address,
    amount: BigInt
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getAssetPrice",
      "getAssetPrice(address,address,uint256):(uint256)",
      [
        ethereum.Value.fromAddress(token1),
        ethereum.Value.fromAddress(token0),
        ethereum.Value.fromUnsignedBigInt(amount)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getChainLinkAssetPrice(asset: Address): BigInt {
    let result = super.call(
      "getChainLinkAssetPrice",
      "getChainLinkAssetPrice(address):(int256)",
      [ethereum.Value.fromAddress(asset)]
    );

    return result[0].toBigInt();
  }

  try_getChainLinkAssetPrice(asset: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getChainLinkAssetPrice",
      "getChainLinkAssetPrice(address):(int256)",
      [ethereum.Value.fromAddress(asset)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getLatestPrice(priceFeed: Address): BigInt {
    let result = super.call(
      "getLatestPrice",
      "getLatestPrice(address):(int256)",
      [ethereum.Value.fromAddress(priceFeed)]
    );

    return result[0].toBigInt();
  }

  try_getLatestPrice(priceFeed: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getLatestPrice",
      "getLatestPrice(address):(int256)",
      [ethereum.Value.fromAddress(priceFeed)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  owner(): Address {
    let result = super.call("owner", "owner():(address)", []);

    return result[0].toAddress();
  }

  try_owner(): ethereum.CallResult<Address> {
    let result = super.tryCall("owner", "owner():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get weth(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall extends ethereum.Call {
  get inputs(): RenounceOwnershipCall__Inputs {
    return new RenounceOwnershipCall__Inputs(this);
  }

  get outputs(): RenounceOwnershipCall__Outputs {
    return new RenounceOwnershipCall__Outputs(this);
  }
}

export class RenounceOwnershipCall__Inputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall__Outputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class SetAssetOraclesCall extends ethereum.Call {
  get inputs(): SetAssetOraclesCall__Inputs {
    return new SetAssetOraclesCall__Inputs(this);
  }

  get outputs(): SetAssetOraclesCall__Outputs {
    return new SetAssetOraclesCall__Outputs(this);
  }
}

export class SetAssetOraclesCall__Inputs {
  _call: SetAssetOraclesCall;

  constructor(call: SetAssetOraclesCall) {
    this._call = call;
  }

  get assets(): Array<Address> {
    return this._call.inputValues[0].value.toAddressArray();
  }

  get sources(): Array<Address> {
    return this._call.inputValues[1].value.toAddressArray();
  }
}

export class SetAssetOraclesCall__Outputs {
  _call: SetAssetOraclesCall;

  constructor(call: SetAssetOraclesCall) {
    this._call = call;
  }
}

export class TransferOwnershipCall extends ethereum.Call {
  get inputs(): TransferOwnershipCall__Inputs {
    return new TransferOwnershipCall__Inputs(this);
  }

  get outputs(): TransferOwnershipCall__Outputs {
    return new TransferOwnershipCall__Outputs(this);
  }
}

export class TransferOwnershipCall__Inputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }

  get newOwner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class TransferOwnershipCall__Outputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }
}

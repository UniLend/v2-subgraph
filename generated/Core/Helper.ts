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

export class Helper__getPoolDataResult_outStruct extends ethereum.Tuple {
  get ltv(): BigInt {
    return this[0].toBigInt();
  }

  get lb(): BigInt {
    return this[1].toBigInt();
  }

  get rf(): BigInt {
    return this[2].toBigInt();
  }

  get _token0Liquidity(): BigInt {
    return this[3].toBigInt();
  }

  get _token1Liquidity(): BigInt {
    return this[4].toBigInt();
  }

  get _core(): Address {
    return this[5].toAddress();
  }

  get _token0(): Address {
    return this[6].toAddress();
  }

  get _token1(): Address {
    return this[7].toAddress();
  }

  get _symbol0(): string {
    return this[8].toString();
  }

  get _symbol1(): string {
    return this[9].toString();
  }

  get _decimals0(): BigInt {
    return this[10].toBigInt();
  }

  get _decimals1(): BigInt {
    return this[11].toBigInt();
  }
}

export class Helper__getPoolFullDataResult_outStruct extends ethereum.Tuple {
  get _token0Liquidity(): BigInt {
    return this[0].toBigInt();
  }

  get _token1Liquidity(): BigInt {
    return this[1].toBigInt();
  }

  get _totalLendShare0(): BigInt {
    return this[2].toBigInt();
  }

  get _totalLendShare1(): BigInt {
    return this[3].toBigInt();
  }

  get _totalBorrowShare0(): BigInt {
    return this[4].toBigInt();
  }

  get _totalBorrowShare1(): BigInt {
    return this[5].toBigInt();
  }

  get _totalBorrow0(): BigInt {
    return this[6].toBigInt();
  }

  get _totalBorrow1(): BigInt {
    return this[7].toBigInt();
  }

  get _interest0(): BigInt {
    return this[8].toBigInt();
  }

  get _interest1(): BigInt {
    return this[9].toBigInt();
  }

  get _lendShare0(): BigInt {
    return this[10].toBigInt();
  }

  get _borrowShare0(): BigInt {
    return this[11].toBigInt();
  }

  get _lendShare1(): BigInt {
    return this[12].toBigInt();
  }

  get _borrowShare1(): BigInt {
    return this[13].toBigInt();
  }

  get _lendBalance0(): BigInt {
    return this[14].toBigInt();
  }

  get _borrowBalance0(): BigInt {
    return this[15].toBigInt();
  }

  get _lendBalance1(): BigInt {
    return this[16].toBigInt();
  }

  get _borrowBalance1(): BigInt {
    return this[17].toBigInt();
  }

  get _healthFactor0(): BigInt {
    return this[18].toBigInt();
  }

  get _healthFactor1(): BigInt {
    return this[19].toBigInt();
  }
}

export class Helper__getPoolTokensDataResult {
  value0: BigInt;
  value1: BigInt;
  value2: BigInt;
  value3: BigInt;

  constructor(value0: BigInt, value1: BigInt, value2: BigInt, value3: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    map.set("value2", ethereum.Value.fromUnsignedBigInt(this.value2));
    map.set("value3", ethereum.Value.fromUnsignedBigInt(this.value3));
    return map;
  }

  get_allowance0(): BigInt {
    return this.value0;
  }

  get_allowance1(): BigInt {
    return this.value1;
  }

  get_balance0(): BigInt {
    return this.value2;
  }

  get_balance1(): BigInt {
    return this.value3;
  }
}

export class Helper extends ethereum.SmartContract {
  static bind(address: Address): Helper {
    return new Helper("Helper", address);
  }

  getPoolData(_pool: Address): Helper__getPoolDataResult_outStruct {
    let result = super.call(
      "getPoolData",
      "getPoolData(address):((uint256,uint256,uint256,uint256,uint256,address,address,address,string,string,uint256,uint256))",
      [ethereum.Value.fromAddress(_pool)]
    );

    return changetype<Helper__getPoolDataResult_outStruct>(result[0].toTuple());
  }

  try_getPoolData(
    _pool: Address
  ): ethereum.CallResult<Helper__getPoolDataResult_outStruct> {
    let result = super.tryCall(
      "getPoolData",
      "getPoolData(address):((uint256,uint256,uint256,uint256,uint256,address,address,address,string,string,uint256,uint256))",
      [ethereum.Value.fromAddress(_pool)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      changetype<Helper__getPoolDataResult_outStruct>(value[0].toTuple())
    );
  }

  getPoolFullData(
    _position: Address,
    _pool: Address,
    _user: Address
  ): Helper__getPoolFullDataResult_outStruct {
    let result = super.call(
      "getPoolFullData",
      "getPoolFullData(address,address,address):((uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256))",
      [
        ethereum.Value.fromAddress(_position),
        ethereum.Value.fromAddress(_pool),
        ethereum.Value.fromAddress(_user)
      ]
    );

    return changetype<Helper__getPoolFullDataResult_outStruct>(
      result[0].toTuple()
    );
  }

  try_getPoolFullData(
    _position: Address,
    _pool: Address,
    _user: Address
  ): ethereum.CallResult<Helper__getPoolFullDataResult_outStruct> {
    let result = super.tryCall(
      "getPoolFullData",
      "getPoolFullData(address,address,address):((uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256))",
      [
        ethereum.Value.fromAddress(_position),
        ethereum.Value.fromAddress(_pool),
        ethereum.Value.fromAddress(_user)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      changetype<Helper__getPoolFullDataResult_outStruct>(value[0].toTuple())
    );
  }

  getPoolTokensData(
    _pool: Address,
    _user: Address
  ): Helper__getPoolTokensDataResult {
    let result = super.call(
      "getPoolTokensData",
      "getPoolTokensData(address,address):(uint256,uint256,uint256,uint256)",
      [ethereum.Value.fromAddress(_pool), ethereum.Value.fromAddress(_user)]
    );

    return new Helper__getPoolTokensDataResult(
      result[0].toBigInt(),
      result[1].toBigInt(),
      result[2].toBigInt(),
      result[3].toBigInt()
    );
  }

  try_getPoolTokensData(
    _pool: Address,
    _user: Address
  ): ethereum.CallResult<Helper__getPoolTokensDataResult> {
    let result = super.tryCall(
      "getPoolTokensData",
      "getPoolTokensData(address,address):(uint256,uint256,uint256,uint256)",
      [ethereum.Value.fromAddress(_pool), ethereum.Value.fromAddress(_user)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new Helper__getPoolTokensDataResult(
        value[0].toBigInt(),
        value[1].toBigInt(),
        value[2].toBigInt(),
        value[3].toBigInt()
      )
    );
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
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}
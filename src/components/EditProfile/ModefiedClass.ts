export default class ModifiedValue<T> {
  private _value: T;
  private _modified: boolean;

  constructor(value: T) {
    this._value = value;
    this._modified = false;
  }

  get value(): T {
    return this._value;
  }

  set value(newValue: T) {
    this._value = newValue;
    this._modified = true;
  }

  isModified(): boolean {
    return this._modified;
  }
}

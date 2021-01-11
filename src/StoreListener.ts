import { StoreCallback, StoreDiffer, StoreMapper } from "./types"

export class StoreListener<TValue extends object, TValueMapped extends object> {
  callback: StoreCallback<TValueMapped>
  mapper: StoreMapper<TValue, TValueMapped>
  differ: StoreDiffer<TValueMapped>
  oldValue: TValueMapped

  constructor(
    callback: StoreCallback<TValueMapped>,
    mapper: StoreMapper<TValue, TValueMapped>,
    differ: StoreDiffer<TValueMapped>
  ) {
    this.callback = callback
    this.mapper = mapper
    this.differ = differ
    this.oldValue = undefined as any
  }

  notify(newValue: TValue) {
    const mappedNewValue = this.mapper(newValue)
    const isDifferent = this.differ(this.oldValue, mappedNewValue)

    if (isDifferent) {
      this.oldValue = mappedNewValue
      this.callback(mappedNewValue)
    }
  }
}

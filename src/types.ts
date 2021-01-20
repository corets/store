export interface ObservableStore<TValue extends object> {
  value: TValue
  initialValue: TValue

  get(): TValue
  set(newValue: TValue): void
  put(newValue: Partial<TValue>): void
  reset(initialValue?: TValue): void

  listen<TValueMapped extends object = TValue>(
    callback: StoreCallback<TValueMapped>,
    notifyImmediately?: boolean,
    mapper?: StoreMapper<TValue, TValueMapped>
  ): StoreCallbackUnsubscribe
}

export type StoreCallback<TValue extends object> = (newValue: TValue) => void
export type StoreCallbackUnsubscribe = () => void
export type StoreMerger<TValue extends object> = (
  oldValue: TValue,
  newValue: Partial<TValue>
) => TValue
export type StoreMapper<TValue extends object, TValueMapped extends object> = (
  value: TValue
) => TValueMapped
export type StoreDiffer<TValue extends object> = (
  oldValue: TValue,
  newValue: TValue
) => boolean
export type CreateStore = <TValue extends object>(
  initialValue: TValue
) => ObservableStore<TValue>

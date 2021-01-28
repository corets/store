export interface ObservableStore<TValue extends object> {
  get(): TValue
  set(newValue: TValue): void
  put(newValue: Partial<TValue>): void
  reset(initialValue?: TValue): void

  listen<TValueMapped extends object = TValue>(
    callback: StoreListener<TValueMapped>,
    options?: StoreListenOptions<TValue, TValueMapped>
  ): StoreListenerUnsubscribe
}

export type StoreConfig<TValue extends object> = {
  merger: StoreMerger<TValue>
  mapper: StoreMapper<TValue, any>
  differ: StoreDiffer<TValue>
}

export type StoreListenOptions<
  TValue extends object,
  TValueMapped extends object = TValue
> = {
  immediate?: boolean
  mapper?: StoreMapper<TValue, TValueMapped>
  differ?: StoreDiffer<TValue>
}

export type StoreListener<TValue extends object> = (newValue: TValue) => void
export type StoreListenerUnsubscribe = () => void
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
  initialValue: TValue,
  config?: StoreConfig<TValue>
) => ObservableStore<TValue>

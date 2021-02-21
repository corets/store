import {
  ObservableStore,
  StoreListener,
  StoreListenerUnsubscribe,
  StoreDiffer,
  StoreMapper,
  StoreConfig,
  StoreListenOptions, StoreSetter,
} from "./types"
import { defaultMerger } from "./defaultMerger"
import { defaultDiffer } from "./defaultDiffer"
import { defaultMapper } from "./defaultMapper"
import { StoreListenerWithDifferAndMapper } from "./StoreListenerWithDifferAndMapper"
import { cloneDeep } from "lodash-es"
import { createStoreSetter } from "./createStoreSetter"

export class Store<TValue extends object> implements ObservableStore<TValue> {
  value: TValue
  config: StoreConfig<TValue>
  listeners: StoreListenerWithDifferAndMapper<TValue, any>[]

  constructor(value: TValue, config?: Partial<StoreConfig<TValue>>) {
    this.value = cloneDeep(value)
    this.config = {
      differ: config?.differ ?? defaultDiffer,
      merger: config?.merger ?? defaultMerger,
      mapper: config?.mapper ?? defaultMapper,
    }
    this.listeners = []
  }

  get(): TValue {
    return cloneDeep(this.value)
  }

  set(newValue: TValue) {
    this.value = cloneDeep(newValue)
    this.notify()
  }

  put(newValue: Partial<TValue>) {
    const mergedNewValue = this.config.merger(this.value, cloneDeep(newValue))

    this.set(mergedNewValue)
  }

  use(): [TValue, StoreSetter<TValue>] {
    return [this.get(), createStoreSetter(this)]
  }

  listen<TValueMapped extends object = TValue>(
    callback: StoreListener<TValueMapped>,
    options?: StoreListenOptions<TValue, TValueMapped>
  ): StoreListenerUnsubscribe {
    const mapper =
      options?.mapper ??
      (this.config.mapper as StoreMapper<TValue, TValueMapped>)
    const differ = (options?.differ ?? this.config.differ) as StoreDiffer<any>
    const notifyImmediately = options?.immediate

    const listener = new StoreListenerWithDifferAndMapper<TValue, TValueMapped>(
      callback,
      mapper,
      differ
    )
    this.listeners.push(listener)

    if (notifyImmediately) {
      listener.notify(this.value)
    }

    return () => {
      this.listeners = this.listeners.filter((item) => item !== listener)
    }
  }

  protected notify() {
    this.listeners.forEach((listener) => listener.notify(this.value as any))
  }
}

import {
  ObservableStore,
  StoreCallback,
  StoreCallbackUnsubscribe,
  StoreDiffer,
  StoreMapper,
  StoreMerger,
} from "./types"
import { defaultMerger } from "./defaultMerger"
import { defaultDiffer } from "./defaultDiffer"
import { defaultMapper } from "./defaultMapper"
import { StoreListener } from "./StoreListener"
import cloneDeep from "lodash/cloneDeep"

export class Store<TValue extends object> implements ObservableStore<TValue> {
  initialValue: TValue
  value: TValue
  merger: StoreMerger<TValue>
  differ: StoreDiffer<any>
  listeners: StoreListener<TValue, any>[]

  constructor(
    initialValue: TValue,
    merger: StoreMerger<TValue> = defaultMerger,
    differ: StoreDiffer<TValue> = defaultDiffer
  ) {
    this.initialValue = cloneDeep(initialValue)
    this.value = cloneDeep(initialValue)
    this.differ = differ
    this.merger = merger
    this.listeners = []
  }

  get(): TValue {
    return cloneDeep(this.value)
  }

  set(newValue: TValue) {
    const isDifferent = this.differ(this.value, newValue)

    if (isDifferent) {
      this.value = cloneDeep(newValue)
      this.notify()
    }
  }

  add(newValue: Partial<TValue>) {
    const mergedNewValue = this.merger(this.value, cloneDeep(newValue))

    this.set(mergedNewValue)
  }

  reset(initialValue?: TValue) {
    if (initialValue) {
      this.initialValue = cloneDeep(initialValue)
    }

    this.set(this.initialValue)
  }

  listen<TValueMapped extends object = TValue>(
    callback: StoreCallback<TValueMapped>,
    notifyImmediately: boolean = true,
    mapper?: StoreMapper<TValue, TValueMapped>
  ): StoreCallbackUnsubscribe {
    mapper = mapper
      ? mapper
      : (defaultMapper as StoreMapper<TValue, TValueMapped>)

    const listener = new StoreListener<TValue, TValueMapped>(
      callback,
      mapper,
      this.differ
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

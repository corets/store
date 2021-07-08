import isEqual from "fast-deep-equal"
import { StoreDiffer } from "./types"

export const defaultDiffer: StoreDiffer<any> = (oldValue, newValue) =>
  !isEqual(oldValue, newValue)

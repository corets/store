import isEqual from "lodash/isEqual"
import { StoreDiffer } from "./types"

export const defaultDiffer: StoreDiffer<any> = (oldValue, newValue) =>
  !isEqual(oldValue, newValue)

import { isObjectLike } from "lodash-es"
import { StoreMerger } from "./types"

export const defaultMerger: StoreMerger<any> = (oldValue, newValue) => {
  if (isObjectLike(oldValue) && isObjectLike(newValue)) {
    return { ...oldValue, ...newValue }
  }

  return newValue as any
}

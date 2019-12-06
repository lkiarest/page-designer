/**
 * key-value map,
 * store relations between elements and rendered doms
 */
let _cached: {[key: string]: any} = {}

export const setItem = (key: string, component: any) => {
  if (!key || !component || !component.current) {
    return
  }

  _cached[key] = component
  // console.log(_cached)
}

export const getItem = (key: string): any => {
  return _cached[key]
}

export const clear = (): void => {
  _cached = {}
}

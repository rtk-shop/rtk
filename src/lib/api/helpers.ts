export function isDataDefined<T>(x: T | undefined): x is T {
  return x !== undefined
}

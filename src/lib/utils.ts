import { clsx, type ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

// An Elegant and Safe Solution for the Strict Typing of Array.includes
// https://8hob.io/posts/elegant-safe-solution-for-typing-array-includes/
export function isInArray<T, Element extends T>(
  element: T,
  array: readonly Element[]
): element is Element {
  const arrayT: readonly T[] = array
  return arrayT.includes(element)
}

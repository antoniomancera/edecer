export function mapArrayByProperty<T, K extends keyof T>(
  array: T[] | undefined,
  property: K,
): T[K][] {
  return array?.map((item) => item[property]) ?? [];
}

export function compareArrays(array1: any[], array2: any[]): boolean {
  if (!array1 || !array2) return false;

  const array1Lenght = array1.length;
  if (array1Lenght != array2.length) return false;

  for (let i = 0; i < array1Lenght; i++) {
    if (array1[i] != array2[i]) return false;
  }

  return true;
}

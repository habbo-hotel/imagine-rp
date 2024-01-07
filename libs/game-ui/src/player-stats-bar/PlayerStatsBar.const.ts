export function safeDiv(valueOne: number, valueTwo: number) {
  if (valueOne === 0 || valueTwo === 0) {
    return 0;
  }

  return Number((valueOne / valueTwo) * 100)
}
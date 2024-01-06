export function isJSON(data: any): boolean {
  try {
    JSON.parse(data)
    return true;
  } catch (e) {
    return false
  }
}
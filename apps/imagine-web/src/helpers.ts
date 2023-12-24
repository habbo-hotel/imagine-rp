const ONE_THOUSAND = 1000;
const ONE_MILLION = 1000000;
const ONE_BILLION = 1000000000;

export function formatNumber(num: number): string {
  if (num < ONE_THOUSAND) {
    return num.toString();
  } else if (num < ONE_MILLION) {
    return (num / ONE_THOUSAND).toFixed(1) + 'K';
  } else if (num < ONE_BILLION) {
    return (num / ONE_MILLION).toFixed(1) + 'M';
  } else {
    return (num / ONE_BILLION).toFixed(1) + 'B';
  }
}
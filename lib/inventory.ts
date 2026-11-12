export function getStockStatus(current: number, reorder: number) {
  if (current <= 0) return "OUT_OF_STOCK";
  if (current <= reorder) return "LOW_STOCK";
  return "IN_STOCK";
}

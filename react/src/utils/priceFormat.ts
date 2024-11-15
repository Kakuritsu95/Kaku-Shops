const euroFormat = new Intl.NumberFormat("GR", {
  style: "currency",
  currency: "EUR",
});
export function formatPrice(price: number) {
  return euroFormat.format(price);
}

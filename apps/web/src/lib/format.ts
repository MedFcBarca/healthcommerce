export function euro(cents: number) {
  return (cents / 100).toFixed(2) + " €";
}

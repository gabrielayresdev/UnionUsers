export function dateFormat(d: string) {
  const date = new Date(d);
  const day = `${date.getDay()}`.padStart(2, "0");
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const year = `${date.getFullYear()}`;
  return `${month}/${day}/${year}`;
}

export const getFirstDay = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), 2);
export const getLastDay = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth() + 1, 1);

export const ISO2RFC3339 = (iso: string) => iso.substring(0, 10);

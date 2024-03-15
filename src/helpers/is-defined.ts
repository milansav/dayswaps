export const isDefined = <T>(v: T | undefined | null): v is T => {
  return typeof v !== "undefined" && v !== null;
};

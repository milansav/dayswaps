export const isDefined = <T>(v: T | undefined): v is T => {
  return typeof v !== "undefined" && v !== null;
};

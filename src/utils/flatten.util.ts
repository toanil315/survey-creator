export const flatten = (arr: Array<any>): unknown[] => {
  return arr.reduce((acc, cur) => acc.concat(Array.isArray(cur) ? flatten(cur) : cur), []);
};

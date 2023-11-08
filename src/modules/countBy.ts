export interface CountList {
  [key: string]: number;
}

function countBy(array: (string | number)[]) {
  return array.reduce((acc: CountList, item) => {
    if (acc[item]) {
      acc[item] += 1;
    } else {
      acc[item] = 1;
    }
    return acc;
  }, {});
}

export default countBy;

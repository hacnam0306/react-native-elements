export const getObjectByKey = (
  inputArr: {
    [x: string]: any;
  }[],
  key1: string,
  key2: string,
) => {
  const initialValue = {};
  return Object.keys(inputArr).reduce((obj, item) => {
    return {
      ...obj,
      [inputArr[item][key1]]: inputArr[item][key2],
    };
  }, initialValue);
};

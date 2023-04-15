export const removeYear = (str: string) => {
  const arr = str.split(" ");
  arr.splice(3, 1);
  const date = arr.join(' ')
  return date;
};
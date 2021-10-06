export const ucFirst = (value: string) => {
  const firstLetter = value[0].toUpperCase();

  return `${firstLetter}${value.substring(1)}`;
};

export const stripTags = (value: string) => {
  return value.replace(/<[^>]+>/gm, '');
};

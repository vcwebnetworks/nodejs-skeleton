export const getFirstLastName = (name: string) => {
  const slitName = name.split(' ');

  return {
    firstName: slitName[0],
    lastName: slitName
      .slice(1)
      .map(row => row.trim())
      .join(' ')
      .trim(),
  };
};

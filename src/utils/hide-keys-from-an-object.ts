export const hideKeysFromAnObject = (
  immutableData: any,
  keys: string[] = [],
) => {
  const payload = { ...immutableData };

  const allKeys = [...keys, 'password', 'password_confirm'];

  for (const parameter of allKeys) {
    if (payload[parameter]) {
      payload[parameter] = '*';
    }
  }

  return payload;
};

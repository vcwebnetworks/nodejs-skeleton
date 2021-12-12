export const hideKeysFromAnObject = (
  immutableData: any,
  keys: string[] = [],
) => {
  const payload = { ...immutableData };

  const allKeys = [...keys, 'password', 'password_confirm'];

  Object.entries(payload).forEach(([key, value]) => {
    if (allKeys.includes(key) || String(value).match(/data:image\/(.+);/gm)) {
      payload[key] = '******';
    }
  });

  return payload;
};

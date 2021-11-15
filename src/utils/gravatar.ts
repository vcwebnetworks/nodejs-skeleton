import { ParsedUrlQueryInput, stringify } from 'querystring';

import hash from '@/shared/hash';

const getImageGravatar = (email: string, params?: ParsedUrlQueryInput) => {
  const query = params ? `?${stringify(params)}` : '';

  return `https://www.gravatar.com/avatar/${hash.md5(email)}${query}`;
};

export default getImageGravatar;

import { Request } from 'express';

type Query = {
  page: number;
  limit: number;
};

export const paginationFromRequest = (
  request: Request<any, any, any, Query, any>,
) => {
  const { limit = 10, page = 1 } = request.query;
  const offset = (page - 1) * limit;

  return {
    page,
    limit,
    offset,
  };
};

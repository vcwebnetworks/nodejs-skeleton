import { OrderItem } from 'sequelize';

export const getOrderByModel = (orderBy: string | undefined): OrderItem => {
  if (!orderBy) {
    return ['created_at', 'desc'];
  }

  const splitOrder = orderBy.split(':', 2);

  return [splitOrder[0], splitOrder[1]];
};

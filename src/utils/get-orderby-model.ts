type OrderItem = [string, 'asc' | 'desc'];

export const getOrderByModel = (orderBy: string | undefined): OrderItem => {
  if (!orderBy) {
    return ['created_at', 'desc'];
  }

  const [column, condition] = orderBy.split(':', 2) as OrderItem;

  return [column, condition];
};

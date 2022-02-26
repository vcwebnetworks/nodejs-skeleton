import moment from 'moment-timezone';

export const createStartAndEndOfMonth = (dateNow?: Date) => {
  const currentDate = dateNow ?? new Date();
  const momentDate = moment(currentDate);

  return {
    startDate: momentDate.startOf('month').toDate(),
    endDate: momentDate.endOf('month').toDate(),
  };
};

import Logger from '@src/helpers/Logger';

jest.mock('@src/helpers/Logger');

describe('Helpers -> Logger', () => {
  it('should check if the run method was called only with the message', () => {
    Logger.info('any_message');

    expect(Logger.info).toHaveBeenCalledTimes(1);
    expect(Logger.info).toHaveBeenCalledWith('any_message');
  });

  it('should check if it was called with all parameters', () => {
    Logger.error('any_message', new Error('any_error'));

    expect(Logger.error).toHaveBeenCalledTimes(1);
    expect(Logger.error).toHaveBeenCalledWith('any_message', new Error('any_error'));
  });
});

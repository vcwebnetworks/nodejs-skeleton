import Debug from '@src/helpers/Debug';

describe('Helpers -> Debug', () => {
  it('should check if it was called only with the message', () => {
    jest.spyOn(Debug, 'run');

    const data = { message: 'any_message' };
    Debug.run(data as any);

    expect(Debug.run).toHaveBeenCalledTimes(1);
    expect(Debug.run).toHaveBeenCalledWith(data);
  });

  it('should check if you will call with all properties', () => {
    jest.spyOn(Debug, 'run');

    const data = {
      namespace: 'any_namespace',
      message: 'any_message %s %d',
      args: ['any_param1', 9999],
    };

    Debug.run(data);

    expect(Debug.run).toHaveBeenCalledTimes(1);
    expect(Debug.run).toHaveBeenCalledWith(data);
  });
});

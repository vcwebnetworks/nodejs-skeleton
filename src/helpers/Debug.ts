import debug from 'debug';

interface IRequest {
  args?: any[];
  message: any;
  namespace?: string;
}

export default class Debug {
  public static run({ args, message, namespace = 'main' }: IRequest): void {
    debug(`app:${namespace}`)(message, ...(args ?? []));
  }
}

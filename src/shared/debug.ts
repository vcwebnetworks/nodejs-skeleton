interface IRequest {
  args?: any[];
  message: any;
  namespace?: string;
}

const debug = ({ args, message, namespace = 'main' }: IRequest) => {
  return require('debug')(`app:${namespace}`)(message, ...(args ?? []));
};

export default debug;

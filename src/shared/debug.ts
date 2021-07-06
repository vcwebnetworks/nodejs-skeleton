import externalDebug from 'debug';

interface IRequest {
  args?: any[];
  message: any;
  namespace?: string;
}

const debug = ({ args, message, namespace = 'main' }: IRequest) => {
  externalDebug(`app:${namespace}`)(message, ...(args ?? []));
};

export default debug;

import configApp from '@/config/app';

interface IRequest {
  args?: any[];
  message: any;
  namespace?: string;
}

const debug = ({ args, message, namespace = 'main' }: IRequest) => {
  return require('debug')(`${configApp.debugNamespace}:${namespace}`)(
    message,
    ...(args ?? []),
  );
};

export default debug;

import morgan from 'morgan';

const format = process.env.NODE_ENV === 'development' ? 'dev' : 'combined';

// const skip = (_: any, response: Response) =>
//   (format === 'combined' && response.statusCode < 400) ||
//   process.env.NODE_ENV === 'test';

const morganMiddleware = morgan(format);

export default morganMiddleware;

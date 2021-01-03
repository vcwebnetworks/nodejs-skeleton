declare namespace Express {
  interface Response {
    sentry?: string;
  }

  interface Request {
    originalMethod?: string;
  }
}

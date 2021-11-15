declare namespace Express {
  export interface Response {
    sentry?: any;
  }

  export interface Request {
    isAdmin: boolean;
    userData: import('@/database/models').UserModel;
    bearerToken: string;
    originalMethod: string;
    jwtDecode: {
      sub: string;
    };
  }
}

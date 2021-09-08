declare namespace Express {
  export interface Response {
    sentry?: any;
  }

  export interface Request {
    loggedUser: import('@database/models').UserModel;
    originalMethod: string;
    bearerToken: string;
    isAdmin: boolean;
    jwtDecode: {
      sub: string;
    };
  }
}

import { Request, Response } from 'express';

class Home {
  public async index(_request: Request, response: Response): Promise<Response> {
    return response.sendStatus(200);
  }
}

const commonHomeController = new Home();
export default commonHomeController;

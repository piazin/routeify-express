import { Request, Response } from 'express';

import {
  Controller,
  Get,
  Post,
  Status,
  StatusCodes,
  UseMiddleware,
  createExpressServer,
} from '../src';

@Controller('users')
class UserController {
  @Get()
  @UseMiddleware((req: Request, res: Response, next) => {
    console.log('middleware method');
    next();
  })
  getUser(req: Request, res: Response) {
    res.status(200).json({ msg: 'hello' });
  }

  @Post('create')
  @Status(StatusCodes.CREATED)
  create(req: Request, res: Response) {
    res.send('created user');
  }
}

const app = createExpressServer({
  controllers: [UserController],
  useGlobalMiddlewares: [
    (req, res, next) => {
      console.log('middleware');
      next();
    },
  ],
});

app.listen(3000, () => console.log('server runing'));

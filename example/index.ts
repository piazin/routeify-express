import { Request, Response } from 'express';
import {
  Controller,
  Get,
  Post,
  Status,
  StatusCodes,
  UseMiddleware,
  createExpressServer,
} from '@/index';

@Controller('users')
class UserController {
  @Get()
  @UseMiddleware((req: Request, res: Response, next) => {
    console.log('middleware method');
    next();
  })
  getUser(req: Request, res: Response) {
    res.send('get user');
  }

  @Post('')
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
  globalPrefix: 'api/v1',
});

app.listen(3000, () => console.log('server runing'));

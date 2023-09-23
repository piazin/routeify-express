import { Request, Response } from 'express';
import { Controller, Get, Post, createExpressServer } from '../src';

@Controller('users')
class UserController {
  @Get()
  getUser(req: Request, res: Response) {
    res.status(200).json({ msg: 'hello' });
  }

  @Post('create')
  create(req: Request, res: Response) {
    res.status(201).send('created user');
  }
}

const app = createExpressServer({
  controllers: [UserController],
  useMiddlewares: [
    (req, res, next) => {
      console.log('middleware');
      next();
    },
  ],
});

app.listen(3001, () => console.log('server runing'));

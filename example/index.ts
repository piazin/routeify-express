import express from "express";
import { StatusCodes, createExpressServer, Request, Response } from "@/index";
import { BadRequestException, NotFoundException } from "@/exceptions";
import {
  Controller,
  Get,
  Post,
  Status,
  UseMiddleware,
  Put,
  Delete,
} from "@/decorators";

@Controller("/users")
class UserController {
  private users: { id: number; name: string }[] = [];

  @Get()
  getUser(req: Request, res: Response) {
    res.json({
      users: this.users,
    });
  }

  @Post()
  @Status(StatusCodes.CREATED) // você pode usar o decorator Status para definir o status da resposta
  @UseMiddleware((req: Request, res: Response, next) => {
    // você pode adicionar middlewares de metodos aqui eles serão executados antes do metodo
    if (!req.body.name) throw new BadRequestException("Name is required");
    next();
  })
  createUser(req: Request, res: Response) {
    const createdUser = this.users.push({
      id: this.users.length + 1,
      name: req.body.name,
    });
    res.json({
      user: this.users[createdUser - 1],
    });
  }

  @Put("/:id")
  updateUser(req: Request, res: Response) {
    const id = req.params.id;
    const index = this.users.findIndex((user) => user.id === Number(id));
    if (index === -1) {
      throw new NotFoundException("User not found");
    } else {
      this.users[index].name = req.body.name;
      res.json({
        user: this.users[index],
      });
    }
  }

  @Delete("/:id")
  @Status(StatusCodes.NO_CONTENT)
  deleteUser(req: Request, res: Response) {
    const id = req.params.id;
    const index = this.users.findIndex((user) => user.id === Number(id));
    if (index === -1) {
      throw new NotFoundException("User not found");
    } else {
      this.users.splice(index, 1);
      res.end();
    }
  }
}

const app = createExpressServer({
  controllers: [UserController],
  useGlobalMiddlewares: [
    express.json(), // em vez de usar express.json() e express.urlencoded() você pode usar a option defaultExpressJson: true
    express.urlencoded({ extended: true }),
    (req, res, next) => {
      // você pode adicionar middlewares globais aqui eles serão executados antes de todos os controllers
      next();
    },
  ],
  useMiddlewaresAfterAll: [
    (req, res, next) => {
      // você pode adicionar middlewares globais aqui eles serão executados depois de todos os controllers
      next();
    },
  ],
  globalPrefix: "/api", // prefixo global para todos os controllers
});

app.listen(3000, () => console.log("server runing"));

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
  BodyValidator,
} from "@/decorators";
import { Length } from "class-validator";

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
  @BodyValidator(User) // você pode usar o decorator BodyValidator para validar o corpo da requisição
  @Status(StatusCodes.CREATED) // você pode usar o decorator Status para definir o status da resposta
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
  @UseMiddleware((req, res) => {
    if (!req.params.id) throw new BadRequestException("Id is required");
  }) // você pode usar o decorator UseMiddleware para adicionar middlewares
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

// para ultilizar BodyValidator você deve criar uma classe com as propriedades que deseja validar
class User {
  @Length(1, 20, { message: "Nome deve ter entre 3 e 20 caracteres" })
  name: string;
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

# routeify-express

`routeify-express` é uma biblioteca npm que simplifica a criação de rotas no Express através do uso de decorators em classes de controller.

[![npm version](https://badge.fury.io/js/routeify-express.svg)](https://www.npmjs.com/package/routeify-express)
[![Build Status](https://travis-ci.com/piazin/routeify-express.svg?branch=main)](https://travis-ci.com/piazin/routeify-express)

## 📦 Instalação

Utilize o npm para instalar:

```bash
npm install routeify-express
```

## 🛠 Como Usar

Aqui está um exemplo básico de como usar a biblioteca:

1️⃣ Criar um Controller

`controller.ts`

```typescript
import { Request, Response } from 'express';
import { Controller, Get, Post } from 'routeify-express';

@Controller('users')
class UserController {
  @Get()
  findAll(req: Request, res: Response) {
    res.status(200).send('users');
  }

  @Post()
  create(req: Request, res: Response) {
    res.status(201).send('created user');
  }

  @Delete(':id')
  remove(req: Request, res: Response) {
    res.status(204);
  }
}
```

2️⃣ Aplicar o Controller ao seu servidor Express

`app.ts`

```typescript
import { createExpressServer } from 'routeify-express';
import { UserController } from './controller.ts';

const app = createExpressServer({
  controllers: [UserController],
});

app.listen(3001, () => console.log('Servidor rodando na porta 3001'));
```

Com este setup, agora temos duas rotas disponíveis:

- GET /users que irá chamar o método getUser do UserController.

- POST /users que irá chamar o método create do UserController.

- DELETE /users/:id que irá chamar o método remove do UserController.

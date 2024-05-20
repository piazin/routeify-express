# routeify-express

`routeify-express` é uma biblioteca npm que simplifica a criação de rotas no Express através do uso de decorators em classes de controller.

[![npm version](https://badge.fury.io/js/routeify-express.svg)](https://www.npmjs.com/package/routeify-express)

## 📦 Instalação

Utilize o npm para instalar:

```bash
npm install routeify-express
```

Para poder utilizar os decorators, é necessário habilitar a opção `experimentalDecorators` no seu `tsconfig.json`:

```json
{
  "compilerOptions": {
    "experimentalDecorators": true
  }
}
```

## 🛠 Como Usar

Aqui está um exemplo básico de como usar a biblioteca:

**1 - Criar um Controller**

`controller.ts`

```typescript
import { Request, Response } from "express";
import { Controller, Get, Post, Status, StatusCodes } from "routeify-express";

@Controller("hello")
class HelloController {
  @Get("world")
  execute(req: Request, res: Response) {
    res.status(200).send("Hello World!");
  }
}
```

**2️ - Aplicar o Controller ao seu servidor Express**

`app.ts`

```typescript
import { createExpressServer } from "routeify-express";
import { HelloController } from "./controller.ts";

const app = createExpressServer({
  controllers: [HelloController],
});

app.listen(3001, () => console.log("Servidor rodando na porta 3001"));
```

Com este setup, agora temos uma rota `GET /hello/world` que retorna `Hello World!`.

### Decorators

- `@Controller(path: string)`: Define o path base para todas as rotas do controller.
- `@Get(path: string)`: Define uma rota `GET` para o método.
- `@Post(path: string)`: Define uma rota `POST` para o método.
- `@Put(path: string)`: Define uma rota `PUT` para o método.
- `@Delete(path: string)`: Define uma rota `DELETE` para o método.
- `@Patch(path: string)`: Define uma rota `PATCH` para o método.
- `@Status(code: number | StatusCodes)`: Define o status code da resposta. Pode ser usado em conjunto com os decorators de rota.
- `@UseMiddleware(middleware: RequestHandler)`: Adiciona um middleware à rota.
- `@BodyValidator(classValidator: class)`: Valida o corpo da requisição com a biblioteca `class-validator`.

> [!TIP]
> 💡 `StatusCodes` é um enum com os status codes HTTP mais comuns. ele pode ser importado de dentro da biblioteca.

## Exeptions

`BadRequestException`,
`UnauthorizedException`,
`ForbiddenException`,
`NotFoundException`,
`ConflictException`,
`InternalServerErrorException`
`...`

Exemplo de uso:

```typescript
import { Request, Response } from "express";
import { Controller, Get, BadRequestException } from "routeify-express";

@Controller("hello")
class HelloController {
  @Get("world")
  execute(req: Request, res: Response) {
    throw new BadRequestException("Bad Request");
  }
}
```

Exemplo de resposta:

```json
{
  "message": "Bad Request",
  "status": 400
}
```

Para mais exemplos, veja a pasta [example](https://github.com/piazin/routeify-express/tree/main/example)

## 📄 Licença

[MIT](https://choosealicense.com/licenses/mit/)

## Autores

- [@piazin](https://www.github.com/piazin)

# routeify-express

`routeify-express` é uma biblioteca npm que simplifica a criação de rotas no Express através do uso de decorators em classes de controller.

[![npm version](https://badge.fury.io/js/routeify-express.svg)](https://www.npmjs.com/package/routeify-express)

## 📦 Instalação

Utilize o gerenciador de pacotes de sua preferência para instalar:

```bash
pnpm add routeify-express
```

```bash
npm i routeify-express
```

Para poder utilizar os decorators, é necessário habilitar a opção `experimentalDecorators` no seu `tsconfig.json`:

```json
{
  "compilerOptions": {
    "experimentalDecorators": true
  }
}
```

## Como usar?

Aqui está um exemplo básico de como usar a biblioteca:

**1 - Criar um Controller**

`controller.ts`

```typescript
import { Controller, Get } from "routeify-express";

@Controller("hello")
class HelloController {
  @Get("world")
  execute() {
    return "Hello World!";
  }
}
```

**2️ - Aplicar o Controller ao seu servidor Express**

`main.ts`

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

- `@Controller(path: string)`: Marca uma classe como um controller.
- `@Get(path: string)`: Define um método como um manipulador de requisição GET.
- `@Post(path: string)`: Define um método como um manipulador de requisição POST.
- `@Put(path: string)`: Define um método como um manipulador de requisição PUT.
- `@Delete(path: string)`: Define um método como um manipulador de requisição DELETE.
- `@Patch(path: string)`: Define um método como um manipulador de requisição PATCH.
- `@Status(code: number | StatusCodes)`: Define o status code da resposta. Pode ser usado em conjunto com os decorators de rota.
  ```typescript
  import { Status, StatusCodes, Controller, Post } from "routeify-express";
  @Controller("/users")
  class HelloController {
    @Post()
    @Status(StatusCodes.CREATED)
    createUser() {
      return "User created!";
    }
  }
  ```
- `@UseMiddleware(middleware: RequestHandler)`: Adiciona um middleware à rota.

  ```typescript
  import {
    UseMiddleware,
    Controller,
    Get,
    Request,
    Response,
    NextFunction,
  } from "routeify-express";

  function logger(req: Request, res: Response, next: NextFunction) {
    console.log("Request...");
    next();
  }

  @Controller("/users")
  class HelloController {
    @Get()
    @UseMiddleware(logger)
    getUsers() {
      return "Users";
    }
  }
  ```

- `@BodyValidator(classValidator: class)`: Valida o corpo da requisição com a biblioteca `class-validator`.

  ```typescript
  import { IsString } from "class-validator";
  import { BodyValidator, Controller, Post } from "routeify-express";

  class CreateUserDto {
    @IsString()
    name: string;
  }

  @Controller("/users")
  class HelloController {
    @Post()
    @BodyValidator(CreateUserDto)
    createUser() {
      return "User created!";
    }
  }
  ```

  Para ultilizar o `BodyValidator` é necessário instalar a biblioteca `class-validator`;

  ```bash
  pnpm add class-validator
  ```

> [!TIP]
> 💡 `StatusCodes` é um enum com os status codes HTTP mais comuns. ele pode ser importado de dentro da biblioteca.

## Exeptions

A routeify-express fornece algumas exceções customizadas para cenários comuns em APIs.

### HttpException

- Classe base para todas as exceções relacionadas à API.
- Inclui propriedades para código de status, mensagem e detalhes adicionais.

### Lista Completa de Exceções Customizadas

- **BadRequestException (400 Bad Request)**: Erro para entrada de dados inválida ou incompleta.
- **UnauthorizedException (401 Unauthorized)**: Erro de autenticação, geralmente quando não há credenciais válidas.
- **ForbiddenException (403 Forbidden)**: Erro de autorização, geralmente quando o usuário não tem permissão para acessar o recurso.
- **NotFoundException (404 Not Found)**: Erro quando o recurso solicitado não foi encontrado.
- **MethodNotAllowedException (405 Method Not Allowed)**: Erro quando o método HTTP utilizado não é permitido para o recurso.
- **ConflictException (409 Conflict)**: Erro quando há um conflito de dados, como tentar criar um registro com um ID já existente.
- **InternalServerErrorException (500 Internal Server Error)**: Erro inesperado no servidor.
- **NotImplementedException (501 Not Implemented)**: Erro quando a funcionalidade solicitada ainda não foi implementada.
- **ServiceUnavailableException (503 Service Unavailable)**: Erro quando o serviço está indisponível temporariamente.
- **GatewayTimeoutException (504 Gateway Timeout)**: Erro de tempo limite ao se comunicar com outro serviço.
- **RequestTimeoutException (504 Request Timeout)**: Erro de tempo limite na requisição do cliente.
- **LengthRequiredException (400 Bad Request)**: Erro quando um campo obrigatório não é fornecido ou está vazio.
- **TooManyRequestsException (429 Too Many Requests)**: Erro quando o cliente excedeu a taxa de requisições permitida.

Exemplo de uso:

```typescript
import { Controller, Get, BadRequestException } from "routeify-express";

@Controller("hello")
class HelloController {
  @Get("world")
  execute() {
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

## Observações

- As exceções customizadas da routeify-express estendem a classe HttpException.
- Você pode criar suas próprias exceções customizadas extendendo a classe HttpException.
- Ao utilizar as exceções customizadas, você pode personalizar a mensagem de erro e os detalhes da resposta HTTP.

Para mais exemplos, veja a pasta [example](https://github.com/piazin/routeify-express/tree/main/example)

## 📄 Licença

[MIT](https://choosealicense.com/licenses/mit/)

## Autores

- [@piazin](https://www.github.com/piazin)

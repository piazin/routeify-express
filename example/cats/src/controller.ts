import {
  BodyValidator,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Request,
  Status,
  StatusCodes,
} from "routeify-express";
import { CatsService } from "./service";
import { CreateCatDto, UpdateCatDto } from "./dto";

@Controller("/cats")
export class CatsController {
  constructor(
    protected readonly catsService: CatsService = new CatsService()
  ) {}

  @Get()
  async findAll() {
    return { cats: this.catsService.findAll() };
  }

  @Get("/:id")
  async findOne(req: Request) {
    return this.catsService.findOne(parseInt(req.params.id));
  }

  @Post()
  @BodyValidator(CreateCatDto)
  @Status(StatusCodes.CREATED)
  async create(req: Request) {
    return this.catsService.create(req.body);
  }

  @Patch("/:id")
  @BodyValidator(UpdateCatDto)
  async update(req: Request) {
    return this.catsService.update(parseInt(req.params.id), req.body);
  }

  @Delete("/:id")
  @Status(StatusCodes.NO_CONTENT)
  async delete(req: Request) {
    this.catsService.delete(parseInt(req.params.id));
  }
}
